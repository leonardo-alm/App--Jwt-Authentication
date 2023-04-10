import React, { useContext } from 'react';
import IPage from '../interfaces/page';
import UserContext from '../contexts/user';
import { useNavigate } from 'react-router-dom';
import ClientForm from '../components/clientForm';
import Navbar from '../components/navigation';
import axios from 'axios';

const AddClientPage: React.FunctionComponent<IPage> = props => {
    const { token } = useContext(UserContext)
    const navigate = useNavigate()

    const AddClient = async (name: string, email: string, phone: string, address: string) => {
        try {
            console.log('trying')
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:1337/clients/create',
                data: {
                    name,
                    email,
                    phone,
                    address,
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 201) {
                navigate('/clients')
            }

        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Navbar />
            <ClientForm actionFunction={AddClient} action='Add new' name='' email='' phone='' address='' />
        </>

    );
}

export default AddClientPage;