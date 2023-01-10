import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const videoSlice = createSlice({
  name: "contact",
  initialState: {
    contacts: [
      {
        id: 1,
        title: "Study C++",
        category: "Educational",
        link: "https://youtube.com/embed/ZzaPdXTrSb8",
      },
    ],
    filter: "All",
    contact: {
      id: "",
      title: "",
      category: "",
      link: "",
    },
  },
  reducers: {
    getContact:(state, action) => { 
      state.contact = state.contacts.find((item) => item.id == action.payload);
    },
    addContact: (state, action) => {
      const newData = { ...action.payload, id: uuidv4() };
      state.contacts = [newData, ...state.contacts];
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        (item) => item.id !== action.payload
        );
    },
    updateContact: (state, action) => {
      state.contacts = state.contacts.map(
        (item) => item.id === action.payload.id ? action.payload : item
        );
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});
export const { addContact, deleteContact, getContact, updateContact, setFilter } = videoSlice.actions;
export default videoSlice.reducer;
