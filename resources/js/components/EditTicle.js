import { useParams} from 'react-router-dom';
import {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import useGet from './useGet';
import axios from "axios";

const WriteTicle = () => {
    const {id} = useParams();
    const history = useHistory()
  
    const [headerImg,setHeaderImg] = useState(imgUrl +"/bg.jpg");
    const [pending,setPending] = useState(false);
    const [ticle,setTicle] = useState("");
    const [title,setTitle] = useState("");
    const [body,setBody] = useState("");

    useEffect( () => {
        if(!ticle){
            let currentUser;
            // getting current user
            axios.get(`${baseUrl}/api/user`)
            .then((res)=>{
                currentUser = res.data.id;
            })
            // getting ticle info
            axios.get(`${baseUrl}/api/get/ticle/${id}`)
                    .then(res => {
                        console.log(res)
                        // confirming if it is the ticle owner who is tryna edit his ticle
                        if(currentUser === res.data.user_id){
                            setTicle(res.data)
                            setHeaderImg(`${imgUrl}/cover_img/${res.data.cover_img}`)
                            setTitle(res.data.title)
                            setBody(res.data.body)
                        }else{
                            // if it's not the ticle owner, take em back to the ticle details page
                            history.push(`/ticle/${id}`);
                        }
                    })
                    .catch(err => {
                    console.log(err)
                    });
        }
    }, [ticle])


    const previewImage = (e) => {

        let src = URL.createObjectURL(e.target.files[0]);
        setHeaderImg(src);
        console.log(src)
    }

    const hEdit = (e) => {
        e.preventDefault();
        setPending(true);
        let formData = new FormData(e.target);
        formData.set('initial_cover_img',ticle.cover_img)
        formData.set('ticle_id',ticle.id)
        axios.post(`${baseUrl}/api/edit/ticle`,formData)
            .then((res) => {
                setPending(false);

                console.log(res)
                history.push(`/ticle/${id}`);
            })
            .catch(err => {
                console.log(err)
                setPending(false);
            });
        
    }

    
    
    return(
        <form onSubmit={hEdit} className="write-ticle">
            {ticle && <div>
                <div style= {{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.35)), url(${headerImg})`,
                    backgroundRepeat:"no repeat",
                    backgroundSize:"cover",
                }}
                className="ticle-header p-5">

                    <textarea className="title m-3 has-text-white has-text-centered" name="title" placeholder="Ticle Title Goes in here ..." 
                    onChange={e => setTitle(e.target.value)} value={title} required />
                    <p className="m-2 by">
                        <span className="image is-32x32">
                            <img className="is-rounded" src={imgUrl+"/dp.png"} />
                        </span>
                        <span className="subtitle has-text-white">By: {ticle.user.display_name}</span>
                    </p>
                </div>
                <p className="has-text-right px-3">
                <input type="file" accept="image/*" name="cover_img" onChange={(e) => {previewImage(e)}} id="file" />
                </p>

                <div className="px-3">
                    <p className="has-text-left">
                        Body
                    </p>
                    <textarea className="body textarea" name="body"
                    onChange={e => setBody(e.target.value)} value={body} required />
                </div>
                <div className="has-text-right p-3">
                    <button type="submit" className={"button is-small is-success " + (pending && "is-loading")}>Edit Ticle</button>
                </div>
            </div>}
        </form>
    )
}

export default WriteTicle;