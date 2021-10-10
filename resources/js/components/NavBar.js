import { useState } from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavBar = () => {
    let [active,setActive] = useState(false);
    const hBurger = () =>{
        if(active){
            setActive(false);
        }else{
            setActive(true);
        }
    };
    return(
        <nav className="navbar has-shadow is-white">
        <div className="navbar-brand">
            
            <Link to="/" className="navbar-item">
                <span className="title">
                 TICLE</span>
            </Link>
            
            <a className="navbar-burger"
             id="burger"
             onClick={hBurger}  >
                <span></span>
                <span></span>
                <span></span>
            </a>
        </div>

        <div className={"navbar-menu has-text-centered "+(active && 'is-active')} id="nav-link">
            <div className="navbar-end">
                <Link to="/profile" className="navbar-item">
                    {/* <a href="#">
                        <div className="image is-48x48 m-3">
                            <img className="is-rounded" src={imgUrl+"/dp.png"} />
                        </div>
                    </a> */}
                
                    <div className="m-2 p-2 has-background-grey-light default_dp">
                        <FontAwesomeIcon icon={['fas', 'user']} />
                    </div>
                    Profile
                </Link>
                <Link to="/" className="navbar-item">Contact</Link>
            </div>
        </div>
    </nav>
    )
}

export default NavBar;