import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiUtils from "../utils/apiUtils"
import axios from 'axios';


const Login = ({ onLogin }) => {
    const [loginCredentials, setLoginCredentials] = useState({ username: "", password: "" });
    const [loginError, setLoginError] = useState("");

    const navigate = useNavigate();

    const URL = apiUtils.getUrl()

    const login = async (evt) => {
        evt.preventDefault()
        try {
            const res = await axios.post(URL + '/login', {
                username: loginCredentials.username,
                password: loginCredentials.password
            })
            localStorage.setItem('jwtToken', res.data.token)
            localStorage.setItem('user', loginCredentials.username)
            navigate('/landing-page')
            onLogin()
        } catch (error) {
            setLoginError(error.response.data.message)
        }
    }

    const onChange = (evt) => {
        setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value })
    }

    return (
        <div className="centerContent">
            <h1>Login</h1>
            <p className="errorMessage">{loginError}</p>
            <form onChange={onChange} >
                <input className="loginInput" placeholder="User Name" id="username" />
                <br></br>
                <input className="loginInput" type="password" placeholder="Password" id="password" />
                <br></br>
                <button className="btn btn-success loginButton" onClick={login}>Login</button>
            </form>
        </div >
    )
}


export default Login