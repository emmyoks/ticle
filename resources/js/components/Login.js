import {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [pending,setPending] = useState(false);
    const [errorMessage,setErrorMessage] = useState(false);


    
    const hLogin = (e) => {
        e.preventDefault();
        setPending(true);
        let obj = {
            email:email,
            password:password
        }
        
        axios.post(`${baseUrl}/api/login`, obj)
            .then((res) => {
                setPending(false);
                console.log(res)
                localStorage.setItem('accessToken',res.data.access_token)
                window.location.replace("/profile")
            })
            .catch(err => {
                setErrorMessage(err.response.data.message)
                setPending(false);
            });
    }

    return(
        <div className="container m-6 login columns is-centered">
            <div className="card column-4">
                <div className="card-content">
                    <form onSubmit = {hLogin} className="content">
                        {errorMessage && <p className="has-text-centered help is-danger">{errorMessage}</p>}
                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className="input" type="email" name="email" placeholder="Email input" onChange={e => setEmail(e.target.value)} required />
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon icon={['fas', 'envelope']} />
                                </span>
                                <span className="icon is-small is-right">
                                    <FontAwesomeIcon icon={['fas', 'exclamation-triangle']} />
                                </span>
                            </div>
                        </div>
                        
                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className="input" type="password" name="password" placeholder="Alphanumeric + signs" onChange={e => setPassword(e.target.value)} required />
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon icon={['fas', 'lock']} />
                                </span>
                                {/* <span className="icon is-small is-right">
                                    <FontAwesomeIcon icon={['fas', 'check']} />
                                </span> */}
                            </div>
                            {/* <p className="help is-success">This username is available</p> */}
                        </div>

                        <div className="field has-text-centered">
                            <div className="control">
                                <button className={"button is-small is-link " + (pending && "is-loading")}> Login </button>
                            </div>
                        </div>
                        <p className="has-text-centered help">
                            <Link to="/register">Register as new user.</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;