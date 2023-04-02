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
import { color } from '@mui/system';
import PlayArrow from '@mui/icons-material/PlayArrow';
///////



const MediaDetail = () => {

    const { mediaType, mediaId } = useParams();

    const { user, listFavorites } = useSelector((state) => state.user);

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
            const { response, err } = await mediaApi.getDetail({ mediaType, mediaId });
            dispatch(setGlobalLoading(false));

            if (response) {
                setMedia(response);
                setIsFavorite(response.isFavorite);
                setGenres(response.genres.splice(0, 2));
            }

            if (err) toast.error(err.message);


        };

        getMedia();

    }, [mediaType, mediaId, dispatch])

    const onFavoriteClick = async () =>{
      if(!user) return dispatch(setAuthModalOpen(true))

      if (onRequest) return

      if (isFavorite) {
        onRemoveFavorite();
        return;
      }

      setOnRequest(true);

      const body = {
        mediaId: media.id,
        mediaTitle: media.title || media.name,
        mediaType: mediaType,
        mediaPoster: media.poster_path,
        mediaRate: media.vote_average
      };

      const {response, err} = await favoriteApi.add(body)

      setOnRequest(false);

      if (err) toast.error(err.message);

      if (response) {
        dispatch(addFavorite(response));
        setIsFavorite(true);
        toast.success("Added to favorites!")

      }
      
    };

    const onRemoveFavorite = async () => {
      if (onRequest) return

      setOnRequest(true)

      const favorite = listFavorites.find(e => e.mediaId.toString() === media.id.toString())

      const {response, err} = await favoriteApi.remove({favoriteId: favorite.id})

      setOnRequest(false);

      if(err) return toast.error(err.message);

      if(response) {
        dispatch(removeFavorite(response));
        setIsFavorite(false);
        toast.success("Successfully removed favorite!")
      }

    }


    return (

        media ? (
            <>
              <ImageHeader imgPath={tmdbConfigs.backdropPath(media.backdrop_path || media.poster_path)} />
              <Box sx={{
                color: "primary.contrastText",
                ...uiConfigs.style.mainContent
              }}>
                {/* media content */}
                <Box sx={{
                  marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" }
                }}>
                  <Box sx={{
                    display: "flex",
                    flexDirection: { md: "row", xs: "column" }
                  }}>
                    {/* poster */}
                    <Box sx={{
                      width: { xs: "70%", sm: "50%", md: "40%" },
                      margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" }
                    }}>
                      <Box sx={{
                        paddingTop: "140%",
                        ...uiConfigs.style.backgroundImage(tmdbConfigs.posterPath(media.poster_path || media.backdrop_path))
                      }} />
                    </Box>
                    {/* poster */}
      
                    {/* media info */}
                    <Box sx={{
                      width: { xs: "100%", md: "60%" },
                      color: "text.primary"
                    }}>
                      <Stack spacing={5}>
                        {/* title */}
                        <Typography
                          variant="h4"
                          fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                          fontWeight="700"
                          sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                        >
                          {`${media.title || media.name} ${mediaType === tmdbConfigs.mediaType.movie ? media.release_date.split("-")[0] : media.first_air_date.split("-")[0]}`}
                        </Typography>
                        {/* title */}
      
                        {/* rate and genres */}
                        <Stack direction="row" spacing={1} alignItems="center">
                          {/* rate */}
                          <Rate value={media.vote_average} />
                          {/* rate */}
                          <Divider orientation="vertical" />
                          {/* genres */}
                          {genres.map((genre, index) => (
                            <Chip
                              label={genre.name}
                              variant="filled"
                              color="primary"
                              key={index}
                            />
                          ))}
                          {/* genres */}
                        </Stack>
                        {/* rate and genres */}
      
                        {/* overview */}
                        <Typography
                          variant="body1"
                          sx={{ ...uiConfigs.style.typoLines(5) }}
                        >
                          {media.overview}
                        </Typography>
                        {/* overview */}
      
                        {/* buttons */}
                        <Stack direction="row" spacing={1}>
                          <LoadingButton
                            variant="text"
                            sx={{
                              width: "max-content",
                              "& .MuiButon-starIcon": { marginRight: "0" }
                            }}
                            size="large"
                            startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            loadingPosition="start"
                            loading={onRequest}
                            onClick={onFavoriteClick}
                          />
                          <Button
                            variant="contained"
                            sx={{ width: "max-content" }}
                            size="large"
                            startIcon={<PlayArrowIcon />}
                            onClick={() => videoRef.current.scrollIntoView()}
                          >
                            watch now
                          </Button>
                        </Stack>
                        {/* buttons */}
      
                        
                      </Stack>
                    </Box>
                    {/* media info */}
                  </Box>
                </Box>
                
                
              </Box>
            </>
          ) : null
        );
};

export default MediaDetail