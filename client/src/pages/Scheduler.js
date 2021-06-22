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
  const [fullName, setFullName] = useState([]);

  useEffect(() => {
    axios
      .get("https://employee-scheduler-backend.herokuapp.com/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, [users.length]);

  const handleSchedulerForm = (e, index) => {
    const { name, value } = e.target;
    const updatedForm = schedulerForm.map((schedule, i) => {
      if (
        value === "00" ||
        value === "1" ||
        value === "2" ||
        value === "3" ||
        value === "4" ||
        value === "5" ||
        value === "6" ||
        value === "7" ||
        value === "8" ||
        value === "9" ||
        value === "10" ||
        value === "11" ||
        value === "12" ||
        value === "15" ||
        value === "30" ||
        value === "45"
      ) {
        return {
          ...schedule,
          [name]: parseInt(value),
        };
      } else if (i !== index) {
        return schedule;
      } else {
        return {
          ...schedule,
          [name]: value,
        };
      }
    });
    setSchedulerForm(updatedForm);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    e.stopPropagation();
    axios
      .post(
        "https://employee-scheduler-backend.herokuapp.com/workdays",
        schedulerForm
      )
      .then((res) => {
        console.log(res);
        setSchedulerForm([]);
      })
      .catch((err) => console.log(err));
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const searchField = document.getElementById("search");

  const addUserForm = (firstName, lastName, id) => {
    setFullName([
      ...fullName,
      {
        name: `${firstName} ${lastName}`,
        user_id: id,
      },
    ]);
    setSchedulerForm([
      ...schedulerForm,
      {
        user_id: id,
        date: "",
        start_hour: "",
        start_min: "",
        start_am_or_pm: "",
        end_hour: "",
        end_min: "",
        end_am_or_pm: "",
      },
    ]);
    setSearchInput("");
    searchField.reset();
  };

  const deleteUser = (index) => {
    let form = [...schedulerForm];
    let names = [...fullName];
    form.splice(index, 1);
    names.splice(index, 1);

    setSchedulerForm(form);
    setFullName(names);
  };

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
                onClick={() =>
                  addUserForm(res.first_name, res.last_name, res.id)
                }
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
            id="scheduler-form"
            className="mt-3"
            onChange={(e) => handleSchedulerForm(e, i)}
            key={i}
          >
            <strong className="ml-5">{fullName[i].name}</strong>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control name="date" type="date" required />
                </Form.Group>
              </Col>

              <Col>
                <Form.Label>Start Time</Form.Label>
                <Form.Group className="row align-items-center">
                  <Form.Control
                    className="col"
                    name="start_hour"
                    as="select"
                    required
                    defaultValue="hour"
                    custom
                  >
                    <option disabled>hour</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                  </Form.Control>
                  :
                  <Form.Control
                    className="col"
                    name="start_min"
                    as="select"
                    required
                    defaultValue="min"
                    custom
                  >
                    <option disabled>min</option>
                    <option>00</option>
                    <option>15</option>
                    <option>30</option>
                    <option>45</option>
                  </Form.Control>
                  <Form.Control
                    className="col"
                    name="start_am_or_pm"
                    as="select"
                    required
                    custom
                    defaultValue="am or pm"
                  >
                    <option disabled>am or pm</option>
                    <option>am</option>
                    <option>pm</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col className="ml-2">
                <Form.Label>End Time</Form.Label>
                <Form.Group className="row align-items-center">
                  <Form.Control
                    className="col"
                    name="end_hour"
                    as="select"
                    required
                    defaultValue="hour"
                    custom
                  >
                    <option disabled>hour</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                  </Form.Control>
                  :
                  <Form.Control
                    className="col"
                    name="end_min"
                    as="select"
                    required
                    defaultValue="min"
                    custom
                  >
                    <option disabled>min</option>
                    <option>00</option>
                    <option>15</option>
                    <option>30</option>
                    <option>45</option>
                  </Form.Control>
                  <Form.Control
                    className="col"
                    name="end_am_or_pm"
                    as="select"
                    required
                    custom
                    defaultValue="am or pm"
                  >
                    <option disabled>am or pm</option>
                    <option>am</option>
                    <option>pm</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Row className="align-items-center">
                <Col>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    className="ml-4"
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
            <Button
              className="mt-3"
              variant="secondary"
              onClick={handleSubmitForm}
            >
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
