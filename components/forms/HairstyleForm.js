import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { getAllHairstyleType } from '../../api/HairstyleTypeData';
import { getAllHairstyleOccasion } from '../../api/HairstyleOccasionData';
import { createHairstyle, updateHairstyle } from '../../api/HairstyleData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  name: '',
  image: '',
  durationOfHairstyle: '',
  date_done: '',
};

export default function HairstyleForm({ hairstyleObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [types, setTypes] = useState([]);
  const [occasions, setOccasions] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // Get all hairstyle types
    getAllHairstyleType().then(setTypes);

    // Get all hairstyle occasions
    getAllHairstyleOccasion().then(setOccasions);

    // Put in a seperate udeEffect - Optional
    if (hairstyleObj.firebaseKey) setFormInput(hairstyleObj);
  }, [hairstyleObj, user]);

  // Without this, you will not be able to input values into the input field of the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hairstyleObj.firebaseKey) {
      updateHairstyle(formInput).then(() => router.push('/myhairstyles'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createHairstyle(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateHairstyle(patchPayload).then(() => {
          router.push('/myhairstyles');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text-black mt-5 audio">{hairstyleObj.firebaseKey ? 'Update' : 'Create'} Hairstyle</h1>

      {/* Hairstyle Name Input */}
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
          placeholder="Image URL of the hairstyle"
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
          aria-label="Type"
          name="type_id"
          onChange={handleChange}
          className="mb-3"
          value={formInput.type_id}
          required
        >
          <option value="">Select Hairstyle Type</option>
          {
            types.map((type) => (
              <option
                key={type.firebaseKey}
                value={type.firebaseKey}
              >
                {type.name}
              </option>
            ))
          }
        </Form.Select>
      </Form.Group>

      {/* Hairstyle Occasion Dropdown */}
      <Form.Group className="mb-3" controlId="floatingInput1">
        <Form.Label>Hairstyle Occasion</Form.Label>
        <Form.Select
          aria-label="Occasion"
          name="occasion_id"
          onChange={handleChange}
          className="mb-3"
          value={formInput.occasion_id}
          required
        >
          <option value="">Select Hairstyle Occasion</option>
          {
            occasions.map((occasion) => (
              <option
                key={occasion.firebaseKey}
                value={occasion.firebaseKey}
              >
                {occasion.name}
              </option>
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
        <Button type="submit">{hairstyleObj.firebaseKey ? 'Update' : 'Create'}</Button>
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
    firebaseKey: PropTypes.string,
    public: PropTypes.bool,
    favorite: PropTypes.bool,
    type_id: PropTypes.string,
    occasion_id: PropTypes.string,
  }),
};

HairstyleForm.defaultProps = {
  hairstyleObj: initialState,
};
