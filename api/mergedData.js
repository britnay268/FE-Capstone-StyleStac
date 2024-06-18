import { getPublicHairstyleWithUid, getPublicHairstyleWithoutUid, getSingleHairstyle } from './HairstyleData';
import { getSingleHairstyleOccasion } from './HairstyleOccasionData';
import { getSingleHairstyleType } from './HairstyleTypeData';

const getAllHairstyleInfo = async (hairstyleFirebaseKey) => {
  const hairstyle = await getSingleHairstyle(hairstyleFirebaseKey);
  const type = await getSingleHairstyleType(hairstyle?.type_id);
  const occasion = await getSingleHairstyleOccasion(hairstyle?.occasion_id);

  return { ...hairstyle, type, occasion };
};

const getPublicHairstyle = async (uid) => {
  const hairstyleWithoutUid = await getPublicHairstyleWithoutUid();
  const hairstyleWithUid = await getPublicHairstyleWithUid(uid);

  // console.warn([...hairstyleWithoutUid, ...hairstyleWithUid]);
  return [...hairstyleWithUid, ...hairstyleWithoutUid];
};

export { getAllHairstyleInfo, getPublicHairstyle };
