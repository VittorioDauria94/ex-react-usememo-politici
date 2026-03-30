import { useEffect, useState } from "react";
import PoliticiansCard from "./components/PoliticiansCard";

function App() {
  const [politicians, setPoliticians] = useState([]);

  const fetchPoliticians = async () => {
    const response = await fetch(`http://localhost:3333/politicians`);
    const data = await response.json();
    setPoliticians(data);
  };
  useEffect(() => {
    fetchPoliticians();
  }, []);

  console.log(politicians);

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center ">Lista di politici</h1>
        <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 py-5">
          {politicians.map((politic) => (
            <div key={politic.id} className="col">
              <PoliticiansCard user={politic} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
