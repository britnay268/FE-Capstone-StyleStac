// import { Button } from 'react-bootstrap'; // TODO: COMMENT IN FOR AUTH
// import { signOut } from '../utils/auth'; // TODO: COMMENT IN FOR AUTH
import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH

function Home() {
  const { user } = useAuth();

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        // maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Welcome {user.displayName} to StyleStac! </h1>
      <h5 style={{ color: 'whitesmoke' }}>To get the most out of the app, we recommend watching this quick video below for a walkthrough of the features.</h5>
    </div>
  );
}

export default Home;
