import React, { useContext, useState, useEffect } from 'react';
import IPage from '../interfaces/page';
import UserContext from '../contexts/user';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { IClient } from '../interfaces/clients';
import Navbar from '../components/navigation';

const ClientsPage: React.FunctionComponent<IPage> = props => {
    const [clients, setClients] = useState<IClient[]>([])
    const [aux, setAux] = useState<number>(0)
    const { token } = useContext(UserContext)

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios({
                    method: 'GET',
                    url: 'http://localhost:1337/clients/get',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    setClients(response.data.clients)
                }

            }
            catch (error) {
                console.log(error)
            }
        }
        fetchClients()

    }, [aux])

    const Delete = async (id: string) => {
        try {
            const response = await axios({
                method: 'DELETE',
                url: `http://localhost:1337/clients/delete/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 204) {
                setAux((aux) => aux + 1)
            }

        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Navbar />
            <section className='table'>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th colSpan={2}></th>

                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client) =>
                            <tr key={client._id}>
                                <td>{client.name}</td>
                                <td>{client.email}</td>
                                <td>{client.phone}</td>
                                <td>{client.address}</td>
                                <td onClick={() => Delete(client._id)}><i className="fa-solid fa-trash"></i></td>
                                <td> <Link to={`/updateclient/${client._id}`}><i className="fa-regular fa-pen-to-square"></i></Link> </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </>
    );
}

export default ClientsPage;