/* eslint-disable @next/next/no-img-element */
// import { Button } from 'react-bootstrap'; // TODO: COMMENT IN FOR AUTH
// import { signOut } from '../utils/auth'; // TODO: COMMENT IN FOR AUTH
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        margin: '40px auto',
        backgroundColor: '#BC9E7A',
        borderRadius: '50px',
      }}
    >
      <img alt="StyleStac-logo" src="logo.png" className="home-image" />
      <h1 style={{ color: '#42331A' }}>Welcome {user.displayName} to StyleStac! </h1>
      {/* <h5 style={{ color: 'whitesmoke' }}>To get the most out of the app, we recommend watching this quick video below for a walkthrough of the features.</h5> */}
      <br />
      <h4 style={{ color: '#42331A' }}>Click the button below for a video walkthrough</h4>
      <Button className="walkthroughBtn"><a href="https://www.loom.com/share/7bab0ae418b648de8d9f7ebf9c1289fc?sid=514e1647-2b1e-455e-9e01-b05739969c1d" target="_blank" rel="noreferrer">Video Walkthrough</a></Button>
    </div>
  );
}

export default Home;
