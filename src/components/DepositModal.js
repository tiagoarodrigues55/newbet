import React, { useState, useEffect } from "react";


export const DepositModal = ({ isOpen, closeModal, handleDeposit }) => {
  const [amount, setAmount] = useState("");

  if (!isOpen) return null;

  const onSubmit = (e) => {
    e.preventDefault();
    if (amount <= 0) {
      alert("Please enter a valid amount!");
      return;
    }
    handleDeposit(amount);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Deposit</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400"
            >
              Deposit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
