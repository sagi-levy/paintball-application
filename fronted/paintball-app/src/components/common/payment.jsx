// PaymentForm.js
import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import PageHeader from "./pageHeader";
import PaymentCard from "./paymentCard";
import { updateActivityCardToPaidTrue } from "../../services/cardsServices";
import useActivityCard from "../../hooks/useActivityCard";
import { useAppContext } from "../../context/card.context";
const PaymentForm = () => {
  return (
    <>
      <PageHeader title={<h1 className="p-5">would you like to pay now?</h1>} />
      <div className="m-auto w-50 w-md-100 p-5">
        <PaymentCard />
      </div>
    </>
  );
};

export default PaymentForm;
