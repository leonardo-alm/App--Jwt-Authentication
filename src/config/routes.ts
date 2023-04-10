import IRoute from '../interfaces/route';
import AddClientPage from '../pages/addclient';
import ClientsPage from '../pages/clients';
import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';
import UpdateClientPage from '../pages/updateclient';

const routes: IRoute[] = [
    {
        path: '/',
        name: 'Home Page',
        component: HomePage
    },
    {
        path: '/login',
        name: 'Login Page',
        component: LoginPage
    },
    {
        path: '/register',
        name: 'Register Page',
        component: RegisterPage
    },
    {
        path: '/clients',
        name: 'Client Page',
        component: ClientsPage
    },
    {
        path: '/addclient',
        name: 'Add Client Page',
        component: AddClientPage
    },
    {
        path: '/updateclient/:id',
        name: 'Update Client Page',
        component: UpdateClientPage
    },
]

export default routes;