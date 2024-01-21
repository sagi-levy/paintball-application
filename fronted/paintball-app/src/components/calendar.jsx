import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Calendar = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [tasks, setTasks] = useState([]); // should get from server
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3003/api/tasks");

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();

      setTasks(data);
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
                          new Date(task.activityDate).toDateString() ===
                            day.toDateString() &&
                          new Date(task.activityDate).getHours() === hour //doesn't work
                      )
                      .sort(
                        (a, b) =>
                          new Date(a.activityDate) - new Date(b.activityDate)
                      )
                      .map((task, taskIndex) => (
                        <li key={taskIndex} className="list-group-item">
                          {task.activityName}
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
  console.log(tasks, tasks[0]);
  console.log(async () => await fetchTasks());

  return (
    <div className="container mt-4">
      <h2>Calendar</h2>
      {renderCalendar()}
    </div>
  );
};

export default Calendar;
