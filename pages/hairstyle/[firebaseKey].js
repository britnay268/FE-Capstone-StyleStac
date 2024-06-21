/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { CiSquarePlus, CiCalendar } from 'react-icons/ci';
import { Button } from 'react-bootstrap';
import { FaInstagram } from 'react-icons/fa';
import Link from 'next/link';
import { getAllHairstyleInfo, getHairstyleAndStylist } from '../../api/mergedData';
import ReviewForm from '../../components/forms/ReviewForm';
import { deleteReview, getReviewByHairstyle } from '../../api/ReviewData';
import ReviewCard from '../../components/ReviewCard';
import StylistForm from '../../components/forms/StylistForm';
import { getSingleHairstyle, updateHairstyle } from '../../api/HairstyleData';

export default function HairstyleDetails() {
  const [hairstyleDetails, setHairstyleDetails] = useState([]);
  const [reviewClick, setReviewClick] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState([]);
  const [reviewEditClick, setReviewEditClick] = useState(false);
  const router = useRouter();
  const [hairstyleAndStylist, setHairstyleAndStylist] = useState([]);

  const { firebaseKey } = router.query;

  const getAllReviewsByHairstyle = async () => {
    await getReviewByHairstyle(firebaseKey).then(setReviews);
    // console.warn(reviews);
  };

  useEffect(() => {
    getAllHairstyleInfo(firebaseKey).then(setHairstyleDetails);
  }, [firebaseKey]);

  const handleReviewEdit = (reviewObj) => {
    // Shows data for selected comment you press the edit button on.
    // console.warn('Review edit requested for:', reviewObj);
    setSelectedReview(reviewObj);
    setReviewEditClick(true);
  };

  const handleReviewDelete = (reviewObj) => {
    if (window.confirm('Sure you want to delete your review?')) {
      deleteReview(reviewObj.firebaseKey).then(() => getAllReviewsByHairstyle());
    }
  };

  const updateTheHairstyle = async (stylistObj) => {
    const getTheSingleHairstyle = await getSingleHairstyle(firebaseKey);
    await updateHairstyle({ ...getTheSingleHairstyle, stylist_id: stylistObj.firebaseKey });
  };

  const handleReviewClick = () => {
    setReviewClick(!reviewClick);
  };
  useEffect(() => {
    getAllReviewsByHairstyle();
  }, []);

  useEffect(() => {
    getAllReviewsByHairstyle();
    getHairstyleAndStylist(firebaseKey).then(setHairstyleAndStylist);
    // console.warn(hairstyleAndStylist.singleStylist?.name);
  }, [firebaseKey]);

  return (
    <div className="detail-layout">
      <div className="details">
        <h3 style={{ color: 'white', marginTop: '10px' }}>{hairstyleDetails.name}</h3>
        <img src={hairstyleDetails.image} alt={hairstyleDetails.name} style={{ width: '300px', borderRadius: '10px' }} />
        <div style={{ color: 'white' }}>
          <p>Date Done: {hairstyleDetails.date_done}</p>
          <p>Duration of Hairstyle: {hairstyleDetails.durationOfHairstyle}</p>

          {hairstyleDetails.stylist_id === '' ? <StylistForm onUpdate={hairstyleDetails.firebaseKey && updateTheHairstyle} />
            : (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p>Stylist: {hairstyleAndStylist.singleStylist?.name}</p>
                {hairstyleAndStylist.singleStylist && (
                  <div>
                    <Link passHref href={hairstyleAndStylist.singleStylist.instagram_link} target="_blank" rel="noopener noreferrer">
                      <FaInstagram className="stylistLinks" />
                    </Link>
                    <Link passHref href={hairstyleAndStylist.singleStylist.booking_site}>
                      <CiCalendar className="stylistLinks" />
                    </Link>
                  </div>
                )}
              </div>
            )}

          <p>Type: {hairstyleDetails.type?.name}</p>
          <p>Occasion: {hairstyleDetails.occasion?.name}</p>
        </div>
      </div>
      <div className="review-section">
        <Button className="review-button" onClick={handleReviewClick}><CiSquarePlus /> Add Review</Button>
        {/* This is where the edit review form appears when you click the edit button on a review and once update is pressed the form is closed and the update is shown */}
        {reviewEditClick && <ReviewForm reviewObj={selectedReview} onReviewSubmit={getAllReviewsByHairstyle} hideForm={() => setReviewEditClick(false)} /> }

        {/* This where the review form appears when you click the add review button and once submit is pressed the form is closed and a card appears for the review */}
        {reviewClick && <ReviewForm onReviewSubmit={getAllReviewsByHairstyle} hideForm={() => setReviewClick(false)} />}

        <div className="d-flex flex-wrap justify-content-between">
          {reviews.length === 0 ? <h1 style={{ color: 'white', textAlign: 'center', width: '100%' }}>There are no Reviews</h1> : reviews.map((review) => (
            <ReviewCard key={review.firebaseKey} reviewObj={review} onUpdate={getAllReviewsByHairstyle} reviewEdit={handleReviewEdit} reviewDelete={handleReviewDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}
