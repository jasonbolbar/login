import React from 'react'
import {Card, CardBody, CardHeader, CardText, Col, Row} from "reactstrap";
import Grid from "../Grid/Grid";
import axios from "../../services/axios";

const AdminMainPage = () => (
    <div>
        <Row className="justify-content-center pt-5">
            <Col lg={8} >
                <h1>Applications</h1>
            </Col>
        </Row>
        <Row className="justify-content-center pt-5">
            <Col lg={8} >
                <Grid
                    promise={(offset, limit) => axios.get('/applications', {params: {offset, limit}})}
                    body={record => (
                        <Card key={record.id} className="m-2">
                            <CardHeader className="">
                                <h3 className="text-truncate">{record.name}</h3>
                            </CardHeader>
                            <CardBody>
                                <CardText className="font-weight-bold m-0">Client ID:</CardText>
                                <CardText className="m-0 text-truncate">
                                    {record.uid}
                                </CardText>
                                <CardText className="font-weight-bold m-0">Client Secret:</CardText>
                                <CardText className="m-0 text-truncate">
                                    {record.secret}
                                </CardText>
                                <CardText className="font-weight-bold m-0">Redirect uri:</CardText>
                                <CardText className="m-0 text-truncate">
                                    <a href={record.redirect_uri}>{record.redirect_uri}</a>
                                </CardText>
                            </CardBody>
                        </Card>
                    )}
                />
            </Col>
        </Row>
    </div>
);

export default AdminMainPage
