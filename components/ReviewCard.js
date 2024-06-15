/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function ReviewCard({ reviewObj }) {
  return (
    <div>
      <Card style={{ width: '49vw', marginBottom: '10px', borderRadius: '15px' }}>
        <Card.Body>
          <Card.Title>Anonymous User</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">@anonuser</Card.Subtitle>
          <div className="star-ratings">
            {/* Creates an empty array with the length equal to rating and iterates over the array of starts */}
            {reviewObj.rating > 0 && [...Array(reviewObj.rating)].map((e, i) => <p className="star goldstar" key={i}>★</p>)}
          </div>
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
