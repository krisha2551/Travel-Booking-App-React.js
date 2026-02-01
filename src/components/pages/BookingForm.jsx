import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { trips } from "../../data/TripsData";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";

const BookingForm = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const selectedTrip = trips.find((t) => t.id == Number(id));

  if (!selectedTrip) {
    return <h4 className="text-center mt-5">Trip Data not found</h4>;
  }

  const [formData, setFormData] = useState({
    name: user.displayName,
    email: user.email,
    phone: "",
    date: "",
    person: 1,
    total: selectedTrip.price,
  });

  const handleChange = async (identifier, e) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [identifier]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.phone && !formData.date) {
      alert("all form data is required");
      return;
    }

    await addDoc(collection(db, "booking"), {
      tripId: selectedTrip.id,
      tripName: selectedTrip.name,
      tripDestination: selectedTrip.destination,

      userId: user.uid,
      userName: formData.name,
      email: formData.email,
      phone: formData.phone,
      TravelDate: formData.date,
      person: formData.person,
      TotalAmount: formData.total,
      createdAt: serverTimestamp(),
    });

    alert("trip booked successfully");

    setFormData({
      phone: "",
      date: "",
      person: 1,
      total: selectedTrip.price,
    });
  };

  useEffect(() => {
    setFormData((prevData) => {
      return {
        ...prevData,
        total: prevData.person * selectedTrip.price,
      };
    });
  }, [formData.person, selectedTrip.price]);

  return (
    <>
      <Container>
        <Row>
          <Col md={5}>
            <Card className="text-center rounded-4 mt-5 shadow">
              <Card.Img
                variant="top"
                className="rounded-4"
                src={selectedTrip.image}
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{selectedTrip.name}</Card.Title>
                <Card.Text>{selectedTrip.duration}</Card.Text>
                <h5>₹{selectedTrip.price}</h5>
              </Card.Body>
            </Card>
          </Col>
          <Col md={7}>
            <Card className="mt-5">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-2">
                        <Form.Label>Traveler Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-2">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-2">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-2">
                        <Form.Label>Travel Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={formData.date}
                          onChange={(e) => handleChange("date", e)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-2">
                        <Form.Label>No of Person</Form.Label>
                        <Form.Control
                          type="number"
                          value={formData.person}
                          onChange={(e) => handleChange("person", e)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-2">
                        <Form.Label>Grand Total</Form.Label>
                        <Form.Control value={formData.total} readOnly />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-flex gap-3 mt-4">
                    <Button onClick={() => navigate(-1)}>Back to Trips</Button>
                    <Button variant="primary" type="submit">
                      Confirm Booking
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BookingForm;
