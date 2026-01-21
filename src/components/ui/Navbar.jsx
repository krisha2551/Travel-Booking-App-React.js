import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function NavbarMenu() {
  const { currentUser, logout } = useAuth();

  
  const userInitial = currentUser?.email?.charAt(0).toUpperCase();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Travelia</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-2">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/trips">
              Trips
            </Nav.Link>
            <Nav.Link href="#link">Destinations</Nav.Link>
            <Nav.Link href="#link">About</Nav.Link>

            {currentUser ? (
              <>
              
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    backgroundColor: "#6f42c1",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                  title={currentUser.email}
                >
                  {userInitial}
                </div>

                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={logout}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Nav.Link as={NavLink} to="/login">
                Sign In
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMenu;
