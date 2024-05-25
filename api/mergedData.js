import { getSingleHairstyle } from './HairstyleData';
import { getAllHairstyleOccasion } from './HairstyleOccasionData';
import { getSingleHairstyleType } from './HairstyleTypeData';

const getAllHairstyleInfo = async (hairstyleFirebaseKey) => {
  const hairstyle = await getSingleHairstyle(hairstyleFirebaseKey);
  const type = await getSingleHairstyleType(hairstyle.type_id);
  const occasion = await getAllHairstyleOccasion(hairstyle.occasion_id);

  console.warn({ ...hairstyle, type, occasion });
  return { ...hairstyle, type, occasion };
};

export default getAllHairstyleInfo;
