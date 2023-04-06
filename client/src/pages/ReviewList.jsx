import { LoadingButton } from '@mui/lab';
import { DeleteIcon } from '@mui/icons-material/Delete';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import tmdbConfigs from '../api/configs/tmdb.configs';
import reviewApi from '../api/modules/reviwe.api';
import Container from '../components/common/Container';
import uiConfigs from '../configs/ui.config';
import { setGlobalLoading } from '../redux/features/globalLoadingSlice';
import { routersGen } from '../routes/routes';


const ReviewItem = ({ review, onRemoved }) => {

    const [onRequest, setOnRequest] = useState(false);

    const onRemove = async () => {
        if (onRequest) return
        setOnRequest(true);
        const { response, err } = await reviewApi.remove({ reviewId: review.id });
        setOnRequest(false);

        if (err) toast.error(err.message);
        if (response) {
            onRemoved(review.id)
            toast.success("Removed succefully!")

        }
    };

    return (
        <Box
        sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: {xs: 'column', md: 'row'},
            padding: 1,
            opacity:  onRequest ? 0.6 : 1,
            "&:hover": {backgroundColor: 'background.paper'}
        }}>
            <Box
            sx={{
                width: {xs: 0, md: "10%"}
            }}
            >
                <Link
                to={routersGen.mediaDetail(review.mediaType, review.mediaId)}
                style={{color: 'unset', textDecoration: 'none'}}
                >
                </Link>

            </Box>

        </Box>
    )
}

const ReviewList = () => {
    return (
        <div>ReviewList</div>
    )
}

export default ReviewList