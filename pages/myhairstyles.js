/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getHairstylesByUid } from '../api/HairstyleData';
import HairstyleCard from '../components/HairstyleCard';
import { useAuth } from '../utils/context/authContext';

export default function ShowAllHairstlyes() {
  const [hairstyles, setHairstyles] = useState();

  const { user } = useAuth();

  const getAllTheHairstyles = () => {
    getHairstylesByUid(user.uid).then(setHairstyles);
  };

  useEffect(() => {
    getAllTheHairstyles();
  }, []);

  return (
    <>
      <div className="d-flex flex-wrap">
        {hairstyles?.length === 0 ? <h1 style={{ color: 'white', textAlign: 'center', width: '100%' }}>You Have No Hairstyles</h1> : hairstyles?.map((hairstyle) => (
          <HairstyleCard key={hairstyle.firebaseKey} hairstyleObj={hairstyle} onUpdate={getAllTheHairstyles} />
        ))}
      </div>
    </>
  );
}
