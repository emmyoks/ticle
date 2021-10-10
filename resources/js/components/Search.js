import { useState, useEffect } from "react";
import TicleList from "./TicleList"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Search = () => {

    let cancelToken;
    const [searchTerm,setSearchTerm] = useState('');
    const [ticles,setTicles] = useState();
    const [searchLoading,setSearchLoading] = useState(false);

    const handleSearch = e => {
        setSearchTerm(e.target.value)
        if(searchTerm){
            setSearchLoading(true)
    
            axios.get(`${baseUrl}/api/search/q=${searchTerm}`)
                .then((res) => {
                    setTicles(res.data)
                    setSearchLoading(false)
                })
                .catch(err => {
                    console.log(err)
                    setSearchLoading(false)
                });
        }
    }

    useEffect( () => {
        if(searchTerm){
            const cTS = axios.CancelToken.source();
            setSearchLoading(true)
    
            axios.get(`${baseUrl}/api/search/q=${searchTerm}`, {cancelToken:cTS.token})
                .then((res) => {
                    setTicles(res.data)
                    setSearchLoading(false)
                })
                .catch(err => {
                    console.log(err)
                    setSearchLoading(false)
                });
            return () => cTS.cancel('Got aborted');
        }else{
            setTicles()
        }
    }, [searchTerm] );

    return(

        <div className="search_page">

            <div className="column field">
                <div className={"control is-7 "+(searchLoading && "is-loading ")}>
                    <input type="text" placeholder="Search for post" 
                    value={searchTerm} max="40"
                    className="input is-small is-rounded search-box"
                    onChange={e => setSearchTerm(e.target.value)} />
                </div>
                {/* <div className=" column is-1" onClick={handleSearch} >
                <FontAwesomeIcon className="search_btn has-text-success" icon={['fas', 'check']} />
                </div> */}
            </div>

            {ticles && <TicleList ticles={ticles} ticlerInfo={true} />}
        </div>
    )
}

export default Search;