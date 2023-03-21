import {useDispatch } from "react-redux";
import {useEffect} from "react";
import {setAppState} from "../../redux/features/appStateSlice.js";

const PageWrepper = ({state, children}) => {
    const dispatch = useDispatch()

    useEffect(() => {
      window.scrollTo(0,0)
      dispatch(setAppState(state))
    
    },[state])
    

  return (
    children
  )
}

export default PageWrepper