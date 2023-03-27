import PlayArrow from '@mui/icons-material/PlayArrow';
import {Box, Button, Chip, Divider, Stack, Typography} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {Autoplay} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import {toast} from 'react-toastify';

import {setGlobalLoading} from '../../redux/features/globalLoadingSlice';
import {routers } from '../../routes/routes';

import uiConfig from '../../configs/ui.config';
import Rate from './Rate';

import tmdbConfigs from '../../api/configs/tmdb.configs';
import genreApi from '../../modules/genre.api';
import mediaApi from '../../modules/media.api'

const HeroSlide = ({mediaType, mediaCategory}) => {

    const dispatch = useDispatch();

    const [movies, setMovies] = useState([]);
    const [genre, setGenre] = useState([]);

    useEffect(() => {
      const getMedias = async () => {
        const {response, err} = await mediaApi.getList({
            mediaType,
            mediaCategory,
            page: 1
        });

       

        if (response) setMovies(response.results);
        if (err) toast.error(err.message);
        dispatch(setGlobalLoading(false))
      }

      const getGenres = async () => {
        dispatch(setGlobalLoading(true))
        const {response, err} = await genreApi.getList({mediaType});

        if (response) {
            setGenre(response.genres)
            getMedias()
        }
        if (err) {
            toast.error(err.message)
            setGlobalLoading(false)
        }
      }
    
      getGenres();
    }, [mediaType, mediaCategory, dispatch])
    

    return(
        <Box
        sx={{
            position: 'relative',
            color: "primary.contrastText",
            "&::before":{
                content: '""',
                width: "100%",
                height: "30%",
                position: "absolute",
                bottom: 0,
                left: 0,
                zIndex: 2,
                pointerEvents: "none"
            }
        }}
        >
            <Swiper
            grabCursor={true}
            loop={true}
            modules={[Autoplay]}
            style={{width:"100%", height: "max-content"}}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false
            }}
            >
                {movies.map((movie, index) => (
                    <SwiperSlide key={index}>
                        <Box
                        sx={{
                            paddingTop: {
                                xs:"130%",
                                sm: "80%",
                                md: "60%",
                                lg: "45%"
                            },
                            backgroundPosition: "top",
                            backgroundSize: "cover",
                            backgroundImage: `url(${tmdbConfigs
                                .backdropPath(movie.backdropPath || movie.poster_path)})`
                        }}
                        >

                        </Box>

                    </SwiperSlide>
                ))}

            </Swiper>

        </Box>
    )

}

export default HeroSlide;