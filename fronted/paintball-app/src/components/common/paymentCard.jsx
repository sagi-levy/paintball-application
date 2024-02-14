// PaymentCard.js
import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  Navigate,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import PageHeader from "./pageHeader";
import { updateActivityCardToPaidTrue } from "../../services/cardsServices";
import useActivityCard from "../../hooks/useActivityCard";
import { useAppContext } from "../../context/card.context";
import queryString from "query-string"; // Import query-string library

const PaymentCard = ({ amountToCharge = 20 }) => {
  const location = useLocation();

  const queryParams = queryString.parse(location.search);
  const { cardId } = queryParams;
  const { myProp } = useAppContext();
  const navigate = useNavigate();

  const { id } = useParams();
  console.log(id, myProp);
  useActivityCard(id, cardId);
  console.log(useActivityCard(id, cardId));
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet.
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        // You can customize billing details here if needed
      },
      amount: amountToCharge * 100, // Convert amount to cents (Stripe uses cents)
      currency: "usd", // Change to your desired currency
    });

    if (result.error) {
      console.error(result.error.message);
      await updateActivityCardToPaidTrue(id, myProp);
      navigate("/calendar");
    } else {
      // Send payment method ID and other details to your server for further processing
      console.log(result.paymentMethod.id);

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
