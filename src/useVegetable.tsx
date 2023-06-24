import { useEffect, useState } from "react";
import { IVegetables } from "./Test";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const getVegetables = async () => {
  await sleep(1000);
  return [
    { name: "tomato", price: 10 },
    { name: "cucumber", price: 20 },
    { name: "carrot", price: 30 },
    { name: "potato", price: 40 },
  ];
};

const getVegetableFail = async () => {
  await sleep(1000);
  return "Failed to get Error";
};

export const useVegetables = (limit: number) => {
  const [vegetable, setVegetable] = useState<IVegetables[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const vegetables = await getVegetables();
      if (typeof vegetables === "string") {
        setError(new Error(vegetables));
        setLoading(false);
        return;
      }
      const filteredVegetables = vegetables.filter(
        (vegtable) => vegtable.price < limit
      ) as any;
      setVegetable(filteredVegetables);
      setLoading(false);
      setError(null);
    }
    fetchData();
  }, [limit]);

  return { vegetable, loading, error };
};
