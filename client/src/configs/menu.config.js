import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import FavoriteBoredrOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import LockRestOutlinedIcon from "@mui/icons-material/LockResetOutlined";

const main = [
    {
        display: "home",
        path: "/",
        icon: <HomeOutlinedIcon/>,
        state: "home" 
    },
    {
        display: "movies",
        path: "/movie",
        icon: <SlideshowOutlinedIcon/>,
        state: "movie" 
    },
    {
        display: "tv series",
        path: "/tv",
        icon: <LiveTvOutlinedIcon/>,
        state: "tvhome" 
    },
    {
        display: "search",
        path: "/search",
        icon: <SearchOutlinedIcon/>,
        state: "search" 
    },
];

const user = [
    {
        display: "favorites",
        path: "/favorites",
        icon: <FavoriteBoredrOutlinedIcon/>,
        state: "favorites" 
    },
    {
        display: "reviews",
        path: "/reviews",
        icon: <RateReviewOutlinedIcon/>,
        state: "review" 
    },
    {
        display: "password update",
        path: "/password-update",
        icon: <LockRestOutlinedIcon/>,
        state: "password.update" 
    },
    
];

const menuConfigs = {user, main};

export default menuConfigs;