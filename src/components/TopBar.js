export const TopBar = ({ user, balance, toggleSidebar, openModal, setActiveTab, setActiveModal }) => {
  return (
    <div className="bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-10">
      {/* Botão para abrir/fechar a sidebar */}
      <button
        className="text-gray-800 hover:text-gray-600 focus:outline-none"
        onClick={toggleSidebar}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      {/* Nome da empresa */}
      <div className="text-xl font-bold text-gray-800">My Company</div>

      {/* Botões dinâmicos baseados no estado do usuário */}
      {user ? (
        <div className="flex items-center space-x-4">
          {/* Exibição do saldo */}
          <div className="text-gray-800">Balance: ${balance.toFixed(2)}</div>
          {/* Botão para informações pessoais */}
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={() => {
              setActiveTab("Informações Pessoais")
              setActiveModal('Profile')
            }}

          >
            Profile
          </button>
          {/* Botão para abrir o modal de depósito */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
            onClick={() => openModal("deposit")}
          >
            Depósito
          </button>
          {/* Botão para abrir o modal de saque */}
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={() => openModal("withdraw")}
          >
            Saque
          </button>
        </div>
      ) : (
        <div className="space-x-4">
          {/* Botão para abrir o modal de cadastro */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
            onClick={() => openModal("register")}
          >
            Sign Up
          </button>
          {/* Botão para abrir o modal de login */}
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={() => openModal("login")}
          >
            Log In
          </button>
        </div>
      )}
    </div>
  );
};
