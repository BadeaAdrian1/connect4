import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface Move {
  column: string;
  moveType: string;
  player: string;
}

const SinglePlayerStart = () => {
  // const storedSetId = localStorage.getItem("setId");
  //                                            storedSetId ||
  const [setId, updateSetId] = useState<string>("");
  const [gameId, updateGameId] = useState<string>("");
  const [playerTurn, setPlayerTurn] = useState<boolean>(true);
  const [gameFinishedModal, setGameFinishedModal] = useState(false);
  const [winner, setWinner] = useState<string>("NOT_DECIDED");

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
        if (setId !== "") {
          const response = await fetch(
            `http://localhost:8080/api/sets/${setId}/games`
          );
          const data = await response.json();

          if (data && data.length > 0) {
            // TODO: Not just the first item (data[])
            const id = data[data.length - 1].id;
            const winner = data[data.length - 1].winner;
            updateGameId(id);
            setWinner(winner);
            // if (data[0].status !== "IN_PROGRESS") {
            //   localStorage.removeItem("setId");
            //   updateSetId("");
            // }
          } else {
            console.log("No games found for the set");
          }

          // Check if the status is FINISHED and reset localStorage
          // if (data.length > 0 && data[0].status !== "IN_PROGRESS") {
          //   localStorage.removeItem("setId");
          //   updateSetId("");
          // }
        }
      } catch (error) {
        console.log("Error fetching game details: ", error);
      }
    };

    // localStorage.setItem("setId", setId);
    fetchGames();
  }, [setId, playerTurn]);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        if (gameId !== "") {
          const response = await fetch(
            `http://localhost:8080/api/games/details?gameId=${gameId}`
          );
          const data = await response.json();

          if (data && data.moveDtosList) {
            const moves = data.moveDtosList;
            const status = data.gameStatus;

            setStatus(status);
            setMoves(moves);
          }
        }
      } catch (error) {
        console.log("Error fetching game details: ", error);
      }
    };

    fetchGameData();
  }, [gameId, playerTurn]);

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

      moves.forEach((move) => {
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
          console.log("Move or column is undefined");
        }
      });
      if (status !== "IN_PROGRESS") {
        // Game has finished, show a Modal
        setGameFinishedModal(true);
      }

      setBoard(currentBoard);
    };
    displayBoard();
    setPlayerTurn(true);
  }, [moves]);

  async function createMove(colIndex: number) {
    const curentMove = {
      column: numbersToLetters.get(colIndex),
      player: "OPPONENT",
      moveType: null,
    };
    if (status === "IN_PROGRESS") {
      try {
        const sendMoveDto = await fetch(
          `http://localhost:8080/api/games/move`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(curentMove),
          }
        );
        setPlayerTurn(false);
      } catch (error) {
        console.error("Error creating move:", error);
      }
    }
  }
  useEffect(() => {
    const getSetId = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/sets/start?numberOfGames=1&multiplayer=false`,
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
      } catch (error) {
        console.error("Error sending post request: ", error);
      }
    };
    getSetId();
  }, []);

  return (
    <>
      {
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

          <Modal
            show={gameFinishedModal}
            onHide={() => setGameFinishedModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Game Over!</Modal.Title>
            </Modal.Header>
            <Modal.Body>The game is over. {winner} won.</Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setGameFinishedModal(false)}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      }
    </>
  );
};

export default SinglePlayerStart;
