import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [listofpost, setListofpost] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/post").then((response) => {
            setListofpost(response.data);

        });
    }, []);
    return (
        <div className='listofpost' >
            {
                listofpost.map((item) => (
                    <div className='post' onClick={() => { navigate(`/post/${item.id}`); }}>
                        <div className='title'>{item.title}</div>
                        <div className='body'>{item.commentaire}</div>
                        <div className='footer'>{item.users}</div>
                    </div>
                ))

            }
        </div>
    )
}
