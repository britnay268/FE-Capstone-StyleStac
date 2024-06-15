import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function ReviewCard({ reviewObj }) {
  return (
    <div>
      <Card style={{ width: '30rem', marginBottom: '10px' }}>
        <Card.Body>
          <Card.Title>Anonymous User</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">@anonuser</Card.Subtitle>
          <Card.Text>{reviewObj.content}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

ReviewCard.propTypes = {
  reviewObj: PropTypes.shape({
    content: PropTypes.string,
    hairstyle_id: PropTypes.string,
    dateCreated: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired,
};
