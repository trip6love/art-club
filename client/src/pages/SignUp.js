import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import { useState } from 'react';
import validateEmail  from '../utils/helpers';

function SignUp () {

    const [email, Email] = useState('');
    const [name, Name] = useState('');
    const [password, Password] = useState('');

    const [addUser, { error }] = useMutation(ADD_USER);

    const InputChange = (event) => {
        const { target } = event;
        const inputType = target.name;
        const inputValue = target.value;

        if (inputType === 'name') {
            Name(inputValue);
        } else if (inputType === 'email') {
            Email(inputValue);
        } else if (inputType === 'password') {
            Password(inputValue);
        } 
    };
    const formSubmit = async event => {
        event.preventDefault();

        // use try/catch instead of promises to handle errors
        try {
            // execute addUser mutation and pass in variable data from form
            const { data } = await addUser({
            variables: { ...formState }
            });
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="">
            <form className = "">
            <h1 className=" ">Sign Up!</h1>
                <p className="input-label">Name: </p>
                <input className="input-form"
                value={name}
                name="name"
                onChange={InputChange}
                type="name"
                placeholder="name"
            />
                
                <p className="input-label">Email:</p>
                <input className="input-form"
                value={email}
                name="email"
                onChange={InputChange}
                type="email"
                placeholder="email"
            />

                
                 
                <p className="input-label">Password</p>
                <textarea className="input-form"
                value={password}
                name="password"
                onChange={InputChange}
                type="password"
                placeholder="password"
            />

                
             
            <button className="btn" type="button" onClick={formSubmit}>
                Submit!
            </button>
            </form>
        </div>
    )
}

export default SignUp