import { Box } from "@mui/material";
import { Outlet } from "react-router-dom"
import Footer from "../common/Footer";
import GlobalLoading from "../common/GlobalLoading";
import TopBar from "../common/TopBar";
import AuthModal from '../common/AuthModal'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import userApi from '../../modules/user.api'
import favoriteApi from '../../modules/favorite.api'
import { setListFavorites, setUser } from '../../redux/features/userSlice'

const MainLayout = () => {
    const dispatch = useDispatch();

    const {user} = useSelector((state) => state.user);

    useEffect(() => {
      const authUser = async () => {
        const {response, err} = await userApi.getInfo();

        if(response) dispatch(setUser(response));
        if(err) dispatch(setUser(null));
      }
      authUser();
    }, [dispatch])
    


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