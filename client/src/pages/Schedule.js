import React from "react";
import { Jumbotron } from "react-bootstrap";
import Calendar from "../components/Calendar";

const Schedule = () => {
  // const [events, setEvents] = useState({});
  // const [users, setUsers] = useState(null);

  return (
    <Jumbotron className="mt-3">
      <Calendar className="mt-2"></Calendar>
    </Jumbotron>
  );
};

export default Schedule;
