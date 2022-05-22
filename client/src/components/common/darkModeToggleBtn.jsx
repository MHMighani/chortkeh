import { useContext } from "react";
import ToggleSwitch from "./toggleSwitch";
import ThemeContext from "../../context/themeContext";

const DarkModeToggleBtn = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <ToggleSwitch
      handleClick={themeContext.toggleTheme}
      active={themeContext.theme === "dark" ? true : false}
    />
  );
};

export default DarkModeToggleBtn;
