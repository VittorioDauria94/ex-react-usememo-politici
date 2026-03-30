import { useEffect, useMemo, useState } from "react";
import PoliticiansCard from "./components/PoliticiansCard";

function App() {
  const [politicians, setPoliticians] = useState([]);
  const [search, setSearch] = useState("");

  const fetchPoliticians = async () => {
    const response = await fetch(`http://localhost:3333/politicians`);
    const data = await response.json();
    setPoliticians(data);
  };

  useEffect(() => {
    fetchPoliticians();
  }, []);

  const filteredPoliticians = useMemo(() => {
    return politicians.filter(
      (p) =>
        p.name.toLowerCase().includes(search.trim().toLowerCase()) ||
        p.biography.toLowerCase().includes(search.trim().toLowerCase()),
    );
  }, [politicians, search]);

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center ">Lista di politici</h1>
        <form className="mt-4" autoComplete="off">
          <input
            id="search"
            className="form-control me-2"
            type="text"
            placeholder="Ricerca il politico"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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
