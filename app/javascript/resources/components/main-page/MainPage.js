import React from 'react';
import { Row, Col } from 'reactstrap';
import Layout from "../layout/Layout";
import Session from "../../services/session";
import AdminMainPage from "../admin-main-page/AdminMainPage";

const MainPage = () => {
    const { is_admin } = Session.getPayload();

    const userMainPage = is_admin ? (<AdminMainPage />) : (<h1>Is not admin</h1>)

    return (
        <Layout>
            {userMainPage}
        </Layout>
    )
}
export default MainPage