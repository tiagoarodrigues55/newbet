
export const TabContent = ({ activeTab }) => {
  switch (activeTab) {
    case "Informações Pessoais":
      return <div className="p-4">Aqui estão suas informações pessoais.</div>;
    case "Depósitos":
      return <div className="p-4">Histórico de depósitos.</div>;
    case "Saques":
      return <div className="p-4">Histórico de saques.</div>;
    case "Apostas":
      return <div className="p-4">Histórico de apostas.</div>;
    default:
      return null;
  }
};
