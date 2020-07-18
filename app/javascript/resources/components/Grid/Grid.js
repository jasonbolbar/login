import React, {useState,useEffect} from 'react';
import _ from 'lodash'
import axios from '../../services/axios'
import {Card, CardHeader, CardTitle, CardText, CardBody, CardDeck} from "reactstrap";

const Grid = () => {

    const [applications, setApplications] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(()=>{
        if (_.isEmpty(applications) && !dataFetched) {
            axios.get('/applications')
                .then(({data}) => setApplications(data))
                .finally(() => setDataFetched(true))
        }
    }, [])

    return (
        <div>
            {applications.map(application => (
                <Card key={application.id}>
                    <CardHeader className=""><h3>{application.name}</h3></CardHeader>
                    <CardBody>
                        <CardText className="font-weight-bold m-0">Client ID:</CardText>
                        <CardText className="m-0">{application.uid}</CardText>
                        <CardText className="font-weight-bold m-0">Client Secret:</CardText>
                        <CardText className="m-0">{application.secret}</CardText>
                        <CardText className="font-weight-bold m-0">Redirect uri:</CardText>
                        <CardText className="m-0"><a href={application.redirect_uri}>{application.redirect_uri}</a></CardText>
                    </CardBody>
                </Card>
            ))}
        </div>
    )
}

export default Grid