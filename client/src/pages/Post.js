import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { AuthContext } from '../help/AuthContext';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Post() {
    let { id } = useParams();
    const { authState } = useContext(AuthContext);
    const [postObject, setPostObject] = useState({});
    const [listofcomment, setListofcomment] = useState([]);
    const [comm, setComm] = useState("");
    useEffect(() => {
        axios.get(`http://localhost:3001/post/byId/${id}`).then((response) => {
            setPostObject(response.data);

            axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
                setListofcomment(response.data);
                // console.log(response.data
            })
        });
    }, []);

    const Envoie = () => {
        axios.post(`http://localhost:3001/comments`, { comments: comm, PostId: id }, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            },
        }).then((response) => {
            if (response.data.error) {
                // console.log(response.data);
            } else {
                const commentToAdd = { comments: comm, username: response.data.username };
                setListofcomment([...listofcomment, commentToAdd]);
                // console.log(response);
                setComm('');
            }
        })
    }
    const supprimer = (id) => {
        axios.delete(`http://localhost:3001/comments/${id}`, {
            headers: { accessToken: localStorage.getItem("accessToken") },
        })
            .then(() => {
                setListofcomment(
                    listofcomment.filter((val) => {
                        return val.id !== id;
                    })
                )
            });
    };
    return (
        <div className="postPage">
            <div className="leftSide">
                <div className="post individu" id="individual">
                    <div className="title"> {postObject.title} </div>
                    <div className="body">{postObject.commentaire}</div>
                    <div className="footer">{postObject.users}</div>
                </div>
            </div>
            <div className="rightSide">
                <div>
                    <div className='element'>
                        <input type="text" name="comments" value={comm} id="commentInput" placeholder="Ajouter un Commentaire" onChange={(e) => { setComm(e.target.value) }}></input>
                    </div>
                    <button type='submit' onClick={Envoie}>Add Comment</button>
                </div>
                <div className='listcomment'>
                    {
                        listofcomment.map((item, key) => (
                            <div className='Comments'>
                                <div className='thecomm' id='commentire'>{item.comments} <span>{item.username}</span>
                                    {authState.username === item.username && (
                                        <button className='btndel' onClick={() => { supprimer(item.id) }}>X</button>
                                    )}
                                </div>

                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
export default Post