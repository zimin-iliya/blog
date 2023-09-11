// import {useContext, useState} from "react";
// import {Navigate} from "react-router-dom";


export default  function Login() {
    return (
        <>
        <form className="login" action="" >
            <h1>Login</h1>
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <button type="submit">Login</button>
        </form>
        </>
    )
}