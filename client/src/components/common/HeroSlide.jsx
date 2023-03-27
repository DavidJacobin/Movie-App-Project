import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Chip, CircularProgress, Divider, Stack, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { toast } from 'react-toastify';
import {Link} from "react-router-dom"

import { setGlobalLoading } from '../../redux/features/globalLoadingSlice';
import { routers, routesGen } from '../../routes/routes';

import uiConfig from '../../configs/ui.config';
import Rate from './Rate';

import tmdbConfigs from '../../api/configs/tmdb.configs';
import genreApi from '../../modules/genre.api';
import mediaApi from '../../modules/media.api'

const HeroSlide = ({ mediaType, mediaCategory }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [movies, setMovies] = useState([]);
    const [genre, setGenre] = useState([]);

    useEffect(() => {
        const getMedias = async () => {
            const { response, err } = await mediaApi.getList({
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
            const { response, err } = await genreApi.getList({ mediaType });

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


    return (
        <Box
            sx={{
                position: 'relative',
                color: "primary.contrastText",
                "&::before": {
                    content: '""',
                    width: "100%",
                    height: "30%",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    zIndex: 2,
                    pointerEvents: "none",
                    ...uiConfig.style.gradientBgImage[theme.palette.mode]
                }
            }}
        >
            <Swiper
                grabCursor={true}
                loop={true}
                modules={[Autoplay]}
                style={{ width: "100%", height: "max-content" }}
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
                                    xs: "100%",
                                    sm: "80%",
                                    md: "60%",
                                    lg: "45%"
                                },
                                backgroundPosition: "top",
                                backgroundSize: "cover",
                                backgroundImage: `url(${tmdbConfigs
                                    .backdropPath(movie.backdropPath || movie.poster_path)})`
                            }} />
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                                top: 0,
                                left: 0,
                                ...uiConfig.style.horizontalGradientBgImage[theme.palette.mode]
                            }}
                        />

                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                                top: 0,
                                left: 0,
                                paddingX: { sm: "10px", md: "5rem", lg: "10rem" }
                            }}
                        >
                            <Box
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    paddingX: "30px",
                                    color: "tex.primary",
                                    width: { sm: "unset", md: "30%", lg: "40%" }
                                }}
                            >
                                <Stack spacing={4} direction="column">
                                    {/*title */}
                                    <Typography
                                        variant='h4'
                                        fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                                        fontWeight="700px"
                                        sx={{
                                            ...uiConfig.style.typoLines(3)
                                        }}

                                    >
                                        {movie.title || movie.name}
                                    </Typography>
                                    {/*title */}

                                    <Stack direction="row" spacing={1}>
                                        {/*raiting */}
                                        <Rate value={movie.vote_average} />
                                        <Divider orientation='vertical' />
                                        {[...movie.genre_ids].slice(0, 3).map((genreId, index) => (
                                            <Chip
                                                variant='filled'
                                                color='primary'
                                                kay={index}
                                                label={genre.find(e => e.id === genreId)
                                                    && genre.find(e => e.id === genreId).name}
                                            />
                                        ))}

                                    </Stack>
                                    <Typography variant="body1" sx={{
                                        ...uiConfig.style.typoLines(3)
                                    }}>
                                        {movie.overview}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        startIcon={<PlayArrowIcon />}
                                        component={Link}
                                        to={routesGen.mediaDetail(mediaType, movie.id)}
                                        sx={{ width: "max-content" }}
                                    >
                                        watch now
                                    </Button>
                                </Stack>

                            </Box>

                        </Box>

                    </SwiperSlide>
                ))}

            </Swiper>

        </Box>
    )

}

export default HeroSlide;