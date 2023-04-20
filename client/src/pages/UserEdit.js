import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useUpdateUserMutation } from "../services/appApi";
import "./UserEdit.css"

function EditUser() {
  const user = useSelector((state) => state.user);
  const {id} = useParams()
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const navigate = useNavigate()
  const [updateUser, { isError, error, isLoading, isSuccess }] =
    useUpdateUserMutation();

  useEffect(() => {
    setName(user.name);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !password) {
      return alert("Please fill all the fields");
    } else if (password != rePassword) {
      return alert("Re-password don't match");
    } else {
      updateUser({id, name, password }).then(() => {
          setTimeout(() => {
            navigate("/");
          }, 1500);
      });
    }
  }

  return (
    <Container>
      <Row>
        <Col md={6} className="edit-user_form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <h1 className="mt-4">Edit Account </h1>
            <Form.Group className="mb-3">
              <Form.Label>User name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Re-enter password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Re-enter your password"
                required
                onChange={(e) => setRePassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Button type="submit" disabled={isLoading || isSuccess}>
                Update User
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={6} className="new-user__image--container"></Col>
      </Row>
    </Container>
  );
}

export default EditUser;
