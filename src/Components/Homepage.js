import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
    return (
        <>
            <h1 className='mb-3'>
                Hello, Welcome to the iNote.
            </h1>
            {localStorage.getItem('token') ? <h4 className='mx-3'>
                Please move to Notes section for seeing your notes
                </h4> : <h4 className='mx-3'>
                Please  <Link className='text-decoration-none text-info' to="/login">Login</Link> or <Link to="/signup" className='text-decoration-none text-info'>Signup</Link> to continue using iNote
                </h4>}
        </>
    );
}

export default Homepage;
