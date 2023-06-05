import { createContext, useContext, ReactNode, useState } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

interface ThemeContextInterface {
  value: THEME_VALUES.LIGHT | THEME_VALUES.DARK;
  setToDark: () => void;
  setToLight: () => void;
}

enum THEME_VALUES {
  LIGHT = "light",
  DARK = "dark",
}

export const ThemeContext = createContext<ThemeContextInterface>({
  value: THEME_VALUES.LIGHT,
  setToDark: () => undefined,
  setToLight: () => undefined,
});

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  return context;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [value, setValue] = useState(THEME_VALUES.LIGHT);

  return (
    <ThemeContext.Provider
      value={{
        value: value,
        setToDark: () => setValue(THEME_VALUES.DARK),
        setToLight: () => setValue(THEME_VALUES.LIGHT),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
