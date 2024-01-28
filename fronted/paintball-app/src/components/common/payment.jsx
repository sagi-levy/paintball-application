// PaymentForm.js
import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Navigate, useParams,useNavigate } from "react-router-dom";
import PageHeader from "./pageHeader";
import { updateActivityCardToPaidTrue } from "../../services/cardsServices";
import useActivityCard from "../../hooks/useActivityCard";
import { useAppContext } from "../../context/card.context";
const PaymentForm = () => {
  const { myProp } = useAppContext();
  const navigate = useNavigate();

  const { id, } = useParams();
  console.log(id,myProp);
  useActivityCard(id)
  console.log( useActivityCard(id))
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
    });

    if (result.error) {
      console.error(result.error.message);
      await updateActivityCardToPaidTrue(id,myProp);
      navigate("/calendar");
    } else {
      // Send payment method ID to your server for further processing
      console.log(result.paymentMethod.id);

      await updateActivityCardToPaidTrue(id,myProp);
      navigate("/calendar");
    }
  };

  return (
    <>
      <PageHeader title={<h1>woeuld you like to pay now?</h1>} />
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    </>
  );
};

export default PaymentForm;
