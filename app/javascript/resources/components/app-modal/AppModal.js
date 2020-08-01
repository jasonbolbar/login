import React from 'react';
import PropTypes from 'prop-types';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

const AppModal = ({isOpen,toggle, size, className, title, children, buttons}) => {
    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle} className={className} size={size} fade={false}>
                <ModalHeader toggle={toggle}>{title}</ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
                <ModalFooter>
                    {buttons.map( button =>
                        (<Button
                            color={button.color}
                            onClick={button.onClick}
                            key={button.text}
                        >
                            {button.text}
                        </Button>)
                    )}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

AppModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle:PropTypes.func.isRequired,
    size: PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
    ]).isRequired,
    buttons: PropTypes.arrayOf(PropTypes.shape({
        color: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        text: PropTypes.string.isRequired
    })).isRequired
};

AppModal.defaultProps = {
    size: 'xl',
    className: 'app-modal'
};

export default AppModal