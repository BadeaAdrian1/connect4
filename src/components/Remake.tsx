import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Move {
  column: string;
  player: string;
}

const Remake = () => {
  const [moves, setMoves] = useState<Move[]>([]);
  const [board, setBoard] = useState<string[][]>([
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ]);
  const [moveNumber, setMoveNumber] = useState<number>();

  const lettersToNumber = new Map([
    ["A", 0],
    ["B", 1],
    ["C", 2],
    ["D", 3],
    ["E", 4],
    ["F", 5],
    ["G", 6],
  ]);

  let { gameId } = useParams();

  const displayBoard = (currentMoveNumber: number) => {
    let currentBoard: string[][] = [
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
    ];

    for (let i = 0; i <= currentMoveNumber; i++) {
      let col = lettersToNumber.get(moves[i].column);
      if (typeof col === "number") {
        for (let j = col; j < 7; j++) {
          for (let k = 5; k >= 0; k--) {
            if (currentBoard[k][j] !== "") {
              continue;
            } else {
              currentBoard[k][j] = moves[i].player === "OUR_TEAM" ? "R" : "Y";
            }
          }
        }
      } else {
        console.log("Column is not between A-G");
      }
    }

    setBoard(currentBoard);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp":
        if (moveNumber === moves.length - 1) {
          alert(
            "This is the last move of the game, press down arrow to see the previous move!"
          );
        } else {
          setMoveNumber((moveNumber) => moveNumber+1);
          console.log(moveNumber);
        }
        break;
      case "ArrowDown":
        if (moveNumber === 0) {
          alert(
            "This is the first move of the game, press up arrow to see the next move!"
          );
        } else {
          setMoveNumber((moveNumber) => Math.max(0,moveNumber-1));
          console.log(moveNumber);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchMoves = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/games/details?gameId=${gameId}`
        );
        const data = await response.json();
        setMoves(data.moveDtosList);
        setMoveNumber(data.moveDtosList.length-1);
      } catch (error) {
        console.log("Error fetching game details: ", error);
      }
    };

    fetchMoves();

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  // useEffect(() => {
  //   console.log(moveNumber);
  //   displayBoard(moveNumber);
  // }, [moveNumber]);

  return (
    <div
      className="container mt-4 px-5 py-2 text-center"
      style={{
        backgroundColor: "#111111",
        width: "55rem",
        height: "35rem",
        borderRadius: "2rem",
      }}
    >
      {board.map((row: string[], rowIndex) => (
        <div key={rowIndex} className="row py-2">
          {row.map((col: string, colIndex) => (
            <span
              className="col mx-3"
              key={colIndex}
              style={{
                backgroundColor:
                  col === "" ? "grey" : col === "R" ? "red" : "yellow",
                height: "75px",
                borderRadius: "50%",
              }}
            ></span>
          ))}
        </div>
      ))}
      <div>
        <p>Move number: {moveNumber+1}</p>
        <p>Press up/down arrows to see the moves!</p>
      </div>
    </div>
  );
};

export default Remake;
