import {useState} from "react";
import useGet from './useGet';
import axios from "axios";


const Comment = ({ ticleId }) => {

    const {data:comments, pending, err} = useGet(`${baseUrl}/api/get/ticle/comments/${ticleId}`)
    
    const [commentBody, setCommentBody] = useState('');
    const [postingComment, setPostingComment] = useState(false);
    const [newComment, setNewComment] = useState([]);

    const hPostComment = (e) => {
        e.preventDefault();
        setPostingComment(true);
    
        axios.post(`${baseUrl}/api/post/comment/${ticleId}`,{'body' : commentBody})
            .then((res) => {
                setPostingComment(false);
                setNewComment([ ...newComment,res.data ])
                setCommentBody("")
                console.log(res)
            })
            .catch(err => {
                console.log(err)
                setPostingComment(false);
            });
        
    }

    return(
        <div className="comments my-3 has-background-white p-2">
            { comments &&
                comments.map( (comment) => (
                    <article key={comment.id} className="media p-2">
                        <figure className="media-left is-mobile">
                            <p className="image is-32x32">
                                <img className="is-rounded" src={`${imgUrl}/dp/${comment.user.dp}`} />
                            </p>
                        </figure>
                        <div className="media-content">
                            <div className="content has-text-left">
                                    <b>{comment.user.display_name}</b>
                                    <br />
                                    <p>{comment.body}</p>     
                            </div>
                        </div>
                    </article>
                ))
            }

            { newComment &&
                newComment.map( (comment) => (
                    <article key={comment.id} className="media p-2">
                        <figure className="media-left is-mobile">
                            <p className="image is-32x32">
                                <img className="is-rounded" src={imgUrl+"/dp.png"} />
                            </p>
                        </figure>
                        <div className="media-content">
                            <div className="content has-text-left">
                                    <b>{comment.user.display_name}</b>
                                    <br />
                                    <p>{comment.body}</p>     
                            </div>
                        </div>
                    </article>
                ))
            }

            {pending && (
                <p>is loading</p>
            )}

            {err && (
                <p className="has-text-centered p-6 subtitle has-text-danger">
                    An Error Occured!!!
                </p>
            )}

            {!pending && (!comments && <p>No comment has been made...You can be the first to comment.</p>)}

            <form onSubmit={ hPostComment }
                className="my-2">
                <div className="field">
                    <div className="control">
                        <textarea className="textarea"
                        placeholder="20 word max"
                        value={commentBody}
                        onChange={e => setCommentBody(e.target.value)}
                        required
                        ></textarea>
                    </div>
                </div>
                
                {!commentBody && <div>
                    <button className='button is-danger' disabled>Clear</button>
                    <button className='button is-info is-pulled-right' disabled>Comment</button>
                </div>}
                {commentBody && <div>
                    <button className='button is-danger' onClick={() => setCommentBody("")} >Clear</button>
                    <button type="submit" className={'button is-info is-pulled-right ' + (postingComment && ' is-loading')} >Comment</button>
                </div>}
                
            </form>
        </div>
    )
}

export default Comment;