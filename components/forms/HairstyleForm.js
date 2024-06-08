/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Button, Form, ToggleButton, ToggleButtonGroup,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getAllHairstyleType } from '../../api/HairstyleTypeData';
import { getAllHairstyleOccasion } from '../../api/HairstyleOccasionData';
import { createHairstyle, updateHairstyle } from '../../api/HairstyleData';
import { useAuth } from '../../utils/context/authContext';
import { storage } from '../../utils/client';

const initialState = {
  name: '',
  durationOfHairstyle: '',
  date_done: '',
  public: false,
  favorite: false,
  stylist_id: '',
};
// Issues: On edit, the attached image doesn't show and when I try to update the imagge, it says image does not exist and then when I press update again, it loads the image

export default function HairstyleForm({ hairstyleObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [types, setTypes] = useState([]);
  const [occasions, setOccasions] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const [imageAsFile, setImageAsFile] = useState('');

  useEffect(() => {
    // Get all hairstyle types
    getAllHairstyleType().then(setTypes);

    // Get all hairstyle occasions
    getAllHairstyleOccasion().then(setOccasions);

    // Put in a seperate useEffect - Optional
    // if (hairstyleObj.firebaseKey) setFormInput(hairstyleObj);
  }, [hairstyleObj, user]);

  useEffect(() => {
    if (hairstyleObj.firebaseKey) {
      setFormInput(hairstyleObj);
      // console.warn(hairstyleObj.image);
    }
  }, [hairstyleObj]);

  // Without this, you will not be able to input values into the input field of the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageAsFile) {
      console.warn(`not an image, the image file is a ${typeof (imageAsFile)}`);
    }

    // Stores image in storage on firebase
    await storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile);

    // Gets url path for imge
    const url = await storage.ref(`images/${imageAsFile.name}`).getDownloadURL();

    if (hairstyleObj.firebaseKey) {
      const payload2 = { ...formInput, image: url };
      const payload3 = { ...formInput };
      updateHairstyle(imageAsFile ? payload2 : payload3).then(() => router.push('/myhairstyles'));
    } else {
      const payload = { ...formInput, uid: user.uid, image: url };
      createHairstyle(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateHairstyle(patchPayload).then(() => {
          router.push('/myhairstyles');
        });
      });
    }
  };

  const handleImage = (e) => {
    // This gets the image data
    const image = e.target.files[0];
    // console.warn(image);
    setImageAsFile(image);
  };

  const handleToggleChange = () => {
    setFormInput((prevState) => ({
      ...prevState,
      // this updates the private property in formInput by using ! to toggle the value meaning if it was true, then it becomes false and vice versa.
      public: !prevState.public,
    }));
  };

  return (
    <Form className="form-background" onSubmit={handleSubmit}>
      <h1 className="mt-5 audio form-title">{hairstyleObj.firebaseKey ? 'Update' : 'Create'} Hairstyle</h1>

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

      {/* Hairstyle Image Input */}
      <Form.Group controlId="floatingInput1">
        <Form.Label>Hairstyle Image</Form.Label>
      </Form.Group>

      {hairstyleObj.firebaseKey && hairstyleObj.image && (
        <>
          <p style={{ marginBottom: '0px' }}>Existing Image</p>
          <img src={hairstyleObj.image} alt="Existing Hairstyle" className="existing-hairstyle-image" />
        </>
      )}

      <input type="file" className="form-image" onChange={handleImage} />

      <ToggleButtonGroup type="checkbox" style={{ marginBottom: '10px', display: 'block', width: 'fit-content' }}>
        <ToggleButton
          checked={formInput.private}
          value={formInput}
          onClick={handleToggleChange}
          style={{ backgroundColor: formInput.public ? 'green' : 'red', border: 'none' }}
        >
          {formInput.public ? 'Public' : 'Private'}
        </ToggleButton>
      </ToggleButtonGroup>

      {/* Hairstyle Create Button */}
      <div className="form-button-div">
        <Button className="form-button" type="submit">{hairstyleObj.firebaseKey ? 'Update' : 'Create'}</Button>
        <Link passHref href="/myhairstyles">
          <Button className="form-button" type="submit">Back</Button>
        </Link>
      </div>

    </Form>
  );
}

HairstyleForm.propTypes = {
  hairstyleObj: PropTypes.shape({
    name: PropTypes.string,
    durationOfHairstyle: PropTypes.string,
    date_done: PropTypes.string,
    firebaseKey: PropTypes.string,
    public: PropTypes.bool,
    favorite: PropTypes.bool,
    type_id: PropTypes.string,
    occasion_id: PropTypes.string,
    stylist_id: PropTypes.string,
    image: PropTypes.string,
  }),
};

HairstyleForm.defaultProps = {
  hairstyleObj: initialState,
};
