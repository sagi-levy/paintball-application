import React from "react";
import { Link, useNavigate } from "react-router-dom";

function FooterMenu() {
  const navigate = useNavigate();

  const handleLinkClick = (link) => {
    navigate(link);
    window.scrollTo(0, 0); 
  };

  return (
    <footer
      className="text-center text-lg-start text-white footer-menu"
      style={{ backgroundColor: "#1c2331", position: "relative" }}
    >
      <section
        className="d-flex justify-content-between p-4"
        style={{ backgroundColor: "#212529" }}
      >
        <div className="me-5">
          <span>Get connected with us on social networks:</span>
        </div>
        <div style={{ zIndex: 2 }}>
          <a
            href="https://www.facebook.com/groups/399219820420340/?locale=he_IL"
            className="text-white me-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-facebook"></i>
          </a>
          <a
            href="https://www.instagram.com/paintball.israel/"
            className="text-white me-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-instagram text-light"></i>
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=972508639354&text=%D7%94%D7%99%D7%99%2C%20%D7%94%D7%92%D7%A2%D7%AA%D7%99%20%D7%93%D7%A8%D7%9A%20%D7%94%D7%90%D7%AA%D7%A8%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%9E%D7%95%D7%A2%20%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A0%D7%95%D7%A1%D7%A4%D7%99%D7%9D%20%D7%91%D7%A0%D7%95%D7%92%D7%A2%20%D7%9C%D7%A4%D7%A2%D7%99%D7%9C%D7%95%D7%AA%20%D7%A4%D7%99%D7%99%D7%A0%D7%98%D7%91%D7%95%D7%9C%20%F0%9F%99%82"
            className="text-white me-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-whatsapp"></i>
          </a>
          <a
            href="https://www.tiktok.com/tag/paintball"
            className="text-white me-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-tiktok"></i>
          </a>
        </div>
      </section>
      <section
        className="container text-center text-md-start mt-5 footer-content"
        style={{ zIndex: 2 }}
      >
        <div className="row mt-3">
          <FooterColumn
            title="Paintball Israel"
            content="The only place where you can be a kid again and spend energy in a variety of activities such as paintball, laser tag and karting"
          />
          <FooterColumn
            title="Activities"
            links={["paintball-page", "karting-page", "laser-tag-page"]}
            handleLinkClick={handleLinkClick}
          />
          <FooterColumn
            title="Navigation Menu"
            links={["about", "calendar", "send-email"]}
            handleLinkClick={handleLinkClick}
          />
          <FooterContactColumn />
        </div>
      </section>
    </footer>
  );
}

function FooterColumn({ title, content, links, handleLinkClick }) {
  return (
    <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
      <h6 className="text-uppercase fw-bold">{title}</h6>
      <hr
        className="mb-4 mt-0 d-inline-block mx-auto"
        style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }}
      />
      {content && <p className="text-light">{content}</p>}
      {links &&
        links.map((link, index) => (
          <p key={index}>
            {/* If link starts with "http", it's an external link */}
            {link.startsWith("http") ? (
              <a href={link} className="text-white" target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            ) : (
              <span className="text-white" onClick={() => handleLinkClick(link)}>
                {link}
              </span>
            )}
          </p>
        ))}
    </div>
  );
}

function FooterContactColumn() {
  return (
    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
      <h6 className="text-uppercase fw-bold">Contact</h6>
      <hr
        className="mb-4 mt-0 d-inline-block mx-auto"
        style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }}
      />
      <p className="text-light">
        <i className="bi bi-globe-americas"></i> Beit Berel, Kfar Sava
      </p>
      <p className="text-light">
        <i className="bi bi-envelope-at-fill"></i> info@example.com
      </p>
      <p className="text-light">
        <i className="bi bi-telephone-forward"></i> + 01 234 567 88
      </p>
      <p className="text-light">
        <i className="bi bi-telephone-outbound"></i> + 01 234 567 89
      </p>
    </div>
  );
}

export default FooterMenu;
