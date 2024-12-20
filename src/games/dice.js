import React, { useState } from "react";
import { Input } from "@nextui-org/react";



const DiceGame = () => {
  const [betAmount, setBetAmount] = useState(10);
  const [targetNumber, setTargetNumber] = useState(50);
  const [result, setResult] = useState(null);
  const [win, setWin] = useState(null);
  const [multiplier, setMultiplier] = useState('1.00');
  const [chanceOfWinning, setChanceOfWinning] = useState('50.00');

  const calculateMultiplier = (chance) => {
    return (100 / chance).toFixed(2);
  };

  const rollDice = () => {
    const randomNumber = Math.random() * 100; // Gera um número entre 0 e 100
    setResult(randomNumber.toFixed(2));

    if (randomNumber > targetNumber) {
      setWin(true);
    } else {
      setWin(false);
    }
  };

  const handleTargetChange = (value) => {
    setTargetNumber(value);
    const newChance = (100 - value).toFixed(2);
    setChanceOfWinning(newChance);
    setMultiplier(calculateMultiplier(newChance));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 ">
      <div className="w-96 bg-gray-300 p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Valor da Aposta</label>
          <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                className="flex-1 p-2 rounded-lg bg-gray-700 focus:ring focus:ring-yellow-500"
              />

        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium mb-2">Número-Alvo</label>
          <input
            type="range"
            min="0"
            max="100"
            value={targetNumber}
            onChange={(e) => handleTargetChange(e.target.value)}
            className="w-full"
          />
          <p className="text-center mt-2">Alvo: {targetNumber}</p>
        </div>

        <div className="mb-4">
          <p className="text-lg font-medium">Chance de Vitória: {chanceOfWinning}%</p>
          <p className="text-lg font-medium">Multiplicador: x{multiplier}</p>
          <p className="text-lg font-medium">
            Lucro na Vitória: {(betAmount * multiplier).toFixed(2)}
          </p>
        </div>

        <button
          onClick={rollDice}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-4 font-bold"
        >
          Apostar
        </button>

        {result !== null && (
          <div className="mt-6 text-center">
            <p className="text-lg">Resultado: {result}</p>
            {win ? (
              <p className="text-green-400 font-bold">Você venceu!</p>
            ) : (
              <p className="text-red-400 font-bold">Você perdeu!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiceGame;
