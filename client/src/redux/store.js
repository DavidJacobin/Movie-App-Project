import { configureStore} from "@reduxjs/toolkit";
import userSlice from "../redux/features/userSlice.js";
import appStateSlice from "./features/appStateSlice.js";
import authModalSlice from "./features/authModalSlice.js";
import globalLoadingSlice from "./features/globalLoadingSlice.js";
import modeSlice from "./features/modeSlice.js";

const store = configureStore({
    reducer: {
        user: userSlice,
        mode: modeSlice,
        authModal: authModalSlice,
        globalLoading: globalLoadingSlice,
        appState: appStateSlice
    }
});

export default store;