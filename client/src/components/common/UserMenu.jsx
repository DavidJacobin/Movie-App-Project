import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {ListItemButton, ListItemIcon, ListItemText, Menu, Typography, MenuList, IconButton } from "@mui/material";
import {useState} from "react";
import { useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import menuConfigs from "../../configs/menu.config";
import {setUser} from "../../redux/features/userSlice";


const UserMenu = () => {
    const { appState } = useSelector((state) => state.appState);
    const {user} = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);

    const toggleMenu = (e) => setAnchorEl(e.currentTarget);

  return (
    <>
    {user && (
        <>
            <Typography
                variant="h6" 
                sx={{
                    cursor: "pointer",
                    userSelect: "none",
                }}
                onClick={toggleMenu}
            >
                
                <IconButton
                sx={{
                    color: appState ? "primary.contrastText" : "inherit",
                    mr: 2
                }}
                >Menu</IconButton>
            </Typography>
            <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            PaperProps={{sx: {padding: 0}}}
            >
                {menuConfigs.user.map((item, index) =>(
                    <ListItemButton
                        component={Link}
                        to={item.path}
                        key={index}
                        onClick={() => setAnchorEl(null)}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText disableTypography
                         primary={
                            <Typography textTransform="uppercase">{item.display}</Typography>
                         }/>

                    </ListItemButton>
                ))}
                <ListItemButton
                sx={{borderRadius: "10px"}}
                onClick={ () => dispatch(setUser(null))}
                >
                <ListItemIcon><LogoutOutlinedIcon/></ListItemIcon>
                <ListItemText
                disableTypography
                primary={<Typography textTransform="uppercase"> Sing Out</Typography>}
                />
                </ListItemButton>
            </Menu>

        </>
    )}
    </>
  )
}

export default UserMenu