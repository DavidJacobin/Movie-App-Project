import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfig from "../../configs/ui.config";
import { routesGen } from '../../routes/routes';
import FavIcon from '@mui/icons-material/Favorite';
import Rate from "./Rate";
import { useSelector } from 'react-redux';
import favoriteUtils from '../../utils/favorite.utils';

const MediaItem = ({ media, mediaType }) => {

    const { listFavourites: listFavorites } = useSelector((state) => state.user);

    const [title, setTitle] = useState("");
    const [posterPath, setPosterPath] = useState("");
    const [releaseDate, setReleaseDate] = useState(null);
    const [rate, setRate] = useState(null);

    useEffect(() => {
        setTitle(media.title || media.name || media.mediaTitle);

        setPosterPath(tmdbConfigs.posterPath(media.poster_path || media.backdrop_path || media.mediaPoster));

        if (mediaType === tmdbConfigs.mediaType.movie) {
            setReleaseDate(media.release_date && media.release_date.split("-")[0])
        } else {
            setReleaseDate(media.first_air_date && media.first_air_date.split("-")[0])
        }

        setRate(media.vote_average || media.mediaRate)

    }, [media, mediaType])

    return (
        <Link to={mediaType !== "people" ? routesGen
            .mediaDetail(mediaType, media.id || media.mediaId) : routesGen.person(media.id)}>
            <Box
                sx={{
                    ...uiConfig.style.backgroundImage(posterPath),
                    paddingTop: "160%",
                    "&:hover .media-info": { opacity: 1, bottom: 0 },
                    "&:hover .media-back-drop, &:hover .media-play-btn": { opacity: 1 },
                    color: "primary.contrastText"

                }}>
                {mediaType !== "people" && (
                <>
                    {favoriteUtils.check({listFavourites: listFavorites, mediaId: media.id}) && (
              <FavIcon
                color="primary"
                sx={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  fontSize: "2rem"
                }}
              />
            )}
                    <Box
                        className="media-back-drop"
                        sx={{
                            opacity: { xs: 1, md: 0 },
                            transition: "all 0.3s ease",
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            backgroundImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))"
                        }}
                    >

                    </Box>
                    <Button
                        className="media-play-btn"
                        variant="contained"
                        startIcon={<PlayArrowIcon />}
                        sx={{
                            display: { xs: "none", md: "flex" },
                            opacity: 0,
                            transition: "all 0.3s ease",
                            position: "absolute",
                            top: "40%",
                            left: "40%",
                            tranform: "translate(-50%, -50%)",
                            "& .MuiButton-startIcon": { marginRight: "-4px" }
                        }}
                    />
                    <Box
                        className="media-info"
                        sx={{
                            transition: "all 0.3s ease",
                            opacity: { xs: 1, md: 0 },
                            position: "absolute",
                            bottom: { xs: 0, md: "-20px" },
                            width: "100%",
                            height: "max-content",
                            boxSizing: "border-box",
                            padding: { xs: "10px", md: "2rem 1rem" }
                        }}
                    >
                        <Stack spacing={{xs: 1, md: 2}}>
                            {rate && <Rate value={rate}/>}

                            <Typography>{releaseDate}</Typography>

                            <Typography
                            variant="body1"
                            fontWeight="700"
                            sx={{
                                fontSize: "1rem",
                                ...uiConfig.style.typoLines(1)

                            }}
                            >{title}</Typography>
                        </Stack>
                    </Box>
                </>
            )}
            {mediaType === "people" && (
                <Box
                sx={{
                    position: "absolute",
                    width: "100%",
                    height: "max-content",
                    bottom: 0,
                    padding: "10px",
                    backgroundColor: "rgba(0,0,0,6)"
                }}
                >
                    <Typography 
                    sx={{
                        ...uiConfig.style.typoLines(1)
                    }}
                    >
                        {media.name}
                    </Typography>
                </Box>

            )}
            </Box>

        </Link>

    )

}

export default MediaItem;