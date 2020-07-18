import React from 'react'
import {Col, Row} from "reactstrap";
import Grid from "../Grid/Grid";

const AdminMainPage = () => (
    <div>
        <Row className="justify-content-center pt-5">
            <Col lg={8} >
                <h1>Applications</h1>
            </Col>
        </Row>
        <Row className="justify-content-center pt-5">
            <Col lg={8} >
                <Grid />
            </Col>
        </Row>
    </div>
)

export default AdminMainPage
