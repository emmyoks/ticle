import {useState} from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const Register = () => {
    const [name,setName] = useState("");
    const [displayName,setDisplayName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [comfirmPassword,setComfirmPassword] = useState("");
    const [pending,setPending] = useState(false);

    const history = useHistory()

    const hRegistration = (e) => {
        e.preventDefault();
        setPending(true);
        let obj = {name:name,
            display_name:displayName,
            email:email,
            password:password,
            password_confirmation:password
        }
        
        axios.post('api/register',obj)
            .then((res) => {
                setPending(false);

                // history.go(1) - for redirecting forward  to the previous page
                // and history.go(-1) - for redirecting backwards to the previous page
                console.log(res)
                history.push(`/profile/${res.data.user.id}`);
            })
            .catch(err => {
                console.log(err)
                setPending(false);
            });
    }

    return(
        <div className="container m-6 register columns is-centered">
            <div className="card column-4">
                <div className="card-content">
                    <form onSubmit = {hRegistration} className="content">

                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                <input className="input" type="text" name="name" placeholder="Text input" 
                                onChange={e => setName(e.target.value)} required />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Display name</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className="input is-success" type="text" name="display_name" placeholder="Text input" onChange={e => setDisplayName(e.target.value)} required />
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon icon={['fas', 'user']} />
                                </span>
                                <span className="icon is-small is-right">
                                    <FontAwesomeIcon icon={['fas', 'check']} />
                                </span>
                            </div>
                            <p className="help is-success">This username is available</p>
                        </div>

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
                        
                        <div className="field">
                            <label className="label">Comfirm Password</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className="input" type="password" name="comfirm_password" placeholder="Alphanumeric + signs" onChange={e => setComfirmPassword(e.target.value)} required />
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
                                <button className={"button is-small is-link " + (pending && "is-loading")}>Register</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;