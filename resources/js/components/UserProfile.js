import { useParams} from 'react-router-dom';
import {useState} from 'react';
import useGet from './useGet'
import TicleList from './TicleList';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserProfile = () => {

    const {id} = useParams();
    
    const history = useHistory();

    const {data:user, pending, err} = useGet(id?`/api/profile/${id}` : '/api/profile');
    const {data:currentUser, pending:p, err:e} = useGet('/api/user');

    const [modal,setModal] = useState("");
    const [options,setOptions] = useState("is-hidden");
    const [newDp,setNewDp] = useState(`${imgUrl}/dp/default_dp.png`);
    const [newDisplayName,setNewDisplayName] = useState("");
    const [newBio,setNewBio] = useState("");
    const [profileEditPending,setProfileEditPending] = useState("");

    const previewImage = (e) => {
        let src = URL.createObjectURL(e.target.files[0]);
        setNewDp(src);
    }

    const hLogout = () => {
        axios.post(`${baseUrl}/api/logout`,{})
            .then((res) => {
                console.log(res)
                history.push(`/`);
            })
    }

    const editProfile = (e) => {
        e.preventDefault();
        setProfileEditPending("is-loading")
        let formData = new FormData(e.target);
        axios.post(`${baseUrl}/api/edit/profile`,formData)
            .then((res) => {
                setProfileEditPending("")

                console.log(res)
                location.reload();
            })
            .catch(err => {
                console.log(err)
                setProfileEditPending("")
            });
        
    }

    return(
        <div className="container">

        {user && <div className="user-profile-post">
                <div className="user-profile m-3">
                    <div className="media has-text-black my-2">
                        <figure className="media-left is-mobile">
                            <p className="image is-48x48">
                                <img className="is-rounded" src={`${imgUrl}/dp/${user.dp}`} />
                            </p>
                        </figure>
                        <div className="media-content">
                        {user && <div className="content has-text-left">
                                    <h5 className="sub-title"> {user.display_name}</h5>
                                    <small >{user.name}</small>
                                    <p> {user.bio} </p>
                                    <i> {!user.bio && "Bio appears here, Click Edit to add bio"} </i>
                                
                            </div> }
                        </div>
                    </div>

                    <div className={`${options} options_bg`} onClick={ () => {setOptions("is-hidden")} }></div>
                    <div className="options has-text-right ">

                        {currentUser && ((currentUser.id === user.id) && <i className=  "options_btn" onClick={ () => {
                            options? setOptions(""): setOptions("is-hidden")
                            }
                        }>
                            <FontAwesomeIcon className="" icon={['fas', 'ellipsis-v']} size="lg"  />
                        </i>)}
                            
                        <div className= {`${options} options_modal has-text-centered`}>
                            <ul>
                                <li> 
                                    <a onClick={ () => {setModal("is-active")
                                        setNewDp(`${imgUrl}/dp/${user.dp}`)
                                        setNewDisplayName(user.display_name)
                                        user.bio?setNewBio(user.bio):setNewBio("")
                                } }> Edit Profile </a>
                                </li>
                                <li>
                                    <a className="has-text-danger" onClick={ hLogout }> Logout </a>
                                </li>
                            </ul>
                        </div>

                    </div>

                </div>

                        {/* Edit profile modal */}
                <div className={ modal + " modal" } id="su_modal">
                    <div className="modal-background" onClick={ () => setModal("") }></div>
                    <div className="modal-content has-background-white py-5 px-5">
                        <h3 className="is-size-4 has-text-centered">Edit Profile</h3>

                        <form onSubmit={ editProfile }>
                            <img className="is-rounded" src={newDp} />
                            <input type="file" accept="image/*" name="dp" 
                            onChange={(e) => {previewImage(e)}} id="file" />
                            <div className="field">
                                <label className="label">Name</label>
                                <div className="control">
                                    <input type="text" name="display_name" className="input" placeholder="display_name" value={newDisplayName}
                                    onChange={e => setNewDisplayName(e.target.value)} required />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Bio</label>
                                <div className="control">
                                    <textarea className="textarea" name="bio" value={newBio}
                                    onChange={e => setNewBio(e.target.value)} placeholder="Enter a short bio" />
                                </div>
                            </div>

                            <div className="mt-5 has-text-centered">
                                <button className={profileEditPending+" button is-dark"}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>  

                        {/* Personal ticles */}
                <h5 className="sub-title b-line px-3 my-1">Ticles({ user && user.ticles.length })</h5>
                <div className="user-ticles px-2">
                    { user && <TicleList ticles={user.ticles} /> }
                </div>
            </div>}
        </div>
    )
}

export default UserProfile;