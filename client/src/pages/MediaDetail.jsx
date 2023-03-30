import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { LoadingButton } from '@mui/lab';
import { Box, Stack, Button, Typography, Chip, Divider } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import uiConfigs from '../configs/ui.config.js';
import tmdbConfigs from '../api/configs/tmdb.configs.js';
import mediaApi from '../api/modules/media.api.js';
import favoriteApi from '../api/modules/favorite.api.js'

import Rate from '../components/common/Rate';
import Container from '../components/common/Container';
import ImageHeader from '../components/common/ImageHeader';

import { setGlobalLoading } from '../redux/features/globalLoadingSlice.js';
import { setAuthModalOpen } from '../redux/features/authModalSlice.js';
import { addFavorite, removeFavorite } from '../redux/features/userSlice.js';
///////



const MediaDetail = () => {

    const { mediaType, mediaId } = useParams();

    const { user, listFavorites: listFavourites } = useSelector((state) => state.user);

    const [media, setMedia] = useState();
    const [isFavorite, setIsFavorite] = useState(false);
    const [onRequest, setOnRequest] = useState(false);
    const [genres, setGenres] = useState([]);

    const dispatch = useDispatch();

    const videoRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const getMedia = async () => {
            dispatch(setGlobalLoading(true));
            const { response, err } = await mediaApi.getDetail({mediaType, mediaId});
            dispatch(setGlobalLoading(false));

            if (response) {
                setMedia(response);
                setIsFavorite(response.isFavorite);
                setGenres(response.genres.splice(0,2));
            }

            if (err) toast.error(err.message);


        };
        
        getMedia();

    }, [mediaType, mediaId, dispatch])


    return (
        //<ImageHeader imgPath={tmdbConfigs.backdropPath(media.backdrop_path || media.poster_path)}/>
        <>DETAILS</>
        
    )
}

export default MediaDetail