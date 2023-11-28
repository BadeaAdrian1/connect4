import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Set {
  id: string;
  numberOfGames: number;
  wins: number;
  losses: number;
  draws: number;
  disputes: number;
  winner: string;
  status: string;
}

const History = () => {
  const [setList, updateSetList] = useState<Set[]>([]);

  useEffect(() => {
    const fetchSets = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/sets");
        const data = await response.json();
        updateSetList(data);
      } catch (error) {
        console.log("Error fetching set list: ", error);
      }
    }

    fetchSets();
  }, []);

  return (
    <div className="container my-5 pb-5">
      <div className="text-center">
        {setList.length === 0 ? (
          <p>There are no played sets!</p>
        ) : (
          <div>
            <table
              className="table table-dark table-striped-columns table-bordered"
              style={{ borderRadius: "10px", overflow: "hidden" }}
            >
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Set ID</th>
                  <th scope="col">Games list</th>
                  <th scope="col">Number of games</th>
                  <th scope="col">Wins</th>
                  <th scope="col">Losses</th>
                  <th scope="col">Draws</th>
                  <th scope="col">Disputes</th>
                  <th scope="col">Status</th>
                  <th scope="col">Winner</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {setList.map((set, index) => (
                  <tr key={set.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{set.id}</td>
                    <td>
                      <Link to={`/${set.id}/games`}>
                        <button className="btn btn-light btn-sm">View</button>
                      </Link>
                    </td>
                    <td>{set.numberOfGames}</td>
                    <td>{set.wins}</td>
                    <td>{set.losses}</td>
                    <td>{set.draws}</td>
                    <td>{set.disputes}</td>
                    <td>{set.status}</td>
                    <td>{set.winner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
