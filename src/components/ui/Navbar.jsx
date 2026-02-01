import { useContext } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";

function NavbarMenu() {
  const { user } = useContext(AuthContext);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Travelia</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="trips">
              Trips
            </Nav.Link>
            <Nav.Link href="#link">Destinations</Nav.Link>
            <Nav.Link href="#link">About</Nav.Link>

            {!user ? (
              <Nav.Link as={NavLink} to="/auth">
                Login
              </Nav.Link>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/myBooking" className="me-2">
                  My Bookings
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMenu;
