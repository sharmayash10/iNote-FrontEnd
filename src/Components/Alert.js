import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const Alert = (props) => {
    const context = useContext(NoteContext);
    const {alertBody} = context

    return (
        <div className={`alert alert-${alertBody.type} alert-dismissible fade show`} role="alert">
            {alertBody.message}
        </div>
    );
}

export default Alert;
