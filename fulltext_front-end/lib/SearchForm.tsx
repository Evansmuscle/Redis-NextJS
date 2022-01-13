import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Car } from "./redis";

export default function SearchForm() {
  const [hits, setHits] = useState([]);

  const search = async (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value;

    if (query.length > 2) {
      const params = new URLSearchParams({ query });

      const res = await fetch("/api/search?" + params);

      const result = await res.json();
      console.log(result);
      setHits(result["cars"]);
    }
  };

  return (
    <div className="form">
      <label className="label" htmlFor="search">
        Search Here
      </label>
      <input className="input" onChange={search} type="text" name="search" />

      <ul>
        {hits.map((hit: Car) => (
          <li key={hit.entityId}>
            <p>
              {hit.make} {hit.model}
            </p>
            <Image src={hit.image} alt="a car image" width={300} height={200} />
          </li>
        ))}
      </ul>
    </div>
  );
}
