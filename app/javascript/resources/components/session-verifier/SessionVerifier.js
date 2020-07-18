import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import Session from "../../services/session";
import { setBearerToken } from "../../services/axios";
import Loading from "../loading/Loading";


const SessionVerifier = ({children, inverse}) => {

    const history = useHistory();
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        if (Session.isGuest()) {
            if (inverse) {
                setIsVerified(true)
            } else {
                history.push('/login')
            }
        } else {
            if (inverse) {
                history.push('/')
            } else {
                setBearerToken(Session.getToken());
                setIsVerified(true)
            }
        }
    })
    return isVerified ? children : <Loading />
}

SessionVerifier.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
    ]).isRequired,
    inverse: PropTypes.bool,
}

SessionVerifier.defaultProps = {
    inverse: false
}

export default SessionVerifier