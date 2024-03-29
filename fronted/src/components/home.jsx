import { useEffect, useState } from "react";
import PageHeader from "./common/pageHeader";
import CreateActivityCard from "./createActivityCard";
import { Link } from "react-router-dom";
import SendUsMailComp from "./common/sendUsMailComp";
const Home = () => {
  const [showCallUs, setShowCallUs] = useState(false);

  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    const storedVisitCount = localStorage.getItem("visitCount");
    const parsedVisitCount = parseInt(storedVisitCount);

    if (!isNaN(parsedVisitCount)) {
      setVisitCount(parsedVisitCount);
    }

    setVisitCount(visitCount + 1);
    localStorage.setItem("visitCount", visitCount + 1);

    if ((visitCount + 1) % 5 === 0) {
      setShowCallUs(true);
    }
  }, []);
  const handleDeleteClick = () => {
    setShowCallUs(false);
  };
  return (
    <>
      {showCallUs && (
        <div
          className="call-us-card z-3Z position-absolute w-sm-100"
          style={{ width: "30%", background: "rgba(111,111,111,0.3)" }}
        >
          <button className="delete-button" onClick={handleDeleteClick}>
            <i classNames="bi bi-x-lg">X</i>
          </button>
          <p>Call Us: 123-456-7890</p>
          <SendUsMailComp />
        </div>
      )}

      <div className="d-inline coxntainer mr-0" style={{ marginRight: "0" }}>
        <div
          id="carouselExampleIndicators"
          className="carousel slide mb-4 "
          data-bs-ride="true"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                id="carousel-img"
                src="https://cdn.pixabay.com/photo/2017/07/09/03/37/paintball-2486109_960_720.jpg"
                className="d-block w-100"
                alt="..."
              />{" "}
              <div className="carousel-caption">
                <div className="page-header-on-carousel">
                  {" "}
                  <PageHeader
                    title={
                      <h1 className="mb-lg-5 mb-sm-0"> Paintball Israel</h1>
                    }
                  />
                  <h3 className="text-d-sm-none">
                    Hello and welcome to the home page of the Paintball Israel
                    website. You can create your future activity in the form
                    under. In order to edit and make changes you will need to
                    sign in to the website. Pay attention, your activity will
                    get into the calendar only after paying.
                  </h3>{" "}
                </div>

                <Link
                  to={"/paintball-page"}
                  className="text-decoration-none  p-2 rounded"
                >
                  {" "}
                  <h1 id="carousel-p-tag">paintball</h1>
                </Link>
                <p
                  id="carousel-p-tag"
                  className="text-decoration-none   rounded"
                >
                  paintball prices and terms
                </p>
              </div>
            </div>

            <div className="carousel-item">
              <img
                id="carousel-img"
                src="https://media.istockphoto.com/id/1281185274/photo/laser-tag-tactical-game-just-for-fun-forces-mission-science-fiction-playing-in-red-light.jpg?b=1&s=170667a&w=0&k=20&c=RqTQ9tfv5zYgcfxDazHcZrSyasj11mB_GyQKlxakKVk="
                className="d-block w-100"
                alt="..."
              />{" "}
              <div className="carousel-caption">
                <div className="page-header-on-carousel">
                  {" "}
                  <PageHeader
                    title={
                      <h1 className="mb-lg-5 mb-sm-0"> Paintball Israel</h1>
                    }
                  />
                  <h3 className="text-d-sm-none">
                    Hello and welcome to the home page of the Paintball Israel
                    website. In order to get more details, watch a video of
                    activities and proceed to determine the date of the
                    activity, you must sign in to the website. in order to
                    create activities, sign in as admin
                  </h3>{" "}
                </div>

                <Link
                  to={"/laser-tag-page"}
                  className="text-decoration-none  p-2 rounded"
                >
                  {" "}
                  <h1 id="carousel-p-tag">laser tag</h1>
                </Link>
                <p
                  id="carousel-p-tag"
                  className="text-decoration-none   rounded"
                >
                  laser tag prices and terms
                </p>
              </div>
            </div>
            <div className="carousel-item ">
              <img
                id="carousel-img"
                src="https://cdn.pixabay.com/photo/2015/12/07/10/24/go-kart-1080492_1280.jpg"
                className="d-block w-100"
                alt="..."
              />{" "}
              <div className="carousel-caption">
                <div className="page-header-on-carousel">
                  {" "}
                  <PageHeader
                    title={
                      <h1 className="mb-lg-5 mb-sm-0"> Paintball Israel</h1>
                    }
                  />
                  <h3 className="text-d-sm-none">
                    Hello and welcome to the home page of the Paintball Israel
                    website. In order to get more details, watch a video of
                    activities and proceed to determine the date of the
                    activity, you must sign in to the website. in order to
                    create activities, sign in as admin
                  </h3>{" "}
                </div>

                <Link
                  to={"/karting-page"}
                  className="text-decoration-none  p-2 rounded"
                >
                  {" "}
                  <h1 id="carousel-p-tag">karting</h1>
                </Link>
                <p
                  id="carousel-p-tag"
                  className="text-decoration-none   rounded"
                >
                  karting prices and terms
                </p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div id="container-image-and-form" className="container">
          <div className="row" id="row-image-and-form">
            <div className="col-lg-7 col-sm-12 ">
              <CreateActivityCard />
            </div>
            <div className="col-lg-5 col-sm-12 ">
              <img
                id="paintball-player-img"
                src="https://cdn.pixabay.com/photo/2014/04/02/16/27/paintball-307322_640.png"
                alt=""
                srcset=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
