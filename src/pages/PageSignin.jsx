import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import UserModel from "../models/UserModel";
import { useNavigate } from "react-router-dom";
import userApi from "../api/userApi";

const PageSignin = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState(UserModel);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((values) => ({ ...values, [name]: value }));
  };

  const signIn = async () => {
    try {
      await userApi.signIn(user);
      //   kalo berhasil signIn bakal ngarahin ke halaman
      navigate("/kelas");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>App Manajemen Membership</Card.Title>
                <Form.Group className="mt-3 mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    value={user.email}
                    onChange={handleInput}
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <Form.Text className="text-muted">
                    Jangan pernah membagikan email kamu kepada siapapun!
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    value={user.password}
                    onChange={handleInput}
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button onClick={signIn} variant="primary">
                    Sign In
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PageSignin;