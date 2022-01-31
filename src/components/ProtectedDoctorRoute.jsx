import React from 'react'
import {  Redirect, Route } from 'react-router-dom'
import Cookies from 'js-cookie';

export default function ProtectedDoctorRoute({component:Component, ...rest}) { 

    return (
        <Route {...rest} render={(props)=>{
            if (Cookies.get("user") === "DOCTOR"){ 
                return <Component/>
            }
            else {
                return(
                    <Redirect to ={{pathname:"/",state:{from:props.location}}}/>
                )
            }
        }}/>

    )
}