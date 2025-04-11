import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { removeToken } from "../utils/token";
import { toggleTheme } from "../features/theme/themeSlice";
import { Moon, Sun, LogOut } from "lucide-react"; // or use your preferred icon set
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const theme = useSelector((state: RootState) => state.theme.mode);

  const handleLogout = () => {
    dispatch(logout());
    removeToken();
    navigate("/signin");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">Horse Manager</h1>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          title="Toggle theme"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Sign out */}
        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-700"
          title="Sign Out"
        >
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
