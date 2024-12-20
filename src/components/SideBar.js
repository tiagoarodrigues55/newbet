export const Sidebar = ({ isSidebarOpen, toggleSidebar, setActiveModal }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 bg-gray-800 text-white w-64 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-20`}
    >
      <div className="p-4 text-lg font-bold">Menu</div>
      <nav className="mt-4">
        <ul>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={() => {
            setActiveModal('Dice')
            toggleSidebar()
            }}>Dice</li>
                      <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={() => {
            setActiveModal('Crash')
            toggleSidebar()
            }}>Crash</li>
        </ul>
      </nav>
    </div>
  );
};