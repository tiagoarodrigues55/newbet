import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import { Sidebar } from "@/components/SideBar";
import { LoginModal } from "@/components/LoginModal";
import { RegisterModal } from "@/components/RegisterModal";
import { DepositModal } from "@/components/DepositModal";
import { WithdrawModal } from "@/components/WithdrawModal";

import { MainPage } from "@/components/MainPage";
import { TopBar } from "@/components/TopBar";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // Controla o modal ativo
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [activeTab, setActiveTab] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const openModal = (modal) => setActiveModal(modal); // Abre o modal especificado
  const closeModal = () => setActiveModal(null); // Fecha qualquer modal ativo

  const handleLogin = (email, password) => {
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("user_token", data.token);
        setUser(data.user);
        setBalance(data.balance);
        closeModal();
      })
      .catch((error) => console.error("Error logging in:", error));
  };

  const handleRegister = (email, password) => {
    // Simulação de cadastro
    console.log("Register:", email, password);
    closeModal();
  };

  const handleDeposit = (amount) => {
    // Simulação de depósito
    setBalance((prev) => prev + parseFloat(amount));
    console.log("Deposit:", amount);
    closeModal();
  };

  const handleWithdraw = (amount) => {
    if (amount > balance) {
      alert("Insufficient balance!");
      return;
    }
    // Simulação de saque
    setBalance((prev) => prev - parseFloat(amount));
    console.log("Withdraw:", amount);
    closeModal();
  };

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    if (userToken) {
      fetch("/api/get-user-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: userToken }),
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data.user);
          setBalance(data.balance);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);

  return (
    <div className="h-screen grid grid-rows-[auto_1fr] grid-cols-1 md:grid-cols-[auto_1fr]">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setActiveModal={setActiveModal} />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}
      <div className="md:col-span-2">
        <TopBar
          user={user}
          balance={balance}
          toggleSidebar={toggleSidebar}
          openModal={openModal} // Abre o modal conforme o botão
          setActiveTab={setActiveTab}
          setActiveModal={setActiveModal}

        />
      </div>
      <div className="bg-gray-100 md:col-span-2">
        <MainPage activeModal={activeModal} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Renderiza o modal baseado no estado ativo */}
      {activeModal === "login" && (
        <LoginModal isOpen={true} closeModal={closeModal} handleLogin={handleLogin} />
      )}
      {activeModal === "register" && (
        <RegisterModal isOpen={true} closeModal={closeModal} handleRegister={handleRegister} />
      )}
      {activeModal === "deposit" && (
        <DepositModal isOpen={true} closeModal={closeModal} handleDeposit={handleDeposit} />
      )}
      {activeModal === "withdraw" && (
        <WithdrawModal isOpen={true} closeModal={closeModal} handleWithdraw={handleWithdraw} />
      )}
    </div>
  );
}
