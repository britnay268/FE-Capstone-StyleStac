/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { favoriteHairstyle } from '../api/HairstyleData';
import HairstyleCard from '../components/HairstyleCard';
import { useAuth } from '../utils/context/authContext';

export default function FavoriteHairstyle() {
  const [favHairstyles, setFavHairstyles] = useState();
  const { user } = useAuth();

  const getFavoriteHairstyles = () => {
    favoriteHairstyle(user.uid).then(setFavHairstyles);
  };

  useEffect(() => {
    getFavoriteHairstyles();
  }, []);

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between">
        {favHairstyles?.length === 0 ? <h1 style={{ color: 'white', textAlign: 'center', width: '100%' }}>You Have No Hairstyles</h1> : favHairstyles?.map((hairstyle) => (
          <HairstyleCard key={hairstyle.firebaseKey} hairstyleObj={hairstyle} onUpdate={getFavoriteHairstyles} />
        ))}
      </div>
    </>
  );
}
