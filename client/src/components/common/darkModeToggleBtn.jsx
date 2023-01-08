import { useContext } from "react";
import ToggleSwitch from "./toggleSwitch/toggleSwitch";
import ThemeContext from "../../context/themeContext";

const DarkModeToggleBtn = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <ToggleSwitch
      handleClick={themeContext.toggleTheme}
      active={themeContext.theme === "dark"}
    />
  );
};

export default DarkModeToggleBtn;
