import React, { useState } from "react";
import PageHeader from "../pageHeader";
import PaymentCard from "../paymentCard";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const BasicPackage = ({ packageData }) => {
  const [clickedPay, setClickedPay] = useState(false);
  const stripePromise = loadStripe(
    process.env.REACT_APP_LOAD_STRIPE_STRING
  );

  return (
    <div className="col-md-4 mb-4 ">
      <div className="card h-100 " id="basic-package-card">
        <div className="card-body ">
          <h5 className="card-title">{packageData.name}</h5>
          <p className="card-text">Price: {packageData.price}</p>
          <ul className=" list-group-flush p-0">
            {packageData.features.map((feature, i) => (
              <li key={i} className="list-group-item border-bottom mt-2">
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="card-footer text-center">
          <button
            onClick={() => setClickedPay((prev) => !prev)}
            className="btn btn-primary"
          >
            Book Now
          </button>

          {clickedPay ? (
            <Elements stripe={stripePromise}>
              <PaymentCard amountToCharge={packageData.price} />
            </Elements>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const BasicPackages = ({ packages }) => {
  return (
    <div className="row card-container">
      {packages.map((packageKind, index) => (
        <BasicPackage key={index} packageData={packageKind} />
      ))}
    </div>
  );
};

export default BasicPackages;
