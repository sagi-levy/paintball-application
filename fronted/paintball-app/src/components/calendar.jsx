import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../context/auth.context";
import { getUser } from "../services/userApiServices";
import ProtectedRoute from "../components/protectedRoute";
import EditActivityCard from "../components/editActivityCard";
import DeleteActivityCard from "./common/deleteActivityCard";
import { Link } from "react-router-dom";

const Calendar = () => {
  const { logIn, user } = useAuth();
  // console.log(user._id);
  //console.dir(localStorage.token);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [tasks, setTasks] = useState([]); // should get from server
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const fetchTasks = async () => {
    // console.log("process.env.REACT_APP_RENDER_API_URL: ",process.env.REACT_APP_RENDER_API_URL)
    // console.log(`process.env=${JSON.stringify(process.env,null,2)}`)
   
    try {
      const response = await fetch(
        `${process.env.REACT_APP_RENDER_API_URL}/api/tasks`,
        user
          ? {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.token,
              },
            }
          : null
      );
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      console.log(data)

      user ? setTasks(data.tasks) : setTasks(data); // when there is user (token) data gives me also user and also tasks in an object
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [currentWeek]);

  const getDaysInWeek = (week) => {
    const startOfWeek = new Date(week);
    startOfWeek.setDate(week.getDate() - week.getDay());
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  //console.log(tasks.filter((task)=>task.phoneNumber==user._id))
  //console.log(user._id);
  const renderCalendar = () => {
    const weekDays = getDaysInWeek(currentWeek);

    return (
      <table className="table table-bordered" >
        <thead>
          <tr>
            <th >
              <button
                className="btn btn-primary"
                onClick={() =>
                  setCurrentWeek(
                    new Date(currentWeek.setDate(currentWeek.getDate() - 7))
                  )
                }
              >
                Prev
              </button>
            </th>
            {weekDays.map((day, index) => (
              <th key={index}>{`${daysOfWeek[index]} ${day.getDate()}`}</th>
            ))}
            <th>
              <button 
                className="btn btn-primary"
                onClick={() =>
                  setCurrentWeek(
                    new Date(currentWeek.setDate(currentWeek.getDate() + 7))
                  )
                }
              >
                Next
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 24 }).map((_, hour) => (
            <tr key={hour}>
              <td>{`${hour}:00`}</td>
              {weekDays.map((day, index) => (
                <td key={index} style={{ width: "200px" }}>
                  <ul className="list-group ">
                    {tasks
                      .filter(
                        (task) =>
                          new Date(task.activityDate).toDateString() ===
                            day.toDateString() &&
                          new Date(
                            `2000-01-01T${task.activityTime}`
                          ).getHours() === hour &&
                          task.inCalendar === true
                      )
                      .sort(
                        (a, b) =>
                          new Date(a.activityDate) - new Date(b.activityDate)
                      )
                      .map((task, taskIndex) => (
                        <li
                          key={task._id}
                          className="list-group-item"
                          id="li-in-calendar"
                        >
                          <p className="text-light m-auto">
                            {" "}
                            {task.activityName} of {task.bizUserName}
                          </p>

                          <span className="text-light">
                            {" "}
                            paid?
                            {task.isPaid ? (
                              <i className="bi bi-check2"></i>
                            ) : (
                              <i className="bi bi-calendar2-x-fill"></i>
                            )}
                          </span>
                          {(user && user._id == task.phoneNumber) ||
                          (user && user.biz) ? (
                            <>
                              <ProtectedRoute
                                tasks={tasks}
                                id={user._id}
                                myTasks={tasks.filter(
                                  (task) => task.phoneNumber == user._id
                                )}
                              >
                                <Link
                                  style={{
                                    color: "blue",
                                    fontFamily: "cursive",
                                    justifyContent: "center",
                                  }}
                                  to={`/cards/edit-activity-cards/${task.phoneNumber}?cardId=${task._id}`}
                                >
                                  {" "}
                                  <i className="bi bi-pencil-fill"></i>
                                </Link>
                              </ProtectedRoute>
                              <ProtectedRoute
                                tasks={tasks}
                                id={user._id}
                                myTasks={tasks.filter(
                                  (task) => task.phoneNumber == user._id
                                )}
                              >
                                <Link
                                  style={{
                                    color: "red",
                                    fontFamily: "cursive",
                                    justifyContent: "center",
                                  }}
                                  to={`/cards/delete-activity-cards/${task.phoneNumber}?cardId=${task._id}`}
                                >
                                  {" "}
                                  <i className="bi bi-trash"></i>
                                </Link>
                              </ProtectedRoute>
                            </>
                          ) : null}
                        </li>
                      ))}
                  </ul>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  // console.log(tasks, tasks[0]);
  // console.log(new Date(tasks[0].activityDate).getHours());
  // console.log((tasks[0].time));
  return (
    <div className="container mt-4 pt-5">
    <h2>Calendar</h2>
    <div className="table-responsive">
     
        {renderCalendar()}
      
    </div>
  </div>
  );
};

export default Calendar;
