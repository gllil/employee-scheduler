import React, { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import Calendar from "../partial_components/Calendar";

const Schedule = () => {
  const [view, setView] = useState("month");

  return (
    <Jumbotron className="mt-3">
      <Calendar className="mt-2" view={view}></Calendar>
    </Jumbotron>
  );
};

export default Schedule;
