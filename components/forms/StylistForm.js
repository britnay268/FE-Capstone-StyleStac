import React, { useEffect, useState } from 'react';
import {
  Button, Form, Modal,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { IoMdAdd } from 'react-icons/io';
import { useRouter } from 'next/router';
import { createStylist, updateStylist } from '../../api/StylistData';
import { updateHairstyle } from '../../api/HairstyleData';

const initialState = {
  name: '',
  instagram_link: '',
  booking_site: '',
};

export default function StylistForm({ stylistObj }) {
  const [show, setShow] = useState(false);
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { firebaseKey } = router.query;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createStylist({ ...formInput }).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateStylist(patchPayload).then(() => {
        const payload = { stylist_id: stylistObj.firebaseKey };
        updateHairstyle(payload).then(() => router.push(`/hairstyle/${firebaseKey}`));
      });
    });
    // await updateHairstyle({ stylist_id: stylistObj.firebaseKey });
  };

  useEffect(() => {
    if (stylistObj.firebaseKey) {
      setFormInput(stylistObj);
    }
  }, [stylistObj]);

  return (
    <>
      <Button variant="link" onClick={handleShow} className="stylistBtn">
        <IoMdAdd style={{ height: '15px', width: '15px' }} />Add Stylist
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form style={{ padding: '15px' }} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Enter Stylist Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Stylist Name..."
              name="name"
              value={formInput.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Enter Stylist Booking Site</Form.Label>
            <Form.Control
              type="link"
              placeholder="Booking Link..."
              name="booking_site"
              value={formInput.booking_site}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Enter Stylist Booking Site</Form.Label>
            <Form.Control
              type="link"
              placeholder="Instagram Link..."
              name="instagram_link"
              value={formInput.instagram_link}
              onChange={handleChange}
            />
          </Form.Group>
          <Button className="stylist-button" type="submit" onClick={handleClose}>Submit</Button>
        </Form>
      </Modal>
    </>
  );
}

StylistForm.propTypes = {
  stylistObj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    booking_site: PropTypes.string,
    instagram_link: PropTypes.number,
  }),
};

StylistForm.defaultProps = {
  stylistObj: initialState,
};
