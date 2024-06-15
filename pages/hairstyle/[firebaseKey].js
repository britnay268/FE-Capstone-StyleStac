/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getAllHairstyleInfo } from '../../api/mergedData';
import ReviewForm from '../../components/forms/ReviewForm';

export default function HairstyleDetails() {
  const [hairstyleDetails, setHairstyleDetails] = useState([]);

  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getAllHairstyleInfo(firebaseKey).then(setHairstyleDetails);
  }, [firebaseKey]);

  return (
    <div className="detail-layout">
      <div className="details">
        <h3 style={{ color: 'white' }}>{hairstyleDetails.name}</h3>
        <img src={hairstyleDetails.image} alt={hairstyleDetails.name} style={{ width: '300px', borderRadius: '10px' }} />
        <div style={{ color: 'white' }}>
          <p>Date Done: {hairstyleDetails.date_done}</p>
          <p>Duration of Hairstyle: {hairstyleDetails.durationOfHairstyle}</p>
          <p>Type: {hairstyleDetails.type?.name}</p>
          <p>Occasion: {hairstyleDetails.occasion?.name}</p>
        </div>
      </div>
      <div className="review-section">
        <ReviewForm />
      </div>
    </div>
  );
}
