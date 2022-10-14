import React from 'react'
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Registration() {

    const navigate = useNavigate();
    const initialValues = {
        username: '',
        password: ''
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Put a username"),
        password: Yup.string().min(4).max(20).required("Enter more secure password"),

    });
    const onSubmit = (data) => {
        axios.post('http://localhost:3001/auth', data).then((response) => {
            console.log('user crée');
            navigate("/");
        })
    }
    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form className='formulaireG'>
                    <div>
                        <label>Username : </label>
                        <ErrorMessage name="username" component="span" />
                        <br />
                        <Field name="username" id="inputCreatPos" placeholder="..." />
                    </div>
                    <div>
                        <label>Password : </label>
                        <ErrorMessage name="password" component="span" />
                        <br />
                        <Field name="password" type="password" id="inputCreatPos" placeholder="..." />
                    </div>
                    <button type='submit'>Register</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Registration
