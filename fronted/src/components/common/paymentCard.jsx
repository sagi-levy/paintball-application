import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  Navigate,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { updateActivityCardToPaidTrue } from "../../services/cardsServices";
import useActivityCard from "../../hooks/useActivityCard";
import { useAppContext } from "../../context/card.context";
import queryString from "query-string"; 

const PaymentCard = ({ amountToCharge = 20 }) => {
  const location = useLocation();

  const queryParams = queryString.parse(location.search);
  const { cardId } = queryParams;
  const { myProp } = useAppContext();
  const navigate = useNavigate();

  const { id } = useParams();
  console.log(id, myProp);
  useActivityCard(id, cardId);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
      },
      amount: amountToCharge * 100, 
      currency: "usd", 
    });

    if (result.error) {
      console.error(result.error.message);
      await updateActivityCardToPaidTrue(id, myProp);
      navigate("/calendar");
    } else {

      await updateActivityCardToPaidTrue(id, myProp);
      navigate("/calendar");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button
          className="btn btn-outline-primary"
          type="submit"
          disabled={!stripe}
        >
          Pay {amountToCharge}
        </button>
      </form>
    </>
  );
};

export default PaymentCard;
