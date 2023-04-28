import React, { useContext, useState } from 'react';
import IPage from '../interfaces/page';
import logging from '../config/logging';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../contexts/user';

const LoginPage: React.FunctionComponent<IPage> = props => {
    const [authing, setAuthing] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate()
    const userContext = useContext(UserContext);

    const Login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (error !== '')
            setError('');

        setAuthing(true);

        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:1337/user/login',
                data: {
                    username,
                    password
                }
            });

            if (response.status === 201 || response.status === 304) {
                userContext.Login(response.data.username, response.data.token);
                navigate('/');
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
            <form onSubmit={Login} className='form'>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter username ..."
                    onChange={event => setUsername(event.target.value)}
                    value={username}
                />

                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter password ..."
                    onChange={event => setPassword(event.target.value)}
                    value={password}
                />

                <button
                    disabled={authing}
                    color="info"
                >
                    Login
                </button>
                <small>
                    <p className="m-1 text-center">
                        Don't have an account? <Link to="/register">Register.</Link>
                    </p>
                </small>
                {error && <small className="text-danger">{error}</small>}

            </form>

        </div>

    );
}

export default LoginPage;