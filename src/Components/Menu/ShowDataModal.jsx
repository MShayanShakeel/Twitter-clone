import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ShowDataModal = ({ userAllData, showModal, handleClose }) => {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>User Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {userAllData.map((user, index) => (
          <div key={index}>
            <strong>User ID:</strong> {user.id}
            <br />
            {user.UserData ? (
              <>
                <strong>Contact:</strong> {user.UserData.contact || 'N/A'}
                <br />
                <strong>Email:</strong> {user.UserData.email || 'N/A'}
                <br />
                <strong>Full Name:</strong> {user.UserData.fullName || 'N/A'}
                <br />
                <strong>User Name:</strong> {user.UserData.userName || 'N/A'}
              </>
            ) : (
              <>
                <strong>Contact:</strong> {user.contact || 'N/A'}
                <br />
                <strong>Email:</strong> {user.email || 'N/A'}
                <br />
                <strong>Full Name:</strong> {user.fullName || 'N/A'}
                <br />
                <strong>User Name:</strong> {user.userName || 'N/A'}
              </>
            )}
            <hr />
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowDataModal;
