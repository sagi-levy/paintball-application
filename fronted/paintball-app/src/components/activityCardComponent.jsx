import { Link } from "react-router-dom";

const ActivityCardComponent = ({
  user_id,
  isPaid,
  inCalendar,
  activityName,
  activityDescription,
  activityAddress,
  activityDate,
  phoneNumber,
  bizUserName,
  activityImage,
  activityTime,
}) => {
  return (
    <>
      <div className="col-md-4 col-12" key={user_id}>
        <div className="row my-2">
          <div className="card ">
            <img
              src={activityImage}
              className="card-img-top"
              alt={activityName}
            />
            <div className="card-body ">
              <h4 className="card-title">acivity name : {activityName}</h4>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                description : {activityDescription}
              </li>
              <li className="list-group-item">address: {activityAddress}</li>
              <li className="list-group-item">date {activityDate}</li>
              <li className="list-group-item">contact name: {bizUserName}</li>

              <li className="list-group-item">phone number :{phoneNumber}</li>
            </ul>
            <div className="card-body justify-content-evenly mt-2 d-flex">
              <Link
                className="text-success alert alert-success alert-link"
                to={`/cards/edit-activity-cards/${user_id}`}
              >
                edit activity
              </Link>
              <Link
                className="font-weight-bold text-danger alert alert-primary"
                to={`/cards/delete-activity-cards/${user_id}`}
              >
                delete activity
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ActivityCardComponent;
