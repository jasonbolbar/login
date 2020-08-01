import React, {useState} from 'react'
import {Button, Col, Row} from "reactstrap";
import PropTypes from 'prop-types';
import Grid from "../Grid/Grid";
import axios from "../../services/axios";
import RoleGridElement from "../role-grid-element/RoleGridElement";

const ApplicationRoles = ({applicationId}) => {
    const [reload, setReload] = useState(false);
    const reloadPage = () => setReload(!reload);
    const onDelete = () => {reloadPage()};
    const onEdit = () => {reloadPage()};
    const promise = (offset, limit, searchTerm) => axios.get(`/applications/${applicationId}/roles`, {
        params: {offset, limit, searchTerm}
    });
    return (
        <div>
            <Row>
                <Col>
                    <h4 className="ml-2">Roles</h4>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button onClick={() => {}} color="success" className="float-right mr-2">
                        New Role
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Grid
                        reload={reload}
                        promise={promise}
                        body={record => <RoleGridElement
                            record={record}
                            key={record.name}
                            onDelete={onDelete}
                            onEdit={onEdit}/>}
                    />
                </Col>
            </Row>
        </div>
    );
};

ApplicationRoles.propTypes = {
    applicationId: PropTypes.number.isRequired
};

export default ApplicationRoles