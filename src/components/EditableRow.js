import React from 'react';
import { Navbar } from 'react-bootstrap';


const EditableRow = ({editFormData,handleEditFormChange}) => {
    return (

        // <tr>
        //     <td>
        //         <input type="text"
        //             required="required"
        //             placeholder='enter a value'
        //             name='courseName'
        //         >
        //         </input>
        //     </td>
        // </tr>

        <tr>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder='add a value?'
                    name="courseId"
                    hidden
                >
                </input>
            </td>
            <td>
                <input
                    type="text"
                    required="required"
                    placeholder='add a value?'
                    name="courseName"
                    value={editFormData.courseName}
                    onChange={handleEditFormChange}
                >
                </input>
            </td>

        </tr>

    );
}

export default EditableRow;