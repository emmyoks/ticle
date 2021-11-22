import {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const WriteTicle = () => {
    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const [headerImg,setHeaderImg] = useState(imgUrl +"/bg.jpg");
    const [pending,setPending] = useState(false);
    const [currentUser,setCurrentUser] = useState(0);
    const [haveUser, setHaveUser] = useState(false)

    const history = useHistory()

    useEffect( () => {
        if(!haveUser){
            axios.get(`${baseUrl}/api/user`)
                .then((res)=>{
                    setCurrentUser(res.data);
                    setHaveUser(true)
                    if(!res.data){
                        history.push("/");
                    }
                })
        }
    }, [haveUser] );

    const previewImage = (e) => {
        // var reader = new FileReader();
        // reader.onload = setHeaderImg(reader.result);
        // reader.readAsDataURL(event.target.files[0]);
        let src = URL.createObjectURL(e.target.files[0]);
        setHeaderImg(src);
        console.log(src)
    }

    const hWrite = (e) => {
        e.preventDefault();
        setPending(true);
        let formData = new FormData(e.target);
        axios.post(`${baseUrl}/api/post/ticle`,formData)
            .then((res) => {
                setPending(false);

                console.log(res)
                history.push("/");
            })
            .catch(err => {
                console.log(err)
                setPending(false);
            });
        
    }

    
    
    return(
        <form onSubmit={hWrite} className="write-ticle">
            <div style= {{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.35)), url(${headerImg})`,
                backgroundRepeat:"no repeat",
                backgroundSize:"cover",
            }}
             className="ticle-header p-5">
                {/* <h2 className="title m-3 has-text-white has-text-centered">
                    Title of the fucking article goes in here, bitch!
                </h2> */}
                <textarea className="title m-3 has-text-white has-text-centered" name="title" placeholder="Ticle Title Goes in here ..." 
                onChange={e => setTitle(e.target.value)} required />
                <p className="m-2 by">
                    <span className="image is-32x32">
                        <img className="is-rounded" src={imgUrl+"/dp.png"} />
                    </span>
                    <span className="subtitle has-text-white">By: authors name</span>
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
                onChange={e => setBody(e.target.value)} required />
            </div>
            <div className="has-text-right p-3">
                <button type="submit" className={"button is-small is-success " + (pending && "is-loading")}>Post Ticle</button>
            </div>
        </form>
    )
}

export default WriteTicle;