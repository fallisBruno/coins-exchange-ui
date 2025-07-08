import { useState } from "react";

function Exchange() {
  const [inputValue, setInputValue] = useState<any>();
  const [responseMessage, setResponseMessage] = useState();
  const [errorMessage, setErrorMessage] = useState<Error>();

  const onClick = async () => {
    const coinsData = await fetch(
      `http://localhost:8080/exchange?moneyInput=${inputValue}`
    )
      .then((res) => {
        if (res.ok) return res.json();
        return res.text().then((text) => {
          throw new Error(text);
        });
      })
      .catch((err) => setErrorMessage(err));

    setResponseMessage(coinsData);
  };

  const displayResponseMessage = () => {
    if (responseMessage) {
      return Object.keys(responseMessage)
        .filter((coin) => responseMessage[coin] > 0)
        .sort()
        .map((coin) => (
          <p>
            {" "}
            - {responseMessage[coin]} coins of ${coin} (cents)
          </p>
        ));
    } else if (errorMessage) {
      console.log(errorMessage);
      return <p>{errorMessage.message}</p>;
    }
  };

  return (
    <div>
      <input
        placeholder="Insert your bill here"
        type={"number"}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={onClick}>exchange</button>
      {displayResponseMessage()}
    </div>
  );
}

export default Exchange;
