import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../contexts/user';

const Navigation = () => {
    const { Logout } = useContext(UserContext)

    return (
        <nav>
            <ul className="nav-links">
                <li key="all">
                    <NavLink
                        to="/"
                        className={({ isActive }) => "nav-link" + (isActive ? " nav-link-active" : "")}
                        end
                    >
                        <i className="fa-solid fa-house"></i>
                    </NavLink>
                </li>
                <li key="add">
                    <NavLink
                        to="/addclient"
                        className={({ isActive }) => "nav-link" + (isActive ? " nav-link-active" : "")}
                        end
                    >
                        <i className="fa-solid fa-user-plus"></i>
                    </NavLink>
                </li>
                <li key="logout">
                    <NavLink to="/login" onClick={Logout} className={'nav-link'}>
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </NavLink>

                </li>

            </ul>
        </nav>
    );
};

export default Navigation;
