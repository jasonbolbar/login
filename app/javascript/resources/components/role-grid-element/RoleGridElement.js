import React from 'react'
import PropTypes from 'prop-types';
import GridActions from '../grid-actions/GridActions'

const RoleGridElement = ({record, onEdit, onDelete}) => (
    <div className="role-item py-2 px-3">
        <p className="d-inline ">{record.name}</p>
        <GridActions {...{onEdit, onDelete, className: 'd-inline float-right mr-2'}} />
    </div>
);

RoleGridElement.propTypes = {
    record: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
    }).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default RoleGridElement;