import { useSelector, useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyIcon from "@mui/icons-material/WbSunnyOutlined";
import { AppBar, Box, Button, IconButton, Stack, Toolbar, useScrollTrigger } from "@mui/material";
import { cloneElement, useState } from 'react';
import { Link } from 'react-router-dom';
import menuConfigs from '../../configs/menu.config.js';
import { themeMode } from '../../configs/theme.config.js';
import { setAuthModalOpen} from '../../redux/features/authModalSlice';
import { setMode } from '../../redux/features/modeSlice.js';
import Logo from './Logo'
import UserMenu from "./UserMenu.jsx";


// const ScrollBar = ({ children, window }) => {
//     const themeMode  = useSelector((state) => state.themeMode);

//     const trigger = useScrollTrigger({
//         disableHysteresis: true,
//         threshold: 50,
//         target: window ? window() : undefined
//     })

//     return cloneElement(children, {
//         sx: {
//             color: trigger ? "text.primary" : themeMode === themeMode.dark ? "primary.contrastText" : "text.primary",
//             backgroundColor: trigger ? "backgrounde.paper" : themeMode === themeMode.dark ? "transparent" : "background.paper"
//         }
//     })
// }

const TopBar = () => {

    const { user } = useSelector((state) => state.user);
    const { appState } = useSelector((state) => state.appState);
    const themeModes = useSelector((state) => state.themeModes);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const dispathc = useDispatch();

    const onSwitchMode = () => {
        const theme = themeModes === themeMode.dark ? themeMode.light : themeMode.dark;
        dispathc(setMode(theme))
    };

    const toggleSideBar = () => setSidebarOpen(!sidebarOpen)

    return (
        <>
            
            <AppBar elevation={0} sx={{ zIndex: 9999 }}>

                <Toolbar sx={{ alignItems: "center", justifyContent: "space-between" }}>

                    <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton
                            color="inherit"
                            sx={{
                                mr: 3,
                                display: { md: "none" }
                            }}
                            onClick={toggleSideBar}
                        >
                            <MenuIcon />

                        </IconButton>
                        <Box sx={{ display: { xs: "inline-block", md: "none" } }}>
                            <Logo />

                        </Box>

                    </Stack>

                    <Box flexGrow={10} alignItems="center" display={{ sx: "none", md: "flex", }}>
                        <Box sx={{ marginRight: "30px" }}>
                            <Logo />
                        </Box>


                        {menuConfigs.main.map((item, index) => (
                            <Button
                                key={index}
                                sx={{
                                    color: appState.includes(item.state) ? "primary.contrastText" : "inherit",
                                    mr: 2
                                }}
                                component={Link}
                                to={item.path}
                                variant={appState.includes(item.state) ? "contained" : "text"}
                            >
                                {item.display}
                            </Button>
                        ))}

                    </Box>
                    <Stack
                        spacing={3}
                        direction="row"
                        alignItems="center"
                    >
                        {!user && <Button
                                variant="contained"
                                onClick={() => dispathc(setAuthModalOpen(true))}
                            >
                                Sing In
                            </Button>
                        }
                    </Stack>
                    {user && <UserMenu />}
                </Toolbar>

            </AppBar>

        </>
    )
}

export default TopBar