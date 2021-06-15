import React from "react";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import Navigation from "./partial_components/Navigation";
import Employees from "./Employees/Employees";
import Schedule from "./Schedule/Schedule";
import Scheduler from "./Scheduler/Scheduler";

function App() {
  return (
    <>
      <Container>
        <Navigation />

        <Switch>
          <Route exact path="/" component={Schedule} />

          <Route exact path="/scheduler" component={Scheduler} />

          <Route exact path="/employees" component={Employees} />
        </Switch>
      </Container>
    </>
  );
}

export default App;
