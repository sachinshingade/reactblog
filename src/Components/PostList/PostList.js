import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import './PostList.scss';

function PostList() {
    const [postList, setPostList] = useState("");
    useEffect(()=>getPostData(),[]);
    const history = useHistory();
    function getPostData() {
        fetch(`http://localhost:3000/posts`)
            .then(res=>res.json())
            .then(json => {
                console.log("json", json)
                let data = json;
                data.map((post) => {
                    console.log('post', post)
                    post['slicedBody'] = post.description.slice(0, 120) + "...";
                });
                setPostList(data)
            })
    }
    function routeTo (id) {
        console.log("route", id)
        let url = `/post-detail/${id}`
        history.push(url)
    }
    return(
        <div className="postlist">
            <div className="postsBlock">
                {
                    postList && postList.map(post => {
                        return(
                            <div className="postCards" key={post._id}>
                                <div className="postBody">
                                    <h3 className="postTitle">{post.title}</h3>
                                    <p className="postBodyPara">{post.slicedBody}</p>
                                    {/* <div className="authorName">
                                        <p className="authName">{post.authorname}</p>
                                    </div> */}
                                </div>
                                <div className="btn-block">
                                        <button onClick={() => routeTo(post._id)}>Read More</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PostList;