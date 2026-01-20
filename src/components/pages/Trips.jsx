import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { trips } from "../../data/TripsData";
import { useNavigate } from "react-router-dom";

const TripsData = () => {
  const navigate = useNavigate();

  return (
    <Container className="py-4">
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {trips.map((t) => (
          <Col key={t.id}>
            <Card className="h-100 shadow-sm trip-card border-0">
              <div className="overflow-hidden">
                <Card.Img
                  src={t.image}
                  alt={t.name}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                  }}
                  className="trip-image"
                />
              </div>

              <Card.Body className="d-flex flex-column text-center">
                <Card.Title className="fw-semibold mb-3">{t.name}</Card.Title>

                <Button
                  variant="outline-primary"
                  className="mt-auto"
                  onClick={() => navigate(`/trips/${t.id}`)}
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TripsData;
