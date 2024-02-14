import { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import queryString from "query-string"; // Import query-string library
import { deleteActivityCard } from "../../services/cardsServices";

const DeleteActivityCard = () => {
  const location = useLocation();

  const queryParams = queryString.parse(location.search);
  const { cardId } = queryParams;
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) return;
    const remove = async () => {
      await deleteActivityCard(id,cardId);

      navigate("/calendar");
    };

    remove();
  }, []);
};

export default DeleteActivityCard;
