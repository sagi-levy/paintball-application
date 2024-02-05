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
    "pk_test_51OXTK9FzIkHLxdyfqYLsI9aG4k28P6nhqV0o42t2vVBgD6j0UUBrinpOLAAS4l5tuJ3X9spREb83JyMUIyByhYew00dkMjUQlN"
  );

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">{packageData.name}</h5>
          <p className="card-text">Price: {packageData.price}</p>
          <ul className="list-group list-group-flush">
            {packageData.features.map((feature, i) => (
              <li key={i} className="list-group-item">
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
    <div className="row">
      {packages.map((packageKind, index) => (
        <BasicPackage key={index} packageData={packageKind} />
      ))}
    </div>
  );
};

export default BasicPackages;
