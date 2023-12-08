import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface Game {
  id: string;
  firstPlayer: string;
  startTime: string;
  status: string;
  winner: string;
}

const GamesList = () => {
  const [gamesList, setGamesList] = useState<Game[]>([]);
  let { setId } = useParams();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/sets/${setId}/games`
        );
        const data = await response.json();
        setGamesList(data);
      } catch (error) {
        console.log("Error fetching games list: ", error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="container my-5 pb-5">
      <div className="text-center">
        {gamesList ? (
          <div>
            <table
              className="table table-dark table-striped-columns table-bordered"
              style={{ borderRadius: "10px", overflow: "hidden" }}
            >
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Game ID</th>
                  <th scope="col">Moves</th>
                  <th scope="col">Starting player</th>
                  <th scope="col">Status</th>
                  <th scope="col">Winner</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {gamesList.map((game, index) => (
                  <tr key={game.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{game.id}</td>
                    <td>
                      <Link to={`/${game.id}/remake`}>
                        <button className="btn btn-light btn-sm">View</button>
                      </Link>
                    </td>
                    <td>{game.firstPlayer}</td>
                    <td>{game.status}</td>
                    <td>{game.winner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>There are no played games!</p>
        )}
      </div>
    </div>
  );
};

export default GamesList;
