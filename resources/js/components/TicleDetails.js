import { useParams} from 'react-router-dom';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useGet from './useGet';
import Comment from './Comment.js';

const TicleDetails = () => {
    const {id} = useParams();
    const {data:ticle, pending, err} = useGet(`${baseUrl}/api/get/ticle/${id}`)
    const {data:currentUser, pending:p, err:e} = useGet('/api/user');

    const [options,setOptions] = useState('is-hidden')

    const deleteTicle = () => {
        console.log("delete")
    }

    return(
        <div className="container">

            {ticle && (<div className="ticle-details-comment">
                <div style= {{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.35)), url(${imgUrl +'/cover_img/'+ticle.cover_img})`,
                    backgroundRepeat:"no repeat",
                    backgroundSize:"cover",
                }}
                className="ticle-header p-5">

                    <div className="options has-text-right ">

                        <i className=  "options_btn" onClick={ () => {
                            options? setOptions(""): setOptions("is-hidden")
                            }
                        }>
                            <FontAwesomeIcon className="" icon={['fas', 'ellipsis-v']} size="lg"  />
                        </i>
                            
                        <div className= {`${options} options_modal has-text-centered`}>
                            <ul>
                                <li> 
                                    <Link to= {`/edit/${id}`}> Edit ticle </Link>
                                </li>
                                <li>
                                    <a className="has-text-danger" onClick={deleteTicle}> Delete ticle</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <h2 className="title m-3 has-text-white has-text-centered">
                        {ticle.title}
                    </h2>
                    <p className="m-2 by">
                        <span className="image is-32x32">
                            <img className="is-rounded" src={`${imgUrl}/dp/${ticle.user.dp}`} />
                        </span>
                        <span className="subtitle has-text-white">By: {ticle.user.display_name}</span>
                    </p>
                </div>

                <div className="mb-2 p-3 px-5 ticle-body has-background-white">
                    <p>
                        {ticle.body}
                    </p>
                    <div className="mt-2 p-2 columns is-mobile">
                        <p className="has-text-left column">
                            <FontAwesomeIcon icon={['far', 'comment']} size="lg" />
                            <small>100</small>
                        </p>
                        <p className="has-text-right column">
                            <FontAwesomeIcon icon={['fas', 'heart']} size="lg" color="red" />
                            <small>100</small>
                        </p>
                    </div>
                </div>

                <Comment ticleId={id} />
            </div>
            )}

            {pending && (
                <p>is loading</p>
            )}

            {err && (
                <p className="has-text-centered p-6 subtitle has-text-danger">
                    Ticle Error!!!
                </p>
            )}
        </div>
    )
}

export default TicleDetails;