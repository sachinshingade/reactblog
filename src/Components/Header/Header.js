import logo from '../../logo.svg';
import './Header.scss';
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { RiArticleFill } from "react-icons/ri";
import { IconContext } from "react-icons";
import Modal from 'react-bootstrap/Modal'
import Toast from 'react-bootstrap/Toast'

function Header() {
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastBody, setToastBody] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('')
    const openToast = (json) => {
        setShowToast(true);
        setToastBody(json);
    };
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    function addPost() {
        let title = postTitle;
        let description = postDescription;
        if(postTitle && postDescription){
            fetch('http://localhost:3000/addpost', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({title, description})
            }).then(res=> res.json())
            .then(json => {
                console.log('json', json)
                openToast(json.msg);
                // comments.push({comment})
                // console.log('comments', comments)
                handleCloseModal()
            })
        } else {
            setToastBody('All field are mandatory')
        }
    }
    function updatepostTitleValue(e) {
        console.log('e', e.target.value);
        setPostTitle(e.target.value)
    }
    function updateInputValue(e) {
        setPostDescription(e.target.value)
    }
    return(
        <>
        <div className="header">
            <div className="img-container">
                <Link to='/post'>
                    <img src={logo} className="App-logo" alt="logo" />
                </Link>
            </div>
            <div className="add-post">
            <IconContext.Provider value={{ color: "#61dafb", size: '2rem', style:{ cursor: 'pointer'}}}>
                <div style={{color: '#fff', cursor: 'pointer'}}  onClick={()=>handleShowModal()}>
                    <RiArticleFill/>
                    Add Post
                </div>
            </IconContext.Provider>
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
                <Modal.Title>Add a post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="modal-form">Post Title</p>
                <input style={{width: '100%'}} type="text" value={postTitle} onChange={(e)=>updatepostTitleValue(e)} />
                <p className="modal-form">Post Description</p>
                <textarea className="modal-textarea" value={postDescription} onChange={(e)=>updateInputValue(e)}></textarea>
                {/* value={comment} onChange={(e)=>updateInputValue(e)} */}
            </Modal.Body>
            <Modal.Footer>
            <button variant="secondary" onClick={handleCloseModal}>
                Close
            </button>
            <button variant="primary" onClick={addPost}>
                Save Changes
            </button>
            </Modal.Footer>
        </Modal>
        </>
    )
}
export default Header