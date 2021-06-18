import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  InputGroup,
  ListGroup,
} from "react-bootstrap";

const Scheduler = () => {
  const [users, setUsers] = useState([]);
  const [schedulerForm, setSchedulerForm] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    axios
      .get("https://employee-scheduler-backend.herokuapp.com/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, [users.length]);

  const handleSchedulerForm = (e) => {
    const { name, value } = e.target;
    setSchedulerForm({ ...schedulerForm, [name]: value });
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const searchField = document.getElementById("search");

  const addUserForm = (firstName, lastName) => {
    setSchedulerForm([
      ...schedulerForm,
      {
        name: `${firstName} ${lastName}`,
        date: "",
        start_time: "",
        end_time: "",
      },
    ]);
    setSearchInput("");
    searchField.reset();
  };

  const deleteUser = (index) => {
    let form = [...schedulerForm];
    form.splice(index, 1);
    console.log(form);
    setSchedulerForm(form);
  };
  console.log(schedulerForm);

  let filteredUsers =
    users &&
    users.filter(
      (res) =>
        res.first_name.toLowerCase().indexOf(searchInput.toLowerCase()) !==
          -1 ||
        res.last_name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
    );

  return (
    <Container className="mt-3">
      <Col>
        <Form id="search">
          <Form.Label>Search Name</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <i className="fas fa-search"></i>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control onChange={handleSearchInput} />
          </InputGroup>
          <Form.Text muted>Type to search name</Form.Text>
        </Form>
      </Col>
      <Col>
        <ListGroup className="mt-3">
          {searchInput &&
            filteredUsers &&
            filteredUsers.map((res) => (
              <ListGroup.Item
                action
                onClick={() => addUserForm(res.first_name, res.last_name)}
                key={res.id}
              >
                {res.first_name + " " + res.last_name}
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Col>
      <div className="mt-5">
        {schedulerForm.map((newForm, i) => (
          <Form
            className="mt-3"
            onChange={(e) => handleSchedulerForm(e, i)}
            key={i}
          >
            <strong className="ml-5">{newForm.name}</strong>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control name="date" type="date" required />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group>
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control name="start_time" type="time" required />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>End Time</Form.Label>
                  <Form.Control name="end_time" type="time" required />
                </Form.Group>
              </Col>
              <Row className="align-items-center">
                <Col>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="removeFormBtn"
                    onClick={() => deleteUser(i)}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            </Row>
          </Form>
        ))}
      </div>

      {schedulerForm.length ? (
        <Row>
          <Col className="text-end">
            <Button className="mt-3" variant="secondary">
              Add Schedules
            </Button>
          </Col>
        </Row>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Scheduler;
