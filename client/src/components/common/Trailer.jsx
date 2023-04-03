import { Box } from "@mui/material";
import { useEffect, useRef } from 'react';
import { SwiperSlide } from "swiper/react";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import NavigationSwiper from "./NavigationSwiper";


const MediaVideo = ({ video }) => {

    const frameRef = useRef();

    useEffect(() => {

        const height = frameRef.current.offsetWidth * 10+ "px"
        frameRef.current.setAttribute("heiht", height);


    }, [])

    return (
        <Box sx={{ height: "600px" }}>
            <iframe
                key={video.key}
                src={tmdbConfigs.youtubePath(video.key)}
                ref={frameRef}
                width="100%"
                height="100%"
                title={video.id}
                style={{ border: 0 }}
            >

            </iframe>

        </Box>
    )

}

const Trailer = ({ videos }) => {
    return (
        <NavigationSwiper>
            {videos.map((video, index) => (

                <SwiperSlide key={index}>
                    <MediaVideo video={video} />

                </SwiperSlide>
            ))}

        </NavigationSwiper>
    )

};

export default Trailer;