import PageHeader from "./common/pageHeader";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAll } from "../services/cardsServices";
import ActivityCardComponent from "./activityCardComponent";
import { useAuth } from "../context/auth.context";

const MyActivityCards = () => {
  const { logIn, user } = useAuth();
  const [activityCardsList, setActivityCardsList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    const getActivityCards = async () => {
      const activityCards = await getAll();

      setActivityCardsList(activityCards.data.tasks);
      setFilteredData(activityCards.data.tasks);
    };

    getActivityCards();
    
  }, []);
  useEffect(() => {
    if (isFiltered) {
      const filteredResults = filteredData.filter(
        (activityCard) => activityCard.user_id === user._id
      );
      setFilteredData(filteredResults);
    } else {
      setFilteredData(activityCardsList);
    }
  }, [isFiltered]);
  const [searchValue, setSearchValue] = useState("");
  const toggleFilter = () => {
    setIsFiltered((prevState) => !prevState);
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (searchValue.length) {
      const searchedResult = activityCardsList.filter((activityCard) =>
        activityCard.bizUserName
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFilteredData(searchedResult);
    } else {
      setFilteredData(activityCardsList);
    }
  }, [searchValue]);

  return (
    <>
      <PageHeader title={<h1 className="m-lg-2 m-sm-5 pt-5">my activities cards</h1>} />
      <h2>here you can see all your booked paintball activities</h2>
      <input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Search by name..."
      />
      <input
        onClick={toggleFilter}
        className="form-check-input m-2"
        type="checkbox"
        value=""
        id="flexCheckChecked"
      />
      <label className="form-check-label" htmlFor="flexCheckChecked">
        show only my activities
      </label>
      <button className="btn btn-danger create-btn">
        <Link
          style={{
            color: "blue",
            fontFamily: "cursive",
            justifyContent: "center",
          }}
          to={"/cards/create-activity-card"}
        >
          {" "}
          create a card
        </Link>
      </button>
      <div className="container">
        <div className="row">
          {filteredData.length ? (
            filteredData.map((activityCard) => {
              return (
                <ActivityCardComponent
                user_id={activityCard.user_id}
                  _id={activityCard._id}
                  activityName={activityCard.activityName}
                  activityDescription={activityCard.activityDescription}
                  activityAddress={activityCard.activityAddress}
                  activityDate={activityCard.activityDate}
                  phoneNumber={activityCard.phoneNumber}
                  bizUserName={activityCard.bizUserName}
                  activityImage={activityCard.activityImage}
                  activityTime={activityCard.activityTime}
                  isPaid={activityCard.isPaid}
                  inCalendar={activityCard.inCalendar}
                />
              );
            })
          ) : (
            <span className="m-5">loading your cards...</span>
          )}{" "}
        </div>
      </div>
    </>
  );
};
export default MyActivityCards;
