import React, { useEffect } from "react";
import useLocalStorage from "use-local-storage";

const ThemeContext = React.createContext({ theme: "", toggleTheme: () => {} });

export const ThemeContextProvider = (props) => {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  useEffect(() => {
    document.documentElement.setAttribute("theme", theme);
  }, [theme]);
  function toggleTheme() {
    setTheme((prev) => {
      return prev === "light" ? "dark" : "light";
    });
  }
  const themeValue = { theme, toggleTheme };
  return (
    <ThemeContext.Provider value={themeValue}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
