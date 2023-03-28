import { Box } from "@mui/material";
import {Swiper} from "swiper/react";


const AutoSwiper = ({children}) => {
    return (
       <Box
       sx={{
        "& .swiper-slide":{
            width: {
                xs: "50%",
                sm: "35%",
                md: "25%",
                lg: "20.5%"
            }}
       }}
       >
        <Swiper
        slidesPerView="auto"
        grabCursor={true}
        spaceBetween={10}
        scrollbar={{ draggable: true }}
        
        style={{width:"100%", md: "2px"}}
        >
            {children}
        </Swiper>

       </Box> 
    )
}

export default AutoSwiper;