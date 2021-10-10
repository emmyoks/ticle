import { useState, useEffect } from "react";

import TicleList from './TicleList';

const Index = () => {
    // const {data:ticles, pending, err} = useGet(`http://127.0.0.1:8000/api/index`)


    const img = imgUrl
    let cancelToken;
    const [ticles,setTicles] = useState();
    const [orderByDate,setOrderByDate] = useState(true);
    const [redoSpin,setRedoSpin] = useState(false);
    
    // for orderBy, funcrion runs after you select a different way to order post
    useEffect( () => {
        const cTS = axios.CancelToken.source();
        if(orderByDate){
            axios.get(`${baseUrl}/api/index`, {cancelToken:cTS.token})
            .then(res => {
                console.log(res)
                setTicles(res.data);
                // setPending(false);
            })
            .catch(err => {
                // axios.isCancel() returns true if axios result is canceled and false if not
                    console.log(err.message);
                    // setPending(false);
            });
            console.log(orderByDate)
        }else{
            setTicles()
        }

        return () => cTS.cancel('Got aborted');
    }, [orderByDate] );

   

    const refresh = () => {
        setRedoSpin(true);          
        setOrderByDate(true);
        setSearchTerm('');
        setRedoSpin(false);
    }


//     let ticles = [
//         {
//         'id':1,
//         'author': "Firstname LAstname",
//         'title': "The title of the fucking blog goes in here",
//         'body': "The title of the fucking blog goes in here and thats whatsup title of the fucking blog goes ine and thats whatsup ......"
//     },
//         {
//         'id':2,
//         'author': "Firstname LAstname",
//         'title': "The title of the fucking blog goes in here",
//         'body': "The title of the fucking b and thats whatsup ......"
//     },
//         {
//         'id':3,
//         'author': "Firstname LAstname",
//         'title': "",
//         'body': "The title of the fucking blog goes in here and thats whatsup title of the fucking blog goes ine and thats whatsup ......"
//     },
// ]

    return(
        <div className="container">
            <div className="container">
                
                <div className="order p-5 has-text-centered columns is-mobile">
                    <div className="column has-text-right is-4">
                        <a className="" onClick={ () => setOrderByDate(true) }>Most recent</a>
                    </div>
                    <div className="column has-text-right is-4">
                        <a className="" onClick={ () => setOrderByDate(false) }>Trending</a>
                    </div>

                    
                </div>
            </div>

            {ticles && <TicleList ticles={ticles} ticlerInfo={true} />}
            

        </div>
    )
}

export default Index;