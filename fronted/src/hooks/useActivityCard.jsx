import { useState } from "react";
import { useEffect } from "react";
import { getSpecificActivityCard } from "../services/cardsServices";
const useActivityCard = (id,cardId) => {
  const [ActivityCard, setActivityCard] = useState(null);
  useEffect(() => {
    const getActivityCard = async () => {
      const { data } = await getSpecificActivityCard(id,cardId);
      setActivityCard(data); 
    };
    getActivityCard();
  }, []);
  return ActivityCard;
};
export default useActivityCard;
