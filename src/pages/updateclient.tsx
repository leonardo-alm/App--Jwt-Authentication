import React, { useContext, useEffect, useState } from 'react';
import IPage from '../interfaces/page';
import UserContext from '../contexts/user';
import { useNavigate, useParams } from 'react-router-dom';
import ClientForm from '../components/clientForm';
import axios from 'axios';
import Navbar from '../components/navigation';

const UpdateClientPage: React.FunctionComponent<IPage> = props => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [loading, setLoading] = useState(true)

    const { token } = useContext(UserContext)
    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        const fetchClientById = async () => {
            try {
                const response = await axios({
                    method: 'GET',
                    url: `http://localhost:1337/clients/get/${id}`,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    setName(response.data.client.name)
                    setEmail(response.data.client.email)
                    setPhone(response.data.client.phone)
                    setAddress(response.data.client.address)

                    setLoading(false)
                }
            }
            catch (error) {
                console.log(error)
            }
        }

        fetchClientById()
    }, [])

    const UpdateClient = async (name: string, email: string, phone: string, address: string) => {
        try {
            console.log('trying')
            const response = await axios({
                method: 'PATCH',
                url: `http://localhost:1337/clients/update/${id}`,
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

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            <Navbar />
            <ClientForm actionFunction={UpdateClient} action='Update' name={name} email={email} phone={phone} address={address} />
        </>

    );
}

export default UpdateClientPage;