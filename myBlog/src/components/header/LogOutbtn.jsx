import React from 'react'
import {useDispatch} from 'react-redux'
import  authService  from '../../appwrite/auth'
import { logout} from '../../storeContainer/AuthSlice'



function LogOutbtn() {

    const dispatch = useDispatch()
    const logoutHandler = ()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }

  return (
    <>
    <button onClick={logoutHandler}  className='inline-block px-2 py-2 duration-200 rounded-full hover:bg-blue-100'>logOut</button>
    </>
  )
}

export default LogOutbtn
