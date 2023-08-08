import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../api/apiUrl'
import {toast} from 'react-toastify'

const initialState = Object.freeze({
    name: '',
    redirectReg: null,
    loading: false,
    error:''

})

export const userRegister = createAsyncThunk('signup/user',
    async (data) => {
        try {
            const res = await axiosInstance.post('register', data);
            console.log('res from register end point:', res?.data);
            return res?.data;
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    })

export const RegisterSlice = createSlice({
    name: 'signup/user',
    initialState,
    reducers:{
        clearLog:(state,{payload})=>{
            localStorage.removeItem('name');
        },
        redirect_to_reg:(state,{payload})=>{
            state.redirectReg=payload;
        }

    },
    extraReducers:builder=> {
        builder.addCase(userRegister.pending,state=>{
            state.loading=true
            state.error=''
        }).addCase(userRegister.fulfilled,(state,{payload})=>{
            state.loading=false;
            state.error='';
            if(payload?.success===true){
                state.name=payload?.data?.name
                state.redirectReg='/login'
                localStorage.setItem('name',state.name);
                toast.success(state.msg);
            }
        }).addCase(userRegister.rejected,state=>{
            state.loading=false
        })

    }
})


export const {clearLog,redirect_to_reg}=RegisterSlice.actions;
export default RegisterSlice