import React, { useState } from 'react';
import {
    Col,
    Row,
    Card,
    CardFooter,
    CardHeader,
    CardBody,
    Alert,
    Button,
    Input,
    Form,
    FormGroup, Container,
} from "reactstrap";
import _ from 'lodash';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Session from "../../services/session";
import SessionVerifier from "../session-verifier/SessionVerifier";


const Login = () => {
    const history = useHistory();
    document.title = 'Login';
    const { register, handleSubmit, watch, errors } = useForm();
    const [loginError, setLoginError] = useState(false);
    const successLogin = (response) => {
        setLoginError(false);
        history.push('/')
    };
    const onSubmit = ({ email, password }) =>
        Session.authenticate(email, password,successLogin,() => setLoginError(true));

    return (
        <SessionVerifier inverse>
            <Container fluid className="h-100">
                <Row className="justify-content-center align-items-center h-100">
                    <Col sm={4} lg={3}>
                        <Card className="text-center">
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <CardHeader>Login</CardHeader>
                                <CardBody>
                                    { loginError ? (
                                        <Alert color="danger">
                                            Invalid Credentials
                                        </Alert>) : null }
                                    <FormGroup className="m-2">
                                        <Input
                                            type="email"
                                            name="email"
                                            placeholder="Username"
                                            innerRef={register({required: true})}
                                            invalid={!_.isUndefined(errors.email)}
                                        />
                                    </FormGroup>
                                    <FormGroup className="m-2">
                                        <Input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            innerRef={register({required: true})}
                                            invalid={!_.isUndefined(errors.password)}
                                        />
                                    </FormGroup>
                                </CardBody>
                                <CardFooter>
                                    <Button color="primary">Log In</Button>
                                </CardFooter>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </SessionVerifier>
    )
}

export default Login