import React, { useState, useRef } from 'react'
import { Col, Row, Button } from "reactstrap";
import Grid from "../Grid/Grid";
import axios from "../../services/axios";
import ApplicationGridElement from "../application-grid-element/ApplicationGridElement";
import AppModal from "../app-modal/AppModal";
import ApplicationForm from "../application-form/ApplicationForm"

const AdminMainPage = () => {
    const [reload, setReload] = useState(false);
    const [modal, setModal] = useState(false);
    const [record, setRecord] = useState({});
    const formRef = useRef();


    const toggle = (record = {}) => {
        setRecord(record);
        setModal(!modal);
    };

    const reloadPage = () => setReload(!reload);

    const onDelete = (id, name) => confirm(`Are you sure to delete app ${name}`) ?
            axios.delete(`/applications/${id}`).then(reloadPage) : null;

    const onSave = (id, data) => axios[id ? 'put' : 'post'](`/applications${id ? `/${id}` : ''}`, data)
        .then(reloadPage).then(toggle);

    const promise = (offset, limit, searchTerm) => axios.get('/applications', {
        params: {offset, limit, searchTerm}
    });
    return (
        <div>
            <AppModal {...{
                isOpen: modal,
                toggle,
                className: 'application-form',
                title: record.id ? `Edit ${record.name}` : 'New Application',
                buttons: [{
                    color: 'primary',
                    text: 'Save',
                    onClick: () => formRef.current.dispatchEvent(new Event("submit")),
                }]
            }}>
                <ApplicationForm record={record} onSubmit={onSave} innerRef={formRef} />
            </AppModal>
            <Row className="justify-content-center pt-3">
                <Col lg={8} >
                    <h1 className="ml-2">Applications</h1>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col lg={8} >
                    <Button onClick={toggle} color="success" className="float-right mr-2">
                        New Application
                    </Button>
                </Col>
            </Row>
            <Row className="justify-content-center pt-3">
                <Col lg={8} >
                    <Grid
                        reload={reload}
                        promise={promise}
                        body={record => <ApplicationGridElement { ...{record, onDelete, onEdit: toggle, key: record.id} }/>}
                    />
                </Col>
            </Row>
        </div>
    );
}

export default AdminMainPage
