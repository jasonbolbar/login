import React from 'react';
import { Card, CardBody, CardHeader, CardText, Col, Row } from "reactstrap";
import GridActions from "../grid-actions/GridActions";
import PropTypes from 'prop-types';

const ApplicationGridElement = ({ record, onEdit, onDelete }) => (
    <Card className="m-2">
        <CardHeader>
            <Row>
                <Col lg={8}>
                    <h3 className="text-truncate">{record.name}</h3>
                </Col>
                <Col lg={4}>
                    <GridActions
                        onEdit={() => onEdit(record)}
                        onDelete={() => onDelete(record.id, record.name)}
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
);

ApplicationGridElement.propTypes = {
    record: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        uid: PropTypes.string.isRequired,
        secret: PropTypes.string.isRequired,
        redirect_uri: PropTypes.string.isRequired,
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default ApplicationGridElement;