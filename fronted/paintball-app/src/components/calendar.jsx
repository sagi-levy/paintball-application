import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Calendar = ({ tasks }) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

  const renderCalendar = () => {
    const weekDays = getDaysInWeek(currentWeek);

    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>
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
                <td key={index}>
                  <ul className="list-group">
                    {tasks
                      .filter(
                        (task) =>
                          new Date(task.date).toDateString() ===
                          day.toDateString() /*&& new Date(task.time).getHours() === hour*/  //doesn't work
                      )
                      .sort((a, b) => new Date(a.time) - new Date(b.time))
                      .map((task, taskIndex) => (
                        <li key={taskIndex} className="list-group-item">
                          {task.title}
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
  console.log(tasks,tasks[0].time );

  return (
    <div className="container mt-4">
      <h2>Calendar</h2>
      {renderCalendar()}
    </div>
  );
};

export default Calendar;
