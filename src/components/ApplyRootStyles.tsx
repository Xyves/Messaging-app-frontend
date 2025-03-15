import { useEffect } from "react";
import { useColorMode } from "./ui/color-mode";

export const ApplyRootStyles = () => {
  const { colorMode } = useColorMode();

  useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      root.style.backgroundColor = colorMode === "dark" ? "#1A202C" : "#FFFFFF"; // Dark: Gray-900, Light: White
      root.style.transition = "background-color 0.3s ease-in-out"; // Smooth transition
    }
  }, [colorMode]);
  return null;
};
