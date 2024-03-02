import { Link } from "react-router-dom";

const ActivityCardComponent = ({
  _id,
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
      <div className="col-md-4 col-12" key={_id} >
        <div className="row my-2">
          <div className="card">
            <div style={{ 
              height: "200px", 
              overflow: "hidden",
              '@media (max-width: 768px)': {
                height: "100px" 
              }
            }}>
              <img
                src={activityImage}
                className="card-img-top"
                alt={activityName}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
            <div className="card-body" style={{ 
              height: "80px",
              '@media (max-width: 768px)': {
                height: "80px" 
              }
            }}>
              <h4 className="card-title">activity name: {activityName}</h4>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                description: {activityDescription}
              </li>
              <li className="list-group-item">address: {activityAddress}</li>
              <li className="list-group-item">date: {activityDate}</li>
              <li className="list-group-item">
                contact name: {bizUserName}
              </li>
              <li className="list-group-item">phone number: {phoneNumber}</li>
            </ul>
            <div className="card-body justify-content-evenly mt-2 d-flex">
              <Link
                className="text-success alert alert-success alert-link"
                to={`/cards/edit-activity-cards/${phoneNumber}?cardId=${_id}`}
              >
                edit activity
              </Link>
              <Link
                className="font-weight-bold text-danger alert alert-primary"
                to={`/cards/delete-activity-cards/${phoneNumber}?cardId=${_id}`}
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
