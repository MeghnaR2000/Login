import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteStudent, fetchStudents } from '../redux/StudentSlice'
import { Dna } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Student = () => {
    const dispatch = useDispatch()
    const { loading, student_data } = useSelector(state => state?.students)

    const fetchingStudents = async () => {
        dispatch(fetchStudents())
    }
    useEffect(() => {
        fetchingStudents()
    }, [dispatch])

    if(loading===true){
        return <div className='text-center'>
            <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
        </div>
    }
    const handleDelete=async (id)=>{
        const res=await deleteStudent(id);
        toast.error(res?.msg)
      
        dispatch(fetchStudents());
    }

    return (
        <>
        <h2>Add Student: <Link to='/addstudent'>Add</Link></h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">City</th>
                        <th scope="col">Address</th>
                        <th scope="col">Class</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (student_data?.length === 0) ? <>
                            <tr>
                                <td colSpan={8} className='text-center'><h2 className='text-danger'>No Record Found</h2></td>
                            </tr>
                        </> :
                            <>
                        {
                            student_data?.map((item,index)=>{
                            return(
                                <>
                                    <tr>
                                        <td>{item?.name}</td>
                                        <td>{item?.email}</td>
                                        <td>{item?.phone}</td>
                                        <td>{item?.city}</td>
                                        <td>{item?.address}</td>
                                        <td>{item?.class}</td>
                                        <td><Link className='btn btn-warning' to={`/edit/${item?._id}`}>Edit</Link></td>
                                        <td><Link className='btn btn-danger' onClick={()=>handleDelete()}>Delete</Link></td>
                                    </tr>
                                </>
                                )
                        })
                        }
                            </>
                    }

                </tbody>
            </table>

        </>
    )
}

export default Student