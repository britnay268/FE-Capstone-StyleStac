/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const initialState = {
  rating: 0,
  content: '',
};
export default function ReviewForm({ reviewObj }) {
  const [formInput, setFormInput] = useState(reviewObj || initialState);
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

  return (
    <div>
      {/* <div className="formStars">
        {starColor.map((e, i) => (
          <button type="button" className={`star ${e}`} key={i} onClick={() => toggleRating(i + 1)}>★</button>
        ))}
      </div> */}
      <Form>
        <FloatingLabel controlId="floatingTextarea2" label="Reviews">
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: '150px', width: '50vw', borderRadius: '15px' }}
            name="review"
            value={formInput.review}
            onChange={handleChange}
          />
        </FloatingLabel>
        <Button type="submit">{reviewObj.firebaseKey ? 'Update' : 'Submit'}</Button>
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
};

ReviewForm.defaultProps = {
  reviewObj: initialState,
};
