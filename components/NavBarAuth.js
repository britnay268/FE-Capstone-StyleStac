/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { signOut } from '../utils/auth';

export default function NavBarAuth() {
  const router = useRouter();

  const handleChange = async () => {
    await router.push('/');
    signOut();
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>StyleStac</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/hairstyles">
              <Nav.Link>All Hairstyles</Nav.Link>
            </Link>
            <Link passHref href="/myhairstyles">
              <Nav.Link>My Hairstyles</Nav.Link>
            </Link>
            <Link passHref href="/hairstyle/new">
              <Nav.Link>Create Hairstyles</Nav.Link>
            </Link>
            <Link passHref href="/favoriteHairstyle">
              <Nav.Link>Favorite Hairstyles</Nav.Link>
            </Link>
            <Button variant="danger" onClick={handleChange}>Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
