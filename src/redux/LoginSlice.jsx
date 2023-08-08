import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../api/apiUrl'
import {toast} from 'react-toastify'

const initialState = Object.freeze({
    name: '',
    redirectToLog: null,
    loading: false,
    error:'',
    token:'',
    logouttoggle:false
})

export const userLogin=createAsyncThunk('user/signin',async(userdata)=>{
    try{
        const res= await axiosInstance.post('login',userdata)
        return res?.data
    }catch(error){
        toast.error(error?.response?.data?.message)
    }
})

export const LoginSlice=createSlice({
    name:'signIn/user',
    initialState,
    reducers:{
        check_token:(state,{payload})=>{
            const token=localStorage.getItem('token')
            if(token!==null && token!==undefined && token!==''){
                state.logouttoggle=true
            }
        },
        logout:(state,{payload})=>{
            localStorage.removeItem('name');
            localStorage.removeItem('token')
            state.logouttoggle=false
        },
        redirectTooLog:(state,{payload})=>{
            state.redirectToLog=payload
        }

    },
    extraReducers:builder=>{
        builder.addCase(userLogin.pending,state=>{
            state.loading=true;
            state.error=''
        }).addCase(userLogin.fulfilled,(state,{payload})=>{
            state.loading=false;
            state.error='';
            if(payload?.status===200){
                localStorage.setItem('name',payload?.user?.name);
                localStorage.setItem('token',payload?.token);
                state.logouttoggle=true;
                state.redirectToLog='/';
                toast.success(payload?.message);    
            }
        }).addCase(userLogin.rejected,(state,{payload})=>{
            state.loading=false;
            state.error=payload;
        })
    }
})
export const {check_token,redirectTooLog,logout}=LoginSlice.actions;
export default LoginSlice;