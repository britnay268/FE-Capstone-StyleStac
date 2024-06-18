/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { BiSolidPencil } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';
import { useAuth } from '../utils/context/authContext';

export default function ReviewCard({ reviewObj, reviewEdit, reviewDelete }) {
  const { user } = useAuth();

  const handleEdit = () => {
    reviewEdit(reviewObj);
    // console.warn(reviewObj.firebaseKey);
  };

  const handleDelete = () => {
    reviewDelete(reviewObj);
    // console.warn(reviewObj.firebaseKey);
  };

  return (
    <div>
      <Card style={{ width: '47vw', marginBottom: '10px', borderRadius: '15px' }}>
        <Card.Body>
          <div className="reviewCard">
            <Card.Title>Anonymous User</Card.Title>
            <div style={{ display: 'flex', gap: '-20px' }}>
              {reviewObj.uid === user.uid ? <Button style={{ backgroundColor: 'transparent', border: 'none', padding: '6px 6px' }} onClick={handleEdit}><BiSolidPencil style={{ height: '15px', width: '15px', color: 'black' }} /></Button> : ''}
              {reviewObj.uid === user.uid ? <Button style={{ backgroundColor: 'transparent', border: 'none', padding: '6px 6px' }} onClick={handleDelete}><MdDeleteForever style={{ height: '15px', width: '15px', color: 'black' }} /></Button> : ''}
            </div>
          </div>
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
  reviewEdit: PropTypes.func.isRequired,
  reviewDelete: PropTypes.func.isRequired,
};
