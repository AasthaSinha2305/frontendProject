import { configureStore } from "@reduxjs/toolkit";
import VideoReducer from "./features/videoSlice";

export default configureStore({
  reducer: {
    contact: VideoReducer,
  },
});
