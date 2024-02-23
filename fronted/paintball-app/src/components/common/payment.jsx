import React from "react";
import PageHeader from "./pageHeader";
import PaymentCard from "./paymentCard";

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
