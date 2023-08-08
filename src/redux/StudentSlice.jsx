import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"
import {axiosCrud} from '../api/apiUrl'

const initialState={
    loading:false,
    error:'',
    student_data:[]
}

export const addstudent=async data=>{
    try{
        const res=await axiosCrud.post('student',data)
        return res?.data

    }catch(error){
       console.log(error?.message);
    }
}

export const editStudent=async (id)=>{
    try{
        const {res}=await axiosCrud.get(`edit/${id}`)
        return res

    }catch(error){
       console.log(error?.message);
    }
}
export const updateStudent=async(id,stuData)=>{
    try{
            const {data}=await axiosCrud.post(`update/${id}`,stuData);
            return data;
    }catch(error)
    {
        console.log('Error while calling Update Student API',error?.message);
    }
}

export const deleteStudent=async id=>{
    try{
        const {data}=await axiosCrud.delete(`delete/${id}`);
        return data;
    }catch(error)
    {
        console.log('Error while  Deleting Student API',error?.message);
    }
}
export const fetchStudents=createAsyncThunk('student/fetch',
async()=>{
    try{
       const res=await axiosCrud.get('allstudent')
       console.log(res?.data);
       return res
    }catch(error){
        console.log(error);
    }
})
const StudentSlice = createSlice({
     name:'fetch/students',
     initialState,
     reducers:{
        clear_student_data:(state,{payload})=>{
            state.student_data=[];
        }
     },
     extraReducers:builder=>{
        builder.addCase(fetchStudents.pending,state=>{
            state.loading=true;
            state.error='';
        })
        .addCase(fetchStudents.fulfilled,(state,{payload})=>{
            state.loading=false;
            state.error='';
            if(payload?.ststus==='success'){
                state.student_data=payload?.data
            }
        })
        .addCase(fetchStudents.rejected,(state,{payload})=>{
            state.loading=false;
            state.error=payload
        })
     }
})

export const {clear_student_data}=StudentSlice.actions;
export default StudentSlice