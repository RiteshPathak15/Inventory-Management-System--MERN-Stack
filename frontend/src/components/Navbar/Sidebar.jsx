import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-gray-200 fixed flex flex-col">
      <h1 className="text-2xl font-bold text-center py-4 border-b border-gray-700">
        Inventory App
      </h1>
      <nav className="flex-1">
        <ul className="space-y-4 mt-6">
          <li>
            <Link
              to="/"
              className="flex items-center px-6 py-3 text-lg hover:bg-gray-800 rounded-md"
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>
      <footer className="py-4 text-center text-sm border-t border-gray-700">
        © {new Date().getFullYear()} Inventory App
      </footer>
    </div>
  );
};

export default Sidebar;
