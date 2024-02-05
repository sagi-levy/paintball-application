import React from "react";
import PageHeader from "../pageHeader";
import BasicPackages from "./basicPackages";
import ActivityDetails from "./activityDetails";
import SendUsMailComp from "../sendUsMailComp";
const LaserTagPage = () => {
  const paintballPackages = [
    {
      name: "Basic Package",
      price: "$20",
      features: ["Basic Marker", "50 Paintballs"],
    },
    {
      name: "Standard Package",
      price: "$35",
      features: ["Upgraded Marker", "100 Paintballs", "Safety Gear"],
    },
    {
      name: "Premium Package",
      price: "$50",
      features: ["Premium Marker", "200 Paintballs", "Safety Gear", "Snacks"],
    },
  ];

  return (
    <div className="container mt-5">
      {" "}
      <PageHeader
        title={<h1 className="text-center mb-4">Paintball Packages</h1>}
      />
      <BasicPackages packages={paintballPackages} />
      <div className="col-md-4 mb-4">
        <ActivityDetails
          title={"Who is it suitable for?"}
          description={
            "Anyone looking to party and combine adrenaline from the age of 8 or older and 135 cm tall."
          }
          icon={<i className="bi bi-geo bi-big ft-teams"></i>}
        />
        <ActivityDetails
          title={"where are we?"}
          description={
            "We are located in the center of the country in Beit Berel - about 10 minutes from Kfar Saba and the surrounding area and about 20 minutes from Tel Aviv and Gush Dan."
          }
          icon={<i className="bi bi-geo-alt bi-big"></i>}
        />
        <ActivityDetails
          title={"How does it happen in the field?"}
          description={
            "he goal is to create a group experience for you. We start with professional and safety training in driving on a track in a karting vehicle. We will understand how the ranking is done and how to win. Put on protective equipment and access vehicles. We will perform a competitive time trial at the end of which, of course, we will find out who drove the fastest of all. Think it's you? So come on, what are you waiting for?"
          }
          icon={<i className="bi bi-flag bi-big "></i>}
        />
      </div>
      <div>
        <h3>or send us mail</h3> <SendUsMailComp />
      </div>
    </div>
  );
};

export default LaserTagPage;
