import { createSlice } from "@reduxjs/toolkit";
const imagesSlice = createSlice({
  name: "images",
  initialState: {
    images: [],
    totalImages: 0,
  },
  reducers: {
    replaceImages(state, action) {
      state.images = action.payload || state;
      state.totalImages = action.payload.length || state.totalImages;
    },
    addImage(state, action) {
      const images = action.payload;
      state.images.push(images);
      state.totalImages--;
    },
    removeImages(state, action) {
      const id = action.payload.id;
      state.images = state.images.filter((image) => image.id !== id);
      state.totalImages--;
    },
  },
});
export const imagesActions = imagesSlice.actions;
export default imagesSlice;
