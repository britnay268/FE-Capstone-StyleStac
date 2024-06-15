/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { CiSquarePlus } from 'react-icons/ci';
import { Button } from 'react-bootstrap';
import { getAllHairstyleInfo } from '../../api/mergedData';
import ReviewForm from '../../components/forms/ReviewForm';
import { getReviewByHairstyle } from '../../api/ReviewData';
import ReviewCard from '../../components/ReviewCard';

export default function HairstyleDetails() {
  const [hairstyleDetails, setHairstyleDetails] = useState([]);
  const [reviewClick, setReviewClick] = useState(false);
  const [reviews, setReviews] = useState([]);

  const router = useRouter();

  const { firebaseKey } = router.query;

  const getAllReviewsByHairstyle = async () => {
    await getReviewByHairstyle(firebaseKey).then(setReviews);
    // console.warn(reviews);
  };

  const handleReviewClick = () => {
    setReviewClick(!reviewClick);
  };

  useEffect(() => {
    getAllHairstyleInfo(firebaseKey).then(setHairstyleDetails);
  }, [firebaseKey]);

  useEffect(() => {
    getAllReviewsByHairstyle();
  }, []);

  return (
    <div className="detail-layout">
      <div className="details">
        <h3 style={{ color: 'white', marginTop: '10px' }}>{hairstyleDetails.name}</h3>
        <img src={hairstyleDetails.image} alt={hairstyleDetails.name} style={{ width: '300px', borderRadius: '10px' }} />
        <div style={{ color: 'white' }}>
          <p>Date Done: {hairstyleDetails.date_done}</p>
          <p>Duration of Hairstyle: {hairstyleDetails.durationOfHairstyle}</p>
          <p>Type: {hairstyleDetails.type?.name}</p>
          <p>Occasion: {hairstyleDetails.occasion?.name}</p>
        </div>
      </div>
      <div className="review-section">
        <Button className="review-button" onClick={handleReviewClick}><CiSquarePlus /> Add Review</Button>
        {reviewClick && <ReviewForm key={firebaseKey} onReviewSubmit={getAllReviewsByHairstyle} hideForm={() => setReviewClick(false)} />}
        <div className="d-flex flex-wrap justify-content-between">
          {reviews.length === 0 ? <h1 style={{ color: 'white', textAlign: 'center', width: '100%' }}>There are no Reviews</h1> : reviews.map((review) => (
            <ReviewCard key={review.firebaseKey} reviewObj={review} onUpdate={getAllReviewsByHairstyle} />
          ))}
        </div>
      </div>
    </div>
  );
}
