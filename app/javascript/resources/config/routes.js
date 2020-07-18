import Login from "../components/login/Login";
import MainPage from "../components/main-page/MainPage";

export default [
    {
        path: '/login',
        component: Login,
        exact: true
    },
    {
        path: '/',
        component: MainPage,
        exact: true
    }
]
