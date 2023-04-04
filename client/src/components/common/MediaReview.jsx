import reviewApi from '../../api/modules/reviwe.api';
import Container from './Container';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify';

import { LoadingButton } from '@mui/lab';
import { Box, Divider, Typography, Button, Stack, TextField,  } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';


const ReviewItem = ({review, onRemoved}) => {

    const {user} = useSelector((state) => state.user);

    const [onRequest, setOnRequest] = useState(false);

    const onRemove = async () => {
        if (onRequest) return
        setOnRequest(true);

        const {response, err} = await reviewApi.remove({reviewId: review.id})

        if (err) toast.error(err.message);
        if (response) onRemove(review.id);

        
    };

    return (
        <Box
            sx={{
                padding: 2,
                borderRadius: "5px",
                position: 'relative',
                opacity: onRequest ? 0.6 : 1,
                "&:hover": {backgroundColor: "background.paper"}
            }}>
                <Stack direction="row" spacing={2}>
                    {/*avatart */}
                    <Stack spacing={2} flexGrow={1}>
                        <Stack spacing={1}>
                            <Typography variant='h6' fontWeight="700">
                                {review.user.displayName}

                            </Typography>
                            <Typography variant='caption'>
                                {dayjs(review.createdAt).format('DD/MM/YYYY HH:mm:ss')}
                            </Typography>

                        </Stack>
                        <Typography variant='body' textAlign="justify">
                            {review.content}
                        </Typography>
                        {user && user.id === review.user.id && (
                            <LoadingButton 
                                variant='contained'
                                startIcon={<DeleteIcon/>}
                                loadingPosition='start'
                                loading={onRequest}
                                onClick={onRemove}
                                sx={{
                                    position: {xs: 'relative', md: 'absolute'},
                                    right: {xs: 0, md: "10px"},
                                    marginTop: {xs: 2, md: 0},
                                    width: 'max-contend'
                                }}
                            >

                            </LoadingButton>
                        )}
                    </Stack>
                </Stack>

        </Box>
    )
}