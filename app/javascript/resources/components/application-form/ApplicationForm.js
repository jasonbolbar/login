import React, {useState} from 'react'
import { Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import _ from "lodash";
import ApplicationRoles from "../application-roles/ApplicationRoles";

const ApplicationForm = ({ record, onSubmit, innerRef }) => {
    const [httpError, setHttpError] = useState(null);
    const { register, handleSubmit, errors } = useForm({
        defaultValues: record,
    });
    const submit = (data) => {
        setHttpError(null);
        onSubmit(record.id,{application: data}).catch(({response}) => setHttpError(response.data))
    };
    return (
        <div>
            <Form onSubmit={handleSubmit(submit)} innerRef={innerRef}>
                {httpError ? <Alert color="danger">
                    {httpError}
                </Alert> : false}
                <FormGroup>
                    <Label for="app-name">Name</Label>
                    <Input
                        name="name"
                        id="app-name"
                        placeholder="Application Name"
                        innerRef={register({required: true})}
                        invalid={!_.isUndefined(errors.name)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="spp-redirect-uri">Redirect URI</Label>
                    <Input
                        type="url"
                        name="redirect_uri"
                        id="spp-redirect-uri"
                        placeholder="Redirect URI"
                        innerRef={register({required: true})}
                        invalid={!_.isUndefined(errors.redirect_uri)}
                    />
                </FormGroup>
            </Form>
            {record.id ? <ApplicationRoles applicationId={record.id} /> : false}
        </div>
    );
};

ApplicationForm.propTypes = {
    record: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
        redirect_uri: PropTypes.string,
    }),
    onSubmit: PropTypes.func.isRequired,
    innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
};

ApplicationForm.defaultProps = {
    record: {}
};

export default ApplicationForm