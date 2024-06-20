import { getPublicHairstyleWithUid, getPublicHairstyleWithoutUid, getSingleHairstyle } from './HairstyleData';
import { getSingleHairstyleOccasion } from './HairstyleOccasionData';
import { getSingleHairstyleType } from './HairstyleTypeData';
import { getStylists } from './StylistData';

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
  // return [...hairstyleWithUid, ...hairstyleWithoutUid];
  const combinedHairstyles = [...hairstyleWithUid, ...hairstyleWithoutUid];

  const filteredHairstyles = combinedHairstyles.filter((hairstyle) => !hairstyle.copy);

  return filteredHairstyles;
};

const getHairstyleAndStylist = async (hsFirebaseKey) => {
  const hairstyle = await getSingleHairstyle(hsFirebaseKey);

  const stylists = await getStylists();

  const singleStylist = await stylists.find((stylist) => stylist.firebaseKey === hairstyle.stylist_id);

  return { ...hairstyle, singleStylist };
};

export { getAllHairstyleInfo, getPublicHairstyle, getHairstyleAndStylist };
