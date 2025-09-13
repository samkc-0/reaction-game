import { useState, useEffect } from "react";
import styled from "styled-components";

const Colors = {
  INACTIVE: "red",
  ACTIVE: "lime",
};

const Block = styled.div`
  background-color: ${(props) => props.color};
  width: 100px;
  height: 100px;
  border-radius: 5px;
  cursor: pointer;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Button = styled.button`
  background-color: black;
  color: white;
  border-radius: 5px;
  padding: 1rem;
`;

function randomDurationInSeconds(lower, upper) {
  return lower + Math.random() * (upper - lower);
}

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [color, setColor] = useState(Colors.INACTIVE);
  const [timerStart, setTimerStart] = useState(null);
  const [message, setMessage] = useState("");

  const handleClick = () => {
    if (color === Colors.INACTIVE) {
      setMessage("You clicked too early!");
    } else if (color === Colors.ACTIVE) {
      const now = new Date();
      const dt = now - timerStart;
      setMessage(`You took ${dt}ms seconds.`);
    }
    setGameOver(true);
  };

  const changeColor = () => {
    setColor(Colors.ACTIVE);
    setTimerStart(new Date());
  };

  const reset = () => {
    setGameOver(false);
    setColor(Colors.INACTIVE);
  };

  useEffect(() => {
    if (gameOver) return;
    const timeout = setTimeout(
      changeColor,
      randomDurationInSeconds(1, 4) * 1000,
    );
    return () => clearTimeout(timeout);
  }, [gameOver]);

  return (
    <Flex>
      {gameOver ? (
        <>
          <Button onClick={reset}>Start Game</Button>
          <h2>{message}</h2>
        </>
      ) : (
        <Block color={color} onClick={handleClick} />
      )}
    </Flex>
  );
}

export default App;
