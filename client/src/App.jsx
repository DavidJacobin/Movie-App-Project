import { ThemeProvider } from "@emotion/react";
import { useSelector } from 'react-redux'
import themeConfigs from "./configs/theme.config.js";
import { ToastContainer } from "react-toastify"

const App = () => {
  const { themeMode } = useSelector((state) => state.themeMode)
  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={themeMode}
      />

    </ThemeProvider>
  );
}

export default App;
