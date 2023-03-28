import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {Box,  Button, Stack, Typography} from '@mui/material';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfig from "../../configs/ui.config";
import {routesGen} from '../../routes/routes';
import FavIcon from '@mui/icons-material/Favorite';
import Rate from "./Rate";
import {useSelector} from 'react-redux';
import favoriteUtils from '../../utils/favorite.utils';

const MediaItem = ({media, mediaType}) => {

    const {listFavorite} = useSelector((state) => state.user);

    const [title, setTitle] = useState("");
    const [posterPath, setPosterPath] = useState("");
    const [releaseDate, setReleaseDate] = useState(null);
    const [rate, setRate] = useState(null);

    useEffect(() => {
        setTitle(media.title || media.name || media.mediaTitle);

        setPosterPath(tmdbConfigs.posterPath(media.poster_path || media.backdrop_path || media.mediaPoster));

        if(mediaType === tmdbConfigs.mediaType.movie) {
            setReleaseDate( media.release_date && media.release_date.split("-")[0])
        }else {
            setReleaseDate(media.first_air_date && media.first_air_date.split("-")[0])
        }

        setRate(media.vote_average || media.mediaRate)
        
    },[media, mediaType])

    return (
        <Link to={mediaType !== "people" ? routesGen
        .mediaDetail(mediaType, media.id || media.mediaId) : routesGen.person(media.id)}>
            <Box
            sx={{
                ...uiConfig.style.backgroundImage(posterPath),
                paddingTop: "160%",
                "&:hover .media-info":{opacity: 1, bottom: 0},
                "&:hover .media-back-drop, &:hover .media-play-btn":{opacity: 1},
                color: "primary.contrastText"

            }}
            >

            </Box>

        </Link>
        
    )

}

export default MediaItem;