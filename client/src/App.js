import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Employees from "./pages/Employees";
import Schedule from "./pages/Schedule";
import Scheduler from "./pages/Scheduler";

function App() {
  return (
    <Router>
      <Container>
        <Navigation />

        <Switch>
          <Route exact path="/" component={Schedule} />

          <Route exact path="/scheduler" component={Scheduler} />

          <Route exact path="/employees" component={Employees} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
