// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// interface Move {
//   column: string;
//   player: string;
//   moveType: string;
// }

// const MakeAMove = () => {
//   const [moves, setMoves] = useState<Move[]>([]);
//   const [board, setBoard] = useState<string[][]>([
//     ["", "", "", "", "", "", ""],
//     ["", "", "", "", "", "", ""],
//     ["", "", "", "", "", "", ""],
//     ["", "", "", "", "", "", ""],
//     ["", "", "", "", "", "", ""],
//     ["", "", "", "", "", "", ""],
//   ]);
//   const [status, setStatus] = useState<string>("IN_PROGRESS");

//   const lettersToNumbers = new Map([
//     ["A", 0],
//     ["B", 1],
//     ["C", 2],
//     ["D", 3],
//     ["E", 4],
//     ["F", 5],
//     ["G", 6],
//   ]);

//   const numbersToLetters = new Map([
//     [0, "A"],
//     [1, "B"],
//     [2, "C"],
//     [3, "D"],
//     [4, "E"],
//     [5, "F"],
//     [6, "G"],
//   ]);

//   let { gameId } = useParams();

//   const displayBoard = () => {
//     let currentBoard: string[][] = [
//       ["", "", "", "", "", "", ""],
//       ["", "", "", "", "", "", ""],
//       ["", "", "", "", "", "", ""],
//       ["", "", "", "", "", "", ""],
//       ["", "", "", "", "", "", ""],
//       ["", "", "", "", "", "", ""],
//     ];

//     for (let i = 0; i <= moves.length; i++) {
//       let col = lettersToNumbers.get(moves[i].column);
//       if (typeof col === "number") {
//         for (let j = col; j < 7; j++) {
//           for (let k = 5; k >= 0; k--) {
//             if (currentBoard[k][j] !== "") {
//               continue;
//             } else {
//               currentBoard[k][j] = moves[i].player === "OUR_TEAM" ? "R" : "Y";
//             }
//           }
//         }
//       } else {
//         console.log("Column is not between A-G");
//       }
//     }

//     setBoard(currentBoard);
//   };

//   useEffect(() => {
//     const fetchMoves = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:8080/api/games/details?gameId=${gameId}`
//         );
//         const data = await response.json();

//         // Extract only the number of moves from the response
//         const numberOfMoves = data.numberOfMoves || 0;

//         setStatus(data.gameStatus);
//         setMoves(numberOfMoves);
//       } catch (error) {
//         console.log("Error fetching game details: ", error);
//       }
//     };

//     fetchMoves();
//   }, [gameId]);

//   async function createMove(colIndex: number) {
//     const curentMove = {
//       column: numbersToLetters.get(colIndex),
//       player: "OPPONENT",
//       moveType: null,
//     };
//     try {
//       const sendMoveDto = await fetch(
//         `http://localhost:8080/api/games/move?numberOfGames=${colIndex}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(curentMove),
//         }
//       );
//     } catch (error) {
//       console.error("Error creating move:", error);
//     }
//   }

//   return (
//     <div className="d-flex flex-column align-items-center text-center">
//       <div
//         className="my-4"
//         style={{
//           backgroundColor: "#111111",
//           borderRadius: "4%",
//           width: "700px",
//           height: "500px",
//         }}
//       >
//         {board.map((row: string[], rowIndex) => (
//           <div key={rowIndex} className="d-flex p-1">
//             {row.map((col: string, colIndex) => (
//               <button
//                 className="col m-2"
//                 key={colIndex}
//                 style={{
//                   backgroundColor:
//                     col === "" ? "grey" : col === "R" ? "red" : "yellow",
//                   height: "60px",
//                   borderRadius: "50%",
//                   cursor: "pointer",
//                   border: "none",
//                   outline: "none", // Remove the default button outline
//                 }}
//                 onClick={() => createMove(colIndex)}
//               ></button>
//             ))}
//           </div>
//         ))}
//       </div>
//       <div>
//         <p>Click on a column to make your move</p>
//       </div>
//     </div>
//   );
// };

// export default MakeAMove;
