import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const useGet = (url) => {

    const history = useHistory();

    const [pending, setPending] = useState(true)
    const [err, setErr] = useState(null)
    // err == error
    const [data, setData] = useState(null)

    useEffect(() => {
        // cTS for cancelTokenSorce(Na mumu dey stress on top variable)
        const cTS = axios.CancelToken.source();
            
        axios.get(url, {cancelToken:cTS.token})
            .then(res => {
                if(res.status !== 200){
                    throw Error("An Error occured!. Me i no know watin cause am sha, na your wahala be that");
                }
                console.log(res)
                setData(res.data);
                setPending(false);
                setErr(null);
            })
            .catch(err => {
                // axios.isCancel() returns true if axios result is canceled and false if not
                    setErr(err.message);
                    setPending(false);
                    if(err.response.status === 401){
                        history.push('/login')
                    }
            });

            // return a function to cancel the get request
        return () => cTS.cancel('Got aborted');
    }, [url]);

    return {data, pending, err}
}


export default useGet;