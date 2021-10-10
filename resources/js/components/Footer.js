import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Footer = () => {

    return(
        <footer>
            <div>
                <div className="has-text-centered columns is-mobile has-background-white">
                    <div className="column ">
                        <Link to='/search'>
                            <FontAwesomeIcon className="write-btn" icon={['fas', 'search']} />
                        </Link>
                    </div>
                    <div className="column">
                        <Link to='/write'>
                            <FontAwesomeIcon className="write-btn" icon={['fas', 'plus']} />
                        </Link>
                    </div>
                    <div className="column ">
                        <Link to='/profile'>
                            <FontAwesomeIcon className="write-btn" icon={['fas', 'user']} />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;