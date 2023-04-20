import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useUpdatePasswordMutation, useUpdateUserMutation } from "../services/appApi";
import "./UserEdit.css";
import { Modal } from "antd";

function EditUser() {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [mobile, setMobile] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const navigate = useNavigate();
  const [updateUser, { isError, error, isLoading, isSuccess }] =
    useUpdateUserMutation();
  const [updatePassword] = useUpdatePasswordMutation();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = (e) => {
    e.preventDefault()
    if(password == ''|| rePassword == '') {
      alert("can't be blank")
    } else
    if(password!==rePassword) {
      alert('re-password is not match')
    } else {
      updatePassword({id, password}).then(() => {
        setIsModalOpen(false);
      })

    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setName(user.name);
    setAge(user.age);
    setLocation(user.location);
    setMobile(user.mobile);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    updateUser({ id, name, age, location, mobile }).then(() => {
      setTimeout(() => {
        navigate("/");
      }, 1500);
    });
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
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                placeholder="Age"
                value={age}
                required
                onChange={(e) => setAge(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>mobile</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter mobile"
                value={mobile}
                required
                onChange={(e) => setMobile(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Button type="submit" disabled={isLoading || isSuccess}>
                Update User
              </Button>
            </Form.Group>
          </Form>
          <Button type="primary" onClick={showModal}>
            Change Password
          </Button>
          <Modal
            title="Password Change"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form>
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
            </Form>
          </Modal>
        </Col>
        <Col md={6} className="new-user__image--container"></Col>
      </Row>
    </Container>
  );
}

export default EditUser;
