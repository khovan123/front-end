import React from "react";
export const ThemeContext = React.createContext({
  theme: "light",
  toggleTheme: () => {},
});

export default function ThemeContextProvider({ children }) {
  const [themePage, setThemePage] = React.useState("light");
  function handleChangeTheme() {
    setThemePage((prevTheme) => {
      return prevTheme === "light" ? "dark" : "light";
    });
  }
  const themeCtx = {
    theme: themePage,
    toggleTheme: handleChangeTheme,
  };
  return (
    <ThemeContext.Provider value={themeCtx}>{children}</ThemeContext.Provider>
  );
}
