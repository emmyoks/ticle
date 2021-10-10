import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import '../../css/bulma.min.css'
import '../../css/app.css'
import NavBar from './NavBar';
import Register from './Register';
import Login from './Login';
import Index from './Index';
import TicleDetails from './TicleDetails';
import WriteTicle from './WriteTicle';
import EditTicle from './EditTicle';
import UserProfile from './UserProfile';
import Search from './Search';
import Footer from './Footer';
import NotFound from './NotFound';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import axios from 'axios';

library.add(fas,far)

function App() {

    let access_token = localStorage.getItem('accessToken')
    // axios.defaults.baseURL = '';
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

    return (

        <Router>
            <NavBar />
            <div className="app">
                <Switch>
                    <Route exact path='/'>
                        <Index />
                    </Route>
                    
                    <Route exact path='/register'>
                        <Register />
                    </Route>
                    
                    <Route exact path='/login'>
                        <Login />
                    </Route>
                    
                    <Route exact path='/ticle/:id'>
                        <TicleDetails />
                    </Route>

                    <Route exact path='/write'>
                        <WriteTicle />
                    </Route>

                    <Route exact path='/edit/:id'>
                        <EditTicle />
                    </Route>

                    <Route exact path='/profile/:id?'>
                        <UserProfile />
                    </Route>
                    <Route exact path='/search'>
                        <Search />
                    </Route>

                    <Route path='*'>
                        <NotFound />
                    </Route>
                </Switch>
            </div>
            <Footer />
        </Router>
    );
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(  
    <React.StrictMode>
        <App />
    </React.StrictMode>, document.getElementById('root'));
}
