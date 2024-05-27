import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getAllHairstyleType } from '../../api/HairstyleTypeData';
import { getAllHairstyleOccasion } from '../../api/HairstyleOccasionData';

const initialValue = {
  name: '',
  image: '',
  durationOfHairstyle: '',
  date_done: '',
};

export default function HairstyleForm({ hairstyleObj }) {
  const [formInput, setFormInput] = useState(initialValue);
  const [types, setTypes] = useState([]);
  const [occasions, setOccasions] = useState([]);

  useEffect(() => {
    getAllHairstyleType().then(setTypes);

    getAllHairstyleOccasion().then(setOccasions);

    if (hairstyleObj.firebaseKey) setFormInput(hairstyleObj);
  }, [hairstyleObj]);

  // Without this, you will not be able to input values into the input field of the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Form>
      {/* Hairstyle Name Input */}
      <h1 className="text-black mt-5 audio">Create Hairstyle</h1>
      <Form.Group className="mb-3" controlId="floatingInput1">
        <Form.Label>Hairstyle Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name of hairstyle"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* Hairstyle Image Input */}
      <Form.Group className="mb-3" controlId="floatingInput1">
        <Form.Label>Hairstyle Image</Form.Label>
        <Form.Control
          type="url"
          placeholder="Image URL of the hairstyle."
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* Hairstyle Type Dropdown */}
      <Form.Group className="mb-3" controlId="floatingInput1">
        <Form.Label>Hairstyle Type</Form.Label>
        <Form.Select
          aria-label="Role"
          name="type"
          className="mb-3"
          value={hairstyleObj.type_id}
          required
        >
          <option value="">Select Hairstyle Type</option>
          {
            types.map((type) => (
              <option key={type.firebaseKey} value={type.firebaseKey}>{type.name}</option>
            ))
          }
        </Form.Select>
      </Form.Group>

      {/* Hairstyle Occasion Dropdown */}
      <Form.Group className="mb-3" controlId="floatingInput1">
        <Form.Label>Hairstyle Occasion</Form.Label>
        <Form.Select
          aria-label="Role"
          name="occasion"
          className="mb-3"
          value={hairstyleObj.occasion_id}
          required
        >
          <option value="">Select Hairstyle Occasion</option>
          {
            occasions.map((occasion) => (
              <option key={occasion.firebaseKey} value={occasion.firebaseKey}>{occasion.name}</option>
            ))
          }
        </Form.Select>
      </Form.Group>

      {/* Hairstyle Duration */}
      <Form.Group className="mb-3" controlId="floatingInput1">
        <Form.Label>Duration of Hairstyle</Form.Label>
        <Form.Control
          type="text"
          placeholder="How long did your hairstyle last..."
          name="durationOfHairstyle"
          value={formInput.durationOfHairstyle}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* Hairstyle Date Completed */}
      <Form.Group className="mb-3">
        <Form.Label>Date Done</Form.Label>
        <Form.Control type="date" id="date_done" name="date_done" value={formInput.date_done} min="1910-10-31" max="2025-1-30" onChange={handleChange} />
      </Form.Group>

      {/* Hairstyle Create Button */}
      <div className="flex justify-content-center">
        <Button type="submit">CREATE</Button>
      </div>

    </Form>
  );
}

HairstyleForm.propTypes = {
  hairstyleObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    durationOfHairstyle: PropTypes.string,
    date_done: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
    public: PropTypes.bool,
    favorite: PropTypes.bool,
    type_id: PropTypes.string,
    occasion_id: PropTypes.string,
  }),
};

HairstyleForm.defaultProps = {
  hairstyleObj: initialValue,
};
