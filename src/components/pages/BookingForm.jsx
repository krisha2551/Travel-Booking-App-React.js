import React from "react";
import { Container, Form, Button, Card } from "react-bootstrap";

const BookingForm = () => {
  return (
    <Container className="mt-5">
      <Card
        className="p-4 shadow-sm"
        style={{ maxWidth: "500px", margin: "auto" }}
      >
        <h4 className="mb-3">Complete Your Booking</h4>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="tel" required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Travel Date</Form.Label>
            <Form.Control type="date" required />
          </Form.Group>

          <Button variant="success" className="w-100">
            Confirm Booking
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default BookingForm;
