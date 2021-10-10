import {useState} from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const Login = () => {
    const [name,setName] = useState("");
    const [displayName,setDisplayName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [comfirmPassword,setComfirmPassword] = useState("");
    const [pending,setPending] = useState(false);

    const history = useHistory()

    
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

                // history.go(1) - for redirecting forward  to the previous page
                // and history.go(-1) - for redirecting backwards to the previous page
                console.log(res)
                localStorage.setItem('accessToken',res.data.access_token)
                history.push(`/`);
            })
            .catch(err => {
                console.log(err)
                setPending(false);
            });
    }

    return(
        <div className="container m-6 login columns is-centered">
            <div className="card column-4">
                <div className="card-content">
                    <form onSubmit = {hLogin} className="content">

                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className="input is-danger" type="email" name="email" placeholder="Email input" onChange={e => setEmail(e.target.value)} required />
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon icon={['fas', 'envelope']} />
                                </span>
                                <span className="icon is-small is-right">
                                    <FontAwesomeIcon icon={['fas', 'exclamation-triangle']} />
                                </span>
                            </div>
                            <p className="help is-success">This username is available</p>
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
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;