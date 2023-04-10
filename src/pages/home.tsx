import React from 'react';
import IPage from '../interfaces/page';
import Navbar from '../components/navigation';
import { NavLink } from 'react-router-dom';

const HomePage: React.FunctionComponent<IPage> = props => {
    return (
        <>
            <Navbar />
            <div className='centralize'>
                <NavLink className='home-link' to={'/clients'}>See all clients</NavLink>
            </div>
        </>
    )
}

export default HomePage;