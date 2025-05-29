import React, { useContext } from 'react';
import { formcontext } from '../Context/CreateContext';

const AddField = () => {
    const { createfield } = useContext(formcontext);

    const buttonClasses = "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200";

    return ( <
        div className = "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" >
        <
        button onClick = {
            () => createfield("text")
        }
        className = { buttonClasses } > Text < /button> <
        button onClick = {
            () => createfield("textarea")
        }
        className = { buttonClasses } > Textarea < /button> <
        button onClick = {
            () => createfield("select")
        }
        className = { buttonClasses } > Dropdown < /button> <
        button onClick = {
            () => createfield("checkbox")
        }
        className = { buttonClasses } > Checkbox < /button> <
        button onClick = {
            () => createfield("radio")
        }
        className = { buttonClasses } > Radio Group < /button> <
        button onClick = {
            () => createfield("date")
        }
        className = { buttonClasses } > Date Picker < /button> <
        button onClick = {
            () => createfield("email")
        }
        className = { buttonClasses } > Email < /button> <
        button onClick = {
            () => createfield("tel")
        }
        className = { buttonClasses } > Phone Number < /button> <
        button onClick = {
            () => createfield("password")
        }
        className = { buttonClasses } > Password < /button> < /
        div >
    );
};

export default AddField;