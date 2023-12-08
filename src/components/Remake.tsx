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
  const [moveNumber, setMoveNumber] = useState<number>(1);
  const [totalMoves, setTotalMoves] = useState(0);

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
      if (moves[i] && moves[i].column) {
        let col = lettersToNumber.get(moves[i].column);

        for (let j = col; j < 7; j++) {
          for (let k = 5; k >= 0; k--) {
            if (currentBoard[k][j] !== "") {
              continue;
            } else {
              currentBoard[k][j] = moves[i].player === "OUR_TEAM" ? "R" : "Y";
              break;
            }
          }
          break;
        }
      } else {
        console.log("Move is undefined at index: " + i);
      }
    }

    setBoard(currentBoard);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowRight":
        if (moveNumber < totalMoves) {
          setMoveNumber((moveNumber) => moveNumber + 1);
        } else {
          alert("This is the last move of the game!");
        }
        break;
      case "ArrowLeft":
        setMoveNumber((moveNumber) => Math.max(0, moveNumber - 1));
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
        setTotalMoves(data.moveDtosList.length-1);
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

  useEffect(() => {
    displayBoard(moveNumber);
  }, [moveNumber]);

  // useEffect(() => {
  //   setMoveNumber(totalMoves);
  // }, [moves]);

  return (
    <div className="d-flex flex-column align-items-center text-center flex-grow-1">
      <div className="mt-1" style={{
        backgroundColor: "#111111",
        borderRadius: "4%",
        width: "50%"
      }}>
        {board.map((row: string[], rowIndex) => (
          <div key={rowIndex} className="d-flex p-1">
            {row.map((col: string, colIndex) => (
              <span
                className="col m-2"
                key={colIndex}
                style={{
                  backgroundColor:
                    col === "" ? "grey" : col === "R" ? "red" : "yellow",
                  height: "7rem",
                  borderRadius: "50%",
                }}
              ></span>
            ))}
          </div>
        ))}
      </div>
      <div>
        <p>Move number: {moveNumber + 1}</p>
        <p>Press right/left arrows to see the moves!</p>
      </div>
    </div>
  );
};

export default Remake;
