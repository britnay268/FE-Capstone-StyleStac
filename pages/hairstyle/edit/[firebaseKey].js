import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleHairstyle } from '../../../api/HairstyleData';
import HairstyleForm from '../../../components/forms/HairstyleForm';

export default function EditHairstyle() {
  const [editHairstyle, setEditHairstyle] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleHairstyle(firebaseKey).then(setEditHairstyle);
  }, [firebaseKey]);

  return (<HairstyleForm hairstyleObj={editHairstyle} />);
}
