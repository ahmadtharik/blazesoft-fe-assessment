import {combineReducers, configureStore } from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";


import books from './bookSlice';

const combinedReducer = combineReducers({
    books,
  });
  
  const masterReducer = (state, action) => {
      if (action.type === HYDRATE) {
          const nextState = {
              ...state, // use previous state
              books: {
                  books: [...action.payload.books.books, ...state.books.books]
              }
          }
          return nextState;
      } else {
      return combinedReducer(state, action)
    }
  }
  
  export const makeStore = () =>
    configureStore({
      reducer: masterReducer,
    });
  
  export const wrapper = createWrapper(makeStore);

