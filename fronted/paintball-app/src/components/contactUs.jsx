import React, { useState } from "react";
import axios from "axios";
import SendUsMailComp from "./common/sendUsMailComp";

const EmailForm = () => {
  return (
    <div className="container pb-md-5 pb-sm-2" style={{ paddingTop: "70px" }}>
      <div className="row">
        <div className="col-lg-4 col-sm-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3376.0743465612113!2d34.92817806143306!3d32.20222727401768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d3914e6b729d1%3A0x8a445f34b3ea9675!2z16TXmdeZ16DXmNeR15XXnCDXmdep16jXkNecIHwg16TXmdeZ16DXmNeR15XXnCDXkdeZ16og15HXqNecIHwg15zXmdeZ15bXqCDXmNeQ15IgfCDXpNeZ15nXoNeY15HXldec!5e0!3m2!1siw!2sil!4v1706656447587!5m2!1siw!2sil"
            className="m-auto"
          ></iframe>{" "}
        </div>
        <div className="col-lg-4 col-sm-12 p-3">
          <SendUsMailComp />{" "}
        </div>
        <div className="col-lg-4 col-sm-12 m-auto " id="contact-us-icons">
          <div className="d-flex flex-column justify-content-center align-items-center p-3">
            <div>
              <h1>contact us</h1>{" "}
              <a href="tel:0779975649">
                <h3 className="badge bg-success  m-2">call us</h3>
              </a>
              <i className="bi bi-telephone-inbound"> </i>
            </div>
            <div>
              {" "}
              <a href="mailto:info@example.com">
                {" "}
                <h3 className="badge bg-success m-2">loremipsum@gmail.com</h3>
              </a>
              <i className="bi bi-envelope"></i>{" "}
            </div>
            <div>
              {" "}
              <a
                href="https://www.instagram.com/example/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <h3 className="badge bg-success m-2 ">Paintball-Israel</h3>
              </a>
              <i className="bi bi-instagram"></i>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailForm;
