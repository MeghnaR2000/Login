import {configureStore} from '@reduxjs/toolkit'
import RegisterSlice from '../redux/RegisterSlice';
import LoginSlice from '../redux/LoginSlice'
import StudentSlice from './StudentSlice';

export const myStore=configureStore({
    reducer:{
        registration:RegisterSlice.reducer,
        login:LoginSlice.reducer,
        students:StudentSlice.reducer,
      
    }
});

