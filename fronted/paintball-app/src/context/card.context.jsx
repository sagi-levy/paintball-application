import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [myProp, setMyProp] = useState(null);
  const [tasksTimes, setTasksTimes] = useState([]);

  const setProp = (value) => {
    setMyProp(value);
  };
  const setTasksTimesAlreadyCatches = (value) => {
    setTasksTimes(value);
  };
  function isTimeInArray(inputTime, inputDate, tasksTimes) {
    return tasksTimes.some(
      (activity) =>
        activity.activityTime === inputTime &&
        activity.activityDate === inputDate
    );
  }

  const checkTimeValidity = (inputTime, inputDate, activitiesArray) => {
    if (isTimeInArray(inputTime, inputDate, activitiesArray)) {
      console.log("there is already activity in this time")
      return "there is already activity in this time";
    }
    return null;
  };

  return (
    <AppContext.Provider value={{ myProp, setProp, tasksTimes, setTasksTimesAlreadyCatches, isTimeInArray,
      checkTimeValidity}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};