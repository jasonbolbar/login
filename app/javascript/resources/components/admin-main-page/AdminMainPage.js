import React, {useState} from 'react'
import {Card, CardBody, CardHeader, CardText, Col, Row, Button} from "reactstrap";
import { useHistory } from "react-router-dom";
import Grid from "../Grid/Grid";
import GridActions from "../grid-actions/GridActions";
import axios from "../../services/axios";

const AdminMainPage = () => {
    const history = useHistory();
    const [reload, setReload] = useState(false);
    const onDelete = (id, name) => {
        const execute = confirm(`Are you sure to delete app ${name}`)
        if (execute) {
            axios.delete(`/applications/${id}`).then(() =>setReload(!reload));

        }
    }
    const promise = (offset, limit, searchTerm) => axios.get('/applications', {
        params: {offset, limit, searchTerm}
    })
    return (
        <div>
            <Row className="justify-content-center pt-3">
                <Col lg={8} >
                    <h1 className="ml-2">Applications</h1>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col lg={8} >
                    <Button onClick={() => history.push(`/applications/${record.id}/new`)} color="success" className="float-right mr-2">
                        New Application
                    </Button>
                </Col>
            </Row>
            <Row className="justify-content-center pt-3">
                <Col lg={8} >
                    <Grid
                        reload={reload}
                        promise={promise}
                        body={record => (
                            <Card key={record.id} className="m-2">
                                <CardHeader>
                                    <Row>
                                        <Col lg={6}>
                                            <h3 className="text-truncate">{record.name}</h3>
                                        </Col>
                                        <Col lg={6}>
                                            <GridActions
                                                onShow={() => history.push(`/applications/${record.id}`)}
                                                onEdit={() => history.push(`/applications/${record.id}/edit`)}
                                                onDelete={() =>onDelete(record.id, record.name)}
                                            />
                                        </Col>
                                    </Row>
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
}

export default AdminMainPage
