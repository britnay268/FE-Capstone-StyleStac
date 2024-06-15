import React from 'react';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import { CiSquarePlus } from 'react-icons/ci';

export default function ReviewForm() {
  return (
    <div>
      <Button className="review-button"><CiSquarePlus /> Add Review</Button>
      <Form>
        <FloatingLabel controlId="floatingTextarea2" label="Reviews">
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: '150px', width: '50vw', borderRadius: '15px' }}
          />
        </FloatingLabel>
      </Form>
    </div>
  );
}
