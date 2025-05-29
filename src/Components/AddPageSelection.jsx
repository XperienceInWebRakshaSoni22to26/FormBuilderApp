import React, { useContext } from 'react';
import { formcontext } from '../Context/CreateContext';

const AddPageSelection = () => {
    const { setFormType } = useContext(formcontext);

    return ( <
        div className = "text-center mt-8" >
        <
        h2 className = "text-xl font-semibold mb-4" > Choose Form Type < /h2> <
        div className = "flex justify-center gap-4" >
        <
        button onClick = {
            () => setFormType('single') }
        className = "bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700" >
        Single Page Form <
        /button> <
        button onClick = {
            () => setFormType('multi') }
        className = "bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700" >
        Multi Step Form <
        /button> <
        /div> <
        /div>
    );
};

export default AddPageSelection;