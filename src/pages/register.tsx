import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import IPage from '../interfaces/page';
import logging from '../config/logging';
import axios from 'axios';

const RegisterPage: React.FunctionComponent<IPage> = props => {
    const [authing, setAuthing] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [matchPassword, setMatchPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate()

    const Register = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== matchPassword) {
            setError('Passwords dont match!');
            return;
        }

        if (error !== '')
            setError('');

        setAuthing(true);

        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:1337/user/register',
                data: {
                    username,
                    email,
                    password,
                    matchPassword
                }
            });

            if (response.status === 201) {
                navigate('/login')
            }
        }

        catch (error: any) {
            const errorMessage = error.response.data.message;
            if (errorMessage) setError(errorMessage);
            else setError('Unable to register, please try again!');

            logging.error(error, 'Register');
            setAuthing(false);
        }
    }

    return (
        <div className='centralize'>
            <form onSubmit={Register} className='form'>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter username ..."
                    onChange={event => setUsername(event.target.value)}
                    value={username}
                />

                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter email ..."
                    onChange={event => setEmail(event.target.value)}
                    value={email}
                />

                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter password ..."
                    onChange={event => setPassword(event.target.value)}
                    value={password}
                />

                <input
                    type="password"
                    name="confirm"
                    id="confirm"
                    placeholder="Confirm password ..."
                    onChange={event => setMatchPassword(event.target.value)}
                    value={matchPassword}
                />

                <button
                    disabled={authing}
                    color="info"
                    type='submit'
                >
                    Register!
                </button>

                <small>
                    <p className="m-1 text-center">
                        Already have an account? <Link to="/login">Login.</Link>
                    </p>
                </small>
                {error !== '' && <small className="text-danger">{error}</small>}
            </form>
        </div>

    );
}

export default RegisterPage;