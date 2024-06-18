/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { RiEditLine } from 'react-icons/ri';
import { MdDeleteForever } from 'react-icons/md';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { TbListDetails } from 'react-icons/tb';
import { getAllHairstyleInfo } from '../api/mergedData';
import {
  createHairstyle, deleteHairstyle, getHairstylesByUid, updateHairstyle,
} from '../api/HairstyleData';
import { useAuth } from '../utils/context/authContext';

export default function HairstyleCard({ hairstyleObj, onUpdate }) {
  const [hairstyle, setHairstyle] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const [isFavorite, setIsFavorite] = useState(hairstyleObj.favorite);

  const deleteTheHairstyle = () => {
    if (window.confirm(`Delete ${hairstyleObj.name} hairstyle?`)) {
      deleteHairstyle(hairstyleObj.firebaseKey).then(() => onUpdate());
    }
  };

  const toggleFavorite = () => {
    // This shows the opposite of the current favorite state (hairstyleObj.favorite is true, the variable is false and vice versa)
    const newFavoriteState = !hairstyleObj.favorite;
    updateHairstyle({ ...hairstyleObj, favorite: newFavoriteState }).then(onUpdate);
    // Update local state after successful update
    setIsFavorite(newFavoriteState);
  };

  const toggleNotYourFavorite = async () => {
    const userHairstyles = await getHairstylesByUid(user.uid);

    // This checks to see if the hairstyle name already exists in the users hairstyle and if it does, it will let the user know and will not create a copy of hairstyle.
    const existingFavorite = userHairstyles.find((hs) => hs.name === hairstyleObj.name);
    if (existingFavorite) {
      alert('This hairstyle already exists in your favorites!');
      return;
    }

    createHairstyle({
      ...hairstyleObj, favorite: true, uid: user.uid, copy: true,
    }).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateHairstyle(patchPayload).then(() => {
        router.push('/myhairstyles');
      });
    });
  };

  useEffect(() => {
    const { firebaseKey } = hairstyleObj;
    getAllHairstyleInfo(firebaseKey).then(setHairstyle);
  }, [hairstyleObj]);

  return (
    <Card className="hairstyle-card">
      <Card.Img variant="top" src={hairstyleObj.image} className="hairstyle-image" />
      <Card.Body>
        <div className="favorite_position">
          <Card.Title style={{ marginBottom: '16px' }}>{hairstyleObj.name}</Card.Title>
          {router.asPath !== '/hairstyles' && <Button onClick={toggleFavorite} className="favorite">{isFavorite ? <FaStar className="star" /> : <FaRegStar className="star" />}</Button>}

          {router.asPath === '/hairstyles' && <Button onClick={toggleNotYourFavorite} className="favorite">{isFavorite && (hairstyleObj.uid === user.uid && hairstyleObj.uid !== user.uid) ? <FaStar className="star" /> : <FaRegStar className="star" />}</Button>}
        </div>
        <p style={{ marginBottom: '8px' }}><strong>Type:</strong> {hairstyle.type?.name}</p>
        <p><strong>Occasion:</strong> {hairstyle.occasion?.name}</p>
        <Link href={`/hairstyle/${hairstyleObj.firebaseKey}`} passHref>
          <Button variant="warning" className="hairstyle-button"><TbListDetails /></Button>
        </Link>
        {router.asPath !== '/hairstyles' && (
          <>
            <Link href={`/hairstyle/edit/${hairstyleObj.firebaseKey}`} passHref>
              <Button variant="success" className="hairstyle-editbutton"><RiEditLine /></Button>
            </Link>
            <Button variant="danger" className="hairstyle-button" onClick={deleteTheHairstyle}><MdDeleteForever /></Button>
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
    favorite: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
