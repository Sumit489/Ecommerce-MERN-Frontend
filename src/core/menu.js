import React,{Fragment} from 'react'
import {Link,withRouter} from 'react-router-dom'
import { signout,isAuthenticated } from '../auth/helper'

const currenttab = (history,path) =>{
    if(history.location.pathname === path){
        return {color: "#2ecc72"}
    }else{
        return {color: "#FFFFFF"}
    }
}
const menu =  ({history}) => (
    <div>
        <ul className="nav nav-tabs bg-dark">
            <li  className="nav-item">
                <Link  style={currenttab(history,"/")} className="nav-link" to="/">HOME</Link>
            </li>
            <li  className="nav-item">
                <Link style={currenttab(history,"/cart")}  className="nav-link" to="/cart">CART</Link>
            </li>
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                <Link  style={currenttab(history,"/user/dashboard")} className="nav-link" to="/user/dashboard">DASHBOARD</Link>
            </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 1 &&(
                <li  className="nav-item">
                <Link style={currenttab(history,"/admin/dashboard")} className="nav-link" to="/admin/dashboard">A. DASHBOARD</Link>
            </li>
            )}
            {!isAuthenticated() && (
                <Fragment>
                <li  className="nav-item">
                    <Link style={currenttab(history,"/Signup")} className="nav-link" to="/Signup">SIGNUP</Link>
                </li>
                <li  className="nav-item">
                    <Link style={currenttab(history,"/Signin")} className="nav-link" to="/Signin">SIGNIN</Link>
                </li>
                </Fragment>
            )}
            {isAuthenticated() && (
                <li className="nav-item">
                    <span
                    className="nav-link text-warning"
                    onClick={()=>{
                        signout(()=>{
                            history.push("/")
                        })
                    }}>
                        SIGNOUT
                    </span>
                </li>
            )}
        </ul>
    </div>

)

export default withRouter(menu)