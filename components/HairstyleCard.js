/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { GrFormView } from 'react-icons/gr';
import { RiEditLine } from 'react-icons/ri';
import { MdDeleteForever } from 'react-icons/md';
import { useRouter } from 'next/router';
import getAllHairstyleInfo from '../api/mergedData';

export default function HairstyleCard({ hairstyleObj }) {
  const [hairstyle, setHairstyle] = useState([]);

  useEffect(() => {
    const { firebaseKey } = hairstyleObj;
    getAllHairstyleInfo(firebaseKey).then(setHairstyle);
  }, []);

  const router = useRouter();

  return (
    <Card style={{ width: '18rem', margin: '20px 0px' }}>
      <Card.Img variant="top" src={hairstyleObj.image} style={{ height: '300px' }} />
      <Card.Body>
        <Card.Title>{hairstyleObj.name}</Card.Title>
        <p>Type: {hairstyle.type?.name}</p>
        <p>Occasion: {hairstyle.occasion?.name}</p>
        <p>Created by: {hairstyleObj.uid.name}</p>
        <Button variant="warning"><GrFormView /></Button>
        {router.asPath !== '/hairstyles' && (
          <>
            <Button variant="success"><RiEditLine /></Button>
            <Button variant="danger"><MdDeleteForever /></Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

HairstyleCard.propTypes = {
  hairstyleObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};
