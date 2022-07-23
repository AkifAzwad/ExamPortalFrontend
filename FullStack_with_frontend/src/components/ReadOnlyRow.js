import React from 'react';
import { Navbar } from 'react-bootstrap';


const ReadOnlyRow = ({ course, handleEdit }) => {
    return (

        <tr>
            <td>{course.courseId}</td>
            <td>{course.courseName}</td>
            <td>
                <button type='button' onClick={(event) =>
                    handleEdit(event, course)}>Edit</button>
            </td>
        </tr>

    );
}

export default ReadOnlyRow;