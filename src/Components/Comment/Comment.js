import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaReply } from "react-icons/fa";
import Toast from 'react-bootstrap/Toast'
import Modal from 'react-bootstrap/Modal'

import './Comment.scss';

function Comment(props) {
    console.log("props",props)
    const [comments, setComments] = useState("");
    const [comment, setComment] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastBody, setToastBody] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [replyCommentId, setReplyCommentId] = useState('');
    useEffect(() => setComments(props.comments),[]);
    const openToast = (json) => {
        setShowToast(true);
        setToastBody(json);
    };
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    function submitComment(){
        let id = props.postId;
        console.log('id', id)
        if(comment){
            fetch('http://localhost:3000/addcomment', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({comment, id})
            }).then(res=> res.json())
            .then(json => {
                console.log('json', json)
                openToast(json.msg);
                comments.push({comment})
                console.log('comments', comments)
                setComment('')
            })
        }
        
    }
    function updateInputValue(evt){
        setComment(evt.target.value)
    }
    function addReply(commentid) {
        console.log('commentId', commentid);
        setReplyCommentId(commentid)
        handleShowModal()
    }
    function OnSubmit() {
        let postid = props.postId;
        let commentId = replyCommentId;
        let reply = comment;
        console.log("ps", postid);
        console.log('cid', commentId);
        console.log('reply',  reply)
        fetch('http://localhost:3000/addreply', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({postid, commentId, reply})
            }).then(res=> res.json())
            .then(json => {
                console.log('json', json)
                openToast(json.msg);
                // comments.push({comment})
                // console.log('comments', comments)
                setComment('');
                handleCloseModal();
            })
        
    }
    return (
        <>
        <div>
        <div className="commentTrail">
            <h4>Comments</h4>
            { 
                comments && comments.map(comment => {
                    return(
                        <div className="oneBlock">
                        <div className="commentBlock" key={comment._id}>
                            <div className="commentAuthor">
                                <div className="comment">
                                    <p className="commentText">{comment.comment}</p>
                                </div>
                            </div>
                            <div className="replyBtn">
                                <FaReply onClick={()=>addReply(comment._id)}/>
                            </div>
                        </div>
                        <div className="replies">
                            {
                                comment.replies && comment.replies.map(reply => {
                                    return(
                                        <div className="reply" key={reply._id}>
                                            {reply.reply}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        </div>
                    )
                })
            }
            
        </div>
        <div className="addCommentBlock">
            <h4>Add Comment</h4>
            <div className="block">
                <div className="textInput">
                    <input type="text" value={comment} onChange={(e)=>updateInputValue(e)}/>
                </div>
                <div className="btn-block">
                    <button className="addBtn" onClick={submitComment}>Submit</button>
                </div>
            </div>
        </div>
        </div>
        <Toast 
        style={{
            position: 'fixed',
            right: 0,
            bottom: '50px',
            left: 0,
            margin: 'auto',
            width: 'fit-content',
            height: 'fit-content'
        }} 
        onClose={() => setShowToast(false)} 
        show={showToast} 
        delay={3000} 
        autohide
        >
            <Toast.Body>{toastBody}</Toast.Body>
        </Toast>
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
            <Modal.Title>Post a Reply on Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input style={{width: '100%'}} type="text" value={comment} onChange={(e)=>updateInputValue(e)}/>
            </Modal.Body>
            <Modal.Footer>
            <button variant="secondary" onClick={handleCloseModal}>
                Close
            </button>
            <button variant="primary" onClick={OnSubmit}>
                Save Changes
            </button>
            </Modal.Footer>
        </Modal>
        </>
    )
}
export default Comment;