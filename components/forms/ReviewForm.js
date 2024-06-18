/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createReview, updateReview } from '../../api/ReviewData';

const initialState = {
  rating: 0,
  content: '',
};
export default function ReviewForm({ reviewObj, onReviewSubmit, hideForm }) {
  const [formInput, setFormInput] = useState(reviewObj || initialState);
  const { user } = useAuth();
  const router = useRouter();
  const { firebaseKey } = router.query;

  // const [starColor, setStarColor] = useState([...Array(5).fill('goldstar')]);

  // const toggleRating = (stars) => {
  //   if (stars === formInput.rating) {
  //     setFormInput((prevState) => ({
  //       ...prevState,
  //       rating: 0,
  //     }));
  //   } else {
  //     setFormInput((prevState) => ({
  //       ...prevState,
  //       rating: stars,
  //     }));
  //   }
  // };

  // useEffect(() => {
  //   const newColors = [...Array(5).fill('goldstar').fill('graystar', formInput.rating)];
  //   setStarColor([...newColors]);
  // }, [formInput.rating]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (reviewObj.firebaseKey) {
      setFormInput(reviewObj);
    }
  }, [reviewObj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reviewObj.firebaseKey) {
      const updatePayload = { ...formInput, dateCreated: new Date().toISOString().split('T')[0] };
      updateReview(updatePayload).then(() => {
        router.push(`/hairstyle/${firebaseKey}`);
      });
      onReviewSubmit();
      hideForm();
    } else {
      const payload = {
        ...formInput, uid: user.uid, hairstyle_id: firebaseKey, dateCreated: new Date().toISOString().split('T')[0],
      };
      createReview(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateReview(patchPayload).then(() => {
          router.push(`/hairstyle/${firebaseKey}`);
        });
        onReviewSubmit();
        hideForm();
      });
    }
  };

  return (
    <div>
      {/* <div className="formStars">
        {starColor.map((e, i) => (
          <button type="button" className={`star ${e}`} key={i} onClick={() => toggleRating(i + 1)}>★</button>
        ))}
      </div> */}
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingTextarea2" label="Reviews">
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: '150px', width: '47vw', borderRadius: '15px' }}
            name="content"
            value={formInput.content}
            onChange={handleChange}
          />
        </FloatingLabel>
        <div className="reviewForm-button">
          <Button type="submit">{reviewObj.firebaseKey ? 'Update' : 'Submit'}</Button>
        </div>
      </Form>
    </div>
  );
}

ReviewForm.propTypes = {
  reviewObj: PropTypes.shape({
    content: PropTypes.string,
    hairstyle_id: PropTypes.string,
    dateCreated: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    rating: PropTypes.number,
  }),
  onReviewSubmit: PropTypes.func.isRequired,
  hideForm: PropTypes.func.isRequired,
};

ReviewForm.defaultProps = {
  reviewObj: initialState,
};
