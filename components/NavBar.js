/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React, { useState } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { TiThMenuOutline } from 'react-icons/ti';
import { signOut } from '../utils/auth';

export default function NavBar() {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleChange = async () => {
    await router.push('/');
    signOut();
  };
  return (
    <div className={!collapsed ? 'backgroundNone' : 'backgroundWhite'}>
      <Button onClick={handleToggleSidebar} style={{ backgroundColor: 'rgba(66, 51, 26, 0.5)', border: 'none', color: '#B8A07F' }}>{!collapsed ? (<TiThMenuOutline onClick={handleToggleSidebar} />) : <span style={{ color: '#42331A' }}>⬅</span>}</Button>
      <div className={collapsed ? 'sidebar' : 'closed'}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            <img
              src="/Navbar-image.png"
              alt="StyleStac-logo"
              style={{
                width: '300px', height: '80px', margin: '10px auto', padding: '0px 10px',
              }}
            />
          </div>
          <div className={collapsed ? 'sidebar' : 'closed'}>
            <Link passHref href="/">
              <Nav.Link onClick={handleToggleSidebar}>Home</Nav.Link>
            </Link>
            <Link passHref href="/hairstyles">
              <Nav.Link onClick={handleToggleSidebar}>All Hairstyles</Nav.Link>
            </Link>
            <Link passHref href="/myhairstyles">
              <Nav.Link onClick={handleToggleSidebar}>My Hairstyles</Nav.Link>
            </Link>
            <Link passHref href="/hairstyle/new">
              <Nav.Link onClick={handleToggleSidebar}>Create Hairstyles</Nav.Link>
            </Link>
            <Link passHref href="/favoriteHairstyle">
              <Nav.Link onClick={handleToggleSidebar}>Favorite Hairstyles</Nav.Link>
            </Link>
            <hr style={{ padding: '0px 8px' }} />
            <Nav.Link />
            <Button variant="danger" onClick={handleChange}>Sign Out</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
