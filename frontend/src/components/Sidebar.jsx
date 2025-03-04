import { NavLink } from "react-router-dom";
import { Settings, Layout, FileText } from "lucide-react";

const Sidebar = () => (
  <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white pt-16">
    <div className="p-4">
      <nav className="space-y-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-3 rounded-lg ${
              isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`
          }
        >
          <Layout className="h-5 w-5" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/proposals"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-3 rounded-lg ${
              isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`
          }
        >
          <FileText className="h-5 w-5" />
          <span>Proposals</span>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-3 rounded-lg ${
              isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-800'
            }`
          }
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </NavLink>
      </nav>
    </div>
  </aside>
);

export default Sidebar;