import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { LoadingButton } from '@mui/lab';
import { Box, Stack, Button, Typography, Chip, Divider } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import uiConfigs from '../configs/ui.config';
import tmdbConfigs from '../api/configs/tmdb.configs';
import mediaApi from '../modules/media.api';
import favoriteApi from '../modules/favorite.api'

import Rate from '../components/common/Rate';
import Container from '../components/common/Container';
import ImageHeader from '../components/common/ImageHeader';

import { setGlobalLoading } from '../redux/features/globalLoadingSlice';
import { setAuthModalOpen } from '../redux/features/authModalSlice';
import { addFavorite, removeFavorite } from '../redux/features/userSlice';


const MediaDetail = () => {

    const { mediaType, mediaId } = useParams();

    const { user, listFavorites } = useSelector((state) => state.user);

    const [media, setMedia] = useState();
    const [isFavorite, setIsFavorite] = useState(false);
    const [onRequest, setOnRequest] = useState(false);
    const [genres, setGenres] = useState(false);

    const dispatch = useDispatch();

    const videoRef = useRef(null);

    useEffect(() => {
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
        <div>MediaDetail</div>
    )
}

export default MediaDetail