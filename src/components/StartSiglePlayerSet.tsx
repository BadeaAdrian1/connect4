import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface Move {
  column: string;
  player: string;
  moveType: string;
}

const ManualStartSet = () => {
  const [numberOfGames, setNumberOfGames] = useState<number>(1);
  const [responseCode, setResponseCode] = useState<number | null>(null);
  const storedSetId = localStorage.getItem("setId");
  const [setId, updateSetId] = useState<string>(storedSetId || "");
  const [gameId, updateGameId] = useState<string>("");
  const [playerTurn, setPlayerTurn] = useState<Boolean>(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNumberOfGames(e.target.valueAsNumber);
  };

  const [moves, setMoves] = useState<Move[]>([]);
  const [board, setBoard] = useState<string[][]>([
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ]);
  const [status, setStatus] = useState<string>("IN_PROGRESS");

  const lettersToNumbers = new Map([
    ["A", 0],
    ["B", 1],
    ["C", 2],
    ["D", 3],
    ["E", 4],
    ["F", 5],
    ["G", 6],
  ]);

  const numbersToLetters = new Map([
    [0, "A"],
    [1, "B"],
    [2, "C"],
    [3, "D"],
    [4, "E"],
    [5, "F"],
    [6, "G"],
  ]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/sets/${setId}/games`
        );
        const data = await response.json();

        if (data.length > 0) {
          const id = data[0].id;
          updateGameId(id);
          console.log(id);
        } else {
          console.log("No games found for the set");
        }

        // Check if the status is FINISHED and reset localStorage
        if (data.length > 0 && data[0].status === "FINISHED") {
          localStorage.removeItem("setId");
          updateSetId("");
        }
      } catch (error) {
        console.log("Error fetching game details: ", error);
      }
    };

    localStorage.setItem("setId", setId);
    fetchGames();
  }, [setId]);

  useEffect(() => {
    const displayBoard = () => {
      let currentBoard: string[][] = [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
      ];

      for (let i = 0; i < moves.length; i++) {
        const move = moves[i];
        if (move && move.column) {
          const col = lettersToNumbers.get(move.column);

          if (typeof col === "number") {
            for (let j = col; j < 7; j++) {
              for (let k = 5; k >= 0; k--) {
                if (currentBoard[k][j] !== "") {
                  continue;
                } else {
                  currentBoard[k][j] = move.player === "OUR_TEAM" ? "R" : "Y";
                  break;
                }
              }
              break;
            }
          } else {
            console.log("Column is not between A-G");
          }
        } else {
          console.log("Move or column is undefined at index: " + i);
        }
      }

      setBoard(currentBoard);
    };
    const fetchMoves = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/games/details?gameId=${gameId}`
        );
        const data = await response.json();

        // Extract only the number of moves from the response
        const moves = data.moveDtosList;
        const status = data.gameStatus;
        setStatus(status);
        setMoves(moves);
        console.log(moves);
        if (data[0].status === "FINISHED") {
          localStorage.removeItem("setId");
          updateSetId("");
        }
      } catch (error) {
        console.log("Error fetching game details: ", error);
      }
    };

    fetchMoves();
    displayBoard();
  }, [gameId, playerTurn]);

  async function createMove(colIndex: number) {
    const curentMove = {
      column: numbersToLetters.get(colIndex),
      player: "OPPONENT",
      moveType: null,
    };
    try {
      const sendMoveDto = await fetch(`http://localhost:8080/api/games/move`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(curentMove),
      });
      setPlayerTurn(false);
    } catch (error) {
      console.error("Error creating move:", error);
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/api/sets/single-player/start?numberOfGames=${numberOfGames}`,
        { method: "POST" }
      );
      const statusCode: number = response.status;
      // Assuming 'response' is the Response object from a fetch request
      try {
        const id = await response.text();
        updateSetId(id);
      } catch (error) {
        console.error("Error reading response as text:", error);
      }

      setResponseCode(statusCode);
    } catch (error) {
      console.error("Error sending post request: ", error);
    }
  };

  return (
    <>
      {setId === "" ? (
        <form className="container text-center" onSubmit={handleSubmit}>
          <div className="row mt-5">
            <label className="form-label" htmlFor="numberOfGames">
              Please enter the number of games to be played in this set:
            </label>
          </div>
          <div className="row justify-content-center">
            <span className="col-3">
              <input
                className="form-control form-control-md"
                type="number"
                placeholder="e.g. 1, 10, 200..."
                id="inputValue"
                min="1"
                onChange={handleChange}
              ></input>
            </span>
            <span className="col-auto">
              <button
                type="submit"
                className="btn btn-outline-secondary bg-dark text-white"
              >
                Start Single Set
              </button>
            </span>
          </div>
          <div className="row mt-2">
            {responseCode === 200 && (
              <p style={{ color: "green" }}>Set started successfully!</p>
            )}
            {responseCode === 400 && (
              <p style={{ color: "red" }}>Failed to start the set!</p>
            )}
          </div>
        </form>
      ) : (
        <div className="d-flex flex-column align-items-center text-center">
          <div
            className="my-4"
            style={{
              backgroundColor: "#111111",
              borderRadius: "4%",
              width: "700px",
              height: "500px",
            }}
          >
            {board.map((row: string[], rowIndex) => (
              <div key={rowIndex} className="d-flex p-1">
                {row.map((col: string, colIndex) => (
                  <button
                    className="col m-2"
                    key={colIndex}
                    style={{
                      backgroundColor:
                        col === "" ? "grey" : col === "R" ? "red" : "yellow",
                      height: "60px",
                      borderRadius: "50%",
                      cursor: "pointer",
                      border: "none",
                      outline: "none", // Remove the default button outline
                    }}
                    onClick={() => createMove(colIndex)}
                  ></button>
                ))}
              </div>
            ))}
          </div>
          <div>
            <p>Click on a column to make your move</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ManualStartSet;
