import { useState } from "react";
import { useVegetables } from "./useVegetable";

export interface IVegetables {
  name: string;
  price: number;
}

const Maintenance = () => {
  const [limit, setLimit] = useState(50);
  const { vegetable, loading, error } = useVegetables(limit);

  const vegetableList = vegetable.map((vegtable) => (
    <li key={vegtable.name}>
      {vegtable.name}: {vegtable.price}
    </li>
  ));

  const limitPicker = () => {
    return (
      <select
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        name="limit"
        id="limit"
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </select>
    );
  };

  return (
    <div>
      <div>{limitPicker()}</div>
      {error !== null && <div>An error was thrown</div>}
      {loading ? <div>Loading...</div> : <div>{vegetableList}</div>}
    </div>
  );
};

export default Maintenance;
