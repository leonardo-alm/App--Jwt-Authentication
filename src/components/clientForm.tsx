import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IClientForm {
    actionFunction: (name: string, email: string, phone: string, address: string) => void;
    action: string;
    name: string;
    email: string;
    phone: string;
    address: string;
}

const ClientForm: React.FunctionComponent<IClientForm> = props => {
    const { action, actionFunction, name, email, phone, address } = props

    const [_name, setName] = useState(name)
    const [_email, setEmail] = useState(email)
    const [_phone, setPhone] = useState(phone)
    const [_address, setAddress] = useState(address)

    const navigate = useNavigate()


    return (
        <div>
            <div className='centralize'>
                <h1>{action} Client!</h1>
                <form className='form client-form' onSubmit={(event) => {
                    event.preventDefault();
                    actionFunction(_name, _email, _phone, _address);
                }}>

                    <label htmlFor='name'>Name:</label>
                    <input
                        type="text"
                        id='name'
                        placeholder="Enter name ..."
                        value={_name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label htmlFor='email'>Email:</label>
                    <input
                        type="email"
                        id='email'
                        placeholder="Enter email ..."
                        value={_email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor='phone'>Phone:</label>
                    <input
                        type="text"
                        id='phone'
                        placeholder="Enter phone ..."
                        value={_phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <label htmlFor='address'>Address:</label>
                    <input
                        type="text"
                        id='address'
                        placeholder="Enter address ..."
                        value={_address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <button>Submit</button>
                    <button
                        type='button'
                        className='cancel'
                        onClick={(e) => navigate('/clients')}>
                        Cancel
                    </button>
                </form>
            </div>

        </div>

    );
}

export default ClientForm;