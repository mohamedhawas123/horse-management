import { useSelector } from "react-redux";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { RootState } from "./store";
import { useEffect } from "react";

function App() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);
  return <AppRoutes />;
}

export default App;
