import { Link } from "react-router-dom"

const NotFound = () => {
    return(
        <div className="not-found">
            <h1 className="is-big is-centered">404</h1>
            <h1 className="is-title">Sorry</h1>
            <p>This page cannot be found my friend, wonder how you got here.  </p>
            <Link className="is-link" to='/'>Get my ass back to the home page</Link>
        </div>
    )
}

export default NotFound;