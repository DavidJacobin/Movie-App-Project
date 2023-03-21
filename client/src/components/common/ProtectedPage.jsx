import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import React from 'react';
import { authModalSlice } from '../../redux/features/authModalSlice'


const ProtectedPage = ({children}) => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(authModalSlice(!user))

    }, [user, dispatch])


    return (
        user ? children : null
    )
}

export default ProtectedPage