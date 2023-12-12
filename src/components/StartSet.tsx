import { ChangeEvent, FormEvent, useState } from "react";

const StartSet = () => {
  const [numberOfGames, setNumberOfGames] = useState(1);
  const [responseCode, setResponseCode] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNumberOfGames(e.target.valueAsNumber);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/api/sets/start?numberOfGames=${numberOfGames}`,
        { method: "POST" }
      );
      const statusCode: number = response.status;
      setResponseCode(statusCode);
      console.log(responseCode);
    } catch (error) {
      console.error("Error sending post request: ", error);
    }
  };

  return (
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
            placeholder="e.g. 1,10,200..."
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
            Start
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
  );
};

export default StartSet;
