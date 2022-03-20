import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

//Login page
const Login = () => {

    const [formState, setFormState] = useState({ email: '', password: '' });

    const [login, { error }] = useMutation(LOGIN_USER);

    // submit form
    const formSubmit = async event => {
        event.preventDefault();
    
        try {
        const { data } = await login({
            variables: { ...formState }
        });
    
        Auth.login(data.login.token);
        } catch (e) {
        console.error(e);
        }
    };

    const InputChange = (event) => {
        const { name, value } = event.target;

        setFormState({
        ...formState,
        [name]: value,
        });
    };

    return (
        <body>
            <div align="center"> 
            <form className = "form-login">

            <h1 className="login-header">Login</h1>
                <p>
                    <input 
                        className="input-form"
                        value={formState.email}
                        name="email"
                        onChange={InputChange}
                        type="text"
                        placeholder="Enter a email to login!"
                    />
                </p>
                <p> 
                    <input 
                        className="input-form"
                        value={formState.password}
                        name="password"
                        onChange={InputChange}
                        type="password"
                        placeholder="Password"
                    />               
                </p>   
            </form>
            </div>

            <div align="center"> 
                <button className="btn" type="button" onClick={formSubmit}>Submit</button>
            </div>
            {error && <div>Login failed</div>}
        </body>

        
    );
};



export default Login;