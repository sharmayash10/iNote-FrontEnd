import React from 'react';
import { Link } from 'react-router-dom';
const About = () => {
  return (
    <>
      <h5>
        We provide secured way to store your notes. <Link className='text-decoration-none text-info' to="/signup">Create account</Link> and start using the iNote. You can edit, update, delete or create note on your account.
      </h5>
    </>
  );
}

export default About;
