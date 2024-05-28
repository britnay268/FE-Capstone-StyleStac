/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { GrFormView } from 'react-icons/gr';
import { RiEditLine } from 'react-icons/ri';
import { MdDeleteForever } from 'react-icons/md';
import { useRouter } from 'next/router';
import Link from 'next/link';
import getAllHairstyleInfo from '../api/mergedData';
import { deleteHairstyle } from '../api/HairstyleData';

export default function HairstyleCard({ hairstyleObj, onUpdate }) {
  const [hairstyle, setHairstyle] = useState([]);
  const router = useRouter();

  const deleteTheHairstyle = () => {
    if (window.confirm(`Delete ${hairstyleObj.name} hairstyle?`)) {
      deleteHairstyle(hairstyleObj.firebaseKey).then(() => onUpdate());
    }
  };

  useEffect(() => {
    const { firebaseKey } = hairstyleObj;
    getAllHairstyleInfo(firebaseKey).then(setHairstyle);
  }, []);

  return (
    <Card style={{ width: '18rem', margin: '20px 0px' }}>
      <Card.Img variant="top" src={hairstyleObj.image} style={{ height: '300px' }} />
      <Card.Body>
        <Card.Title>{hairstyleObj.name}</Card.Title>
        <p>Type: {hairstyle.type?.name}</p>
        <p>Occasion: {hairstyle.occasion?.name}</p>
        <Link href={`/hairstyle/${hairstyleObj.firebaseKey}`} passHref>
          <Button variant="warning"><GrFormView /></Button>
        </Link>
        {router.asPath !== '/hairstyles' && (
          <>
            <Link href={`/hairstyle/edit/${hairstyleObj.firebaseKey}`} passHref>
              <Button variant="success"><RiEditLine /></Button>
            </Link>
            <Button variant="danger" onClick={deleteTheHairstyle}><MdDeleteForever /></Button>
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
  onUpdate: PropTypes.func.isRequired,
};
