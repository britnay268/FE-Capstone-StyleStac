import React from 'react';
import { Button, Form } from 'react-bootstrap';

export default function HairstyleForm() {
  return (
    <Form>
      <h1 className="text-black mt-5 audio">Create Hairstyle</h1>
      <Form.Group className="mb-3" controlId="floatingInput1">
        <Form.Label>Hairstyle Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name of hairstyle"
          name="name"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="floatingInput1">
        <Form.Label>Hairstyle Image</Form.Label>
        <Form.Control
          type="url"
          placeholder="Image URL of the hairstyle."
          name="image"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="floatingInput1">
        <Form.Label>Hairstyle Type</Form.Label>
        <Form.Select
          aria-label="Role"
          name="type"
          className="mb-3"
          required
        >
          <option value="">Hairstyle Type</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="floatingInput1">
        <Form.Label>Hairstyle Occasion</Form.Label>
        <Form.Select
          aria-label="Role"
          name="occasion"
          className="mb-3"
          required
        >
          <option value="">Hairstyle Occasion</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="floatingInput1">
        <Form.Label>Duration of Hairstyle</Form.Label>
        <Form.Control
          type="text"
          placeholder="How long did your hairstyle last..."
          name="durationOfHairstyle"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="floatingInput1">
        <Form.Label>Date Done</Form.Label>
        <Form.Control
          type="text"
          placeholder="When did you get your hairstyle done?"
          name="dateDone"
          required
        />
      </Form.Group>
      <div className="flex justify-content-center">
        <Button type="submit">CREATE</Button>
      </div>
    </Form>
  );
}
