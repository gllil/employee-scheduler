import React from "react";
import { Nav } from "react-bootstrap";

const Navigation = () => {
  return (
    <Nav className="mt-3">
      <Nav.Item>
        <Nav.Link href="/" eventKey="home">
          Schedule
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/scheduler" eventKey="scheduler">
          Scheduler
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/employees" eventKey="employees">
          Employees
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Navigation;
