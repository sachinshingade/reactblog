import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './PostDetail.scss';
import Comment from '../Comment/Comment'

function PostDetail() {
    const [postsData, setPost] = useState("");
    let { id } = useParams();
    useEffect(()=>getPostData(id),[]);
    function getPostData(id) {
        fetch(`http://localhost:3000/post/${id}`)
            .then(res=>res.json())
            .then(json => {
                console.log('json', json)
                setPost(json)
            })
    }
    return(
        <>
            {
                postsData ? (
                    <div className="postDetailBlock">
                        <div className="postContent">
                            <h2 className="postTitle">{ postsData?.title }</h2>
                            <p className="postBody">{ postsData?.description}</p>
                         </div>
                        <Comment postId = {postsData._id} comments ={postsData?.comments}/>
                    </div>
                ) : null
            }
        </>
            
    )
}
export default PostDetail;