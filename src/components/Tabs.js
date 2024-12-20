export const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = ["Informações Pessoais", "Depósitos", "Saques", "Apostas"];
  return (
    <div className="flex border-b">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`px-4 py-2 ${
            activeTab === tab
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};