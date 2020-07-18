import React from 'react';
import {Col, Row, Spinner, Container} from "reactstrap";

const Loading = () => (
    <Container fluid className="h-100">
        <Row className="justify-content-center align-items-center h-100">
            <Col lg={{ size: 3, offset: 1 }} >
                <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" className="mr-4" />
                <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" className="mr-4"/>
                <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" className="mr-4"/>
                <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" className="mr-4"/>
            </Col>
        </Row>
    </Container>
)

export default Loading