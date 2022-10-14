import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreatePost() {
    const navigate = useNavigate();
    const initialValues = {
        title: '',
        commentaire: '',
        users: ''
    }
    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        commentaire: Yup.string().min(3).max(100).required(),
        users: Yup.string().required()
    });
    const onSubmit = (data) => {
        axios.post("http://localhost:3001/post", data, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }
        ).then((response) => {
            console.log('it work');
            navigate('/')
        });
    }
    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form className='formulaireG'>
                    <div>
                        <label>Title : </label>
                        <ErrorMessage name="title" component="span" />
                        <br />
                        <Field name="title" id="inputCreatPos" placeholder="...Tap the title" />
                    </div>
                    <div>
                        <label>Comment : </label>
                        <ErrorMessage name="commentaire" component="span" />
                        <br />
                        <Field name="commentaire" id="inputCreatPos" placeholder="...Tap the comment" />
                    </div>
                    <div>
                        <label>Users : </label>
                        <ErrorMessage name="users" component="span" />
                        <br />
                        <Field name="users" id="inputCreatPos" placeholder="...Tap the users" />
                    </div>
                    <button type='submit'>Send</button>
                </Form>
            </Formik>
        </div>
    )
}
