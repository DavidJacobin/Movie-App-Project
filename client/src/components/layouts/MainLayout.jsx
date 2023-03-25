import { Box } from "@mui/material";
import { Outlet } from "react-router-dom"
import Footer from "../common/Footer";
import GlobalLoading from "../common/GlobalLoading";
import TopBar from "../common/TopBar";
import AuthModal from '../common/AuthModal'

const MainLayout = () => {
  return (
    <>
      {/*globalloading */}
      <GlobalLoading />
      {/*globalloading */}

      {/* login */}
      <AuthModal />
      {/* login */}

      <Box display="flex" minHeight="100vh">
        {/*topBar */}
        <TopBar />
        <Box
          component="main"
          flexGrow={1}
          overflow="hidden"
          minHeight="100vh"
        >

          <Outlet />
        </Box>

      </Box>
      <Footer />
    </>
  )
}

export default MainLayout