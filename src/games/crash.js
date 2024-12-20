import React, { useState, useEffect } from "react";

const CrashGame = () => {
  const [multiplier, setMultiplier] = useState(1.0); // Multiplicador atual
  const [running, setRunning] = useState(false); // Indica se o jogo está em execução
  const [crashed, setCrashed] = useState(false); // Indica se o jogo já colapsou
  const [playerCashout, setPlayerCashout] = useState(null); // Multiplicador em que o jogador encerrou
  const [betAmount, setBetAmount] = useState(10); // Valor da aposta
  const [balance, setBalance] = useState(100); // Saldo do jogador
  const [playerActive, setPlayerActive] = useState(true); // Indica se o jogador ainda está ativo
  const [history, setHistory] = useState([])

  useEffect(() => {
    let interval;
    if (running && !crashed) {
      interval = setInterval(() => {
        const nextMultiplier = (multiplier + Math.random() * 0.1).toFixed(2);
        setMultiplier(parseFloat(nextMultiplier));

        // Simula o momento do crash
        if (Math.random() < 0.02) {
          setCrashed(true);
          clearInterval(interval);
          setRunning(false);
          setHistory([...history, parseFloat(nextMultiplier)])
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [running, multiplier, crashed]);

  const startGame = () => {
    setRunning(true);
    setCrashed(false);
    setMultiplier(1.0);
    setPlayerCashout(null);
    setPlayerActive(true);
  };

  const cashOut = () => {
    if (!crashed && running && playerActive) {
      setPlayerCashout(multiplier);
      setBalance(balance + betAmount * multiplier - betAmount);
      setPlayerActive(false); // Marca o jogador como não ativo
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 h-screen">
      <h1 className="text-3xl font-bold mb-4">Crash Game 🚀</h1>
      <div className="w-full max-w-md bg-gray-600 rounded-lg p-6 text-center">
        {crashed ? (
          <p className="text-red-500 text-xl font-bold">💥 Crashed at {multiplier}x</p>
        ) : (
          <p className="text-2xl font-bold">{multiplier}x</p>
        )}
        {playerCashout && !playerActive ? (
          <p className="text-green-500 text-xl font-bold">
            🤑 You cashed out at {playerCashout}x!
          </p>): null}
        <div className="mt-6">
          <label className="block text-sm text-gray-300 mb-2">
            Bet Amount
          </label>
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(parseFloat(e.target.value))}
            disabled={running}
            className="w-20 p-2 bg-gray-700 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <button
          onClick={running ? cashOut : startGame}
          className={`mt-4 px-6 py-2 rounded ${
            running
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={!playerActive && running} // Desabilita Cash Out se o jogador já fez
        >
          {running ? "Cash Out" : "Start Game"}
        </button>
      </div>
      <div className="mt-6 text-lg">
        <p>
          Balance: <span className="font-bold">${balance.toFixed(2)}</span>
        </p>
      </div>
      <div>
      {
        history.map(mult => (
          <><p>{mult}</p></>
        ))
      }
      </div>
      
    </div>
  );
};

export default CrashGame;
