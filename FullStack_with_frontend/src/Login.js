import { useState } from "react";
import { useHistory } from "react-router-dom";
import MyNavbar from "./MyNavbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState(null);
    const history = useHistory();


    const handleSubmit = (e) => {
        e.preventDefault();
        const cred = { username, password };
        // console.log(cred);
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(cred)
        })
            .then((res) => {
                if (!res.ok) {
                    throw Error('We could not find those credentials');
                }
                return res.json();
            })
            .then((val) => {

                console.log(val.token);
                localStorage.setItem("token", val.token);
                // localStorage.setItem("refresh_token", val.refresh_token);
                notify('Logging you in');
                // history.push('/');
            })
            .catch((e) => {
                console.log(e.message);
                console.log("something went wrong");
                setErrMsg(e.message);
                notify(e.message);
            })
            .then(
                () => {
                    setTimeout(() => {
                        history.push('/');
                    }, 2000);
                }
            )
    }
    const notify = (message) => toast(message, " !");

    return (
        <>
            <MyNavbar />
            <div className="create">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input type="text"
                        required
                        id="username"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }}
                    />
                    <label htmlFor="username">Password</label>
                    <input type="text"
                        required
                        id="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <button>Login</button>
                </form>
            </div>
            <ToastContainer autoClose={1000} />
        </>

    );
}

export default Login;