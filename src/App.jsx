import { useEffect, useMemo, useState } from "react";
import PoliticiansCard from "./components/PoliticiansCard";

function App() {
  const [politicians, setPoliticians] = useState([]);
  const [search, setSearch] = useState("");
  const [selectPosition, setSelectPosition] = useState("");

  const fetchPoliticians = async () => {
    const response = await fetch(`http://localhost:3333/politicians`);
    const data = await response.json();
    setPoliticians(data);
  };

  useEffect(() => {
    fetchPoliticians();
  }, []);

  const politiciansPosition = useMemo(() => {
    return politicians.reduce((acc, curr) => {
      if (!acc.includes(curr.position)) {
        return [...acc, curr.position];
      }
      return acc;
    }, []);
  }, [politicians]);

  const filteredPoliticians = useMemo(() => {
    return politicians.filter((p) => {
      const trimmedSearch = search.trim().toLowerCase();
      const simpleSearch =
        p.name.toLowerCase().includes(trimmedSearch) ||
        p.biography.toLowerCase().includes(trimmedSearch);
      return selectPosition === ""
        ? simpleSearch
        : simpleSearch && p.position === selectPosition;
    });
  }, [politicians, search, selectPosition]);

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center ">Lista di politici</h1>
        <form className="mt-4 d-flex" autoComplete="off">
          <input
            id="search"
            className="form-control me-2"
            type="text"
            placeholder="Ricerca il politico"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="form-select"
            name="positions"
            id="positions"
            value={selectPosition}
            onChange={(e) => setSelectPosition(e.target.value)}
          >
            <option value="">Tutte le posizioni</option>
            {politiciansPosition.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </form>

        <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 py-5">
          {filteredPoliticians.map((politician) => (
            <div key={politician.id} className="col">
              <PoliticiansCard user={politician} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
