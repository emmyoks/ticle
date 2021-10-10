import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TicleList = ({ticles,ticlerInfo}) => {
    
    return(
        <div className="Blog-list">
            <ul className="columns is-multiline has-text-centered">
                {ticles.map((ticle) => (
                 <li key={ticle.id} className=" column is-6 ">
                     <Link to={"/ticle/"+ticle.id}>     
                        <article className="media has-text-black has-background-white p-2 m-2">
                            {ticlerInfo && <figure className="media-left is-mobile">
                                <p className="image is-48x48">
                                    <img className="is-rounded" src={`${imgUrl}/dp/${ticle.user.dp}`} />
                                </p>
                            </figure>}
                            <div className="media-content">
                                <div className="content has-text-left">
                                        {ticlerInfo && <small>{ticle.user.display_name}</small>}
                                        <br />
                                        <h5 className="sub-title">{ticle.title}</h5>
                                        <p>{ticle.body}</p>
                                    
                                </div>
                                <p className="has-text-right px-5">
                                    <FontAwesomeIcon icon={['fas', 'heart']} size="lg" color="red" />
                                    <small>100</small>
                                </p>
                            </div>
                        </article>
                     </Link>
                </li>)
                )}
            </ul>
        </div>
    )
}

export default TicleList;