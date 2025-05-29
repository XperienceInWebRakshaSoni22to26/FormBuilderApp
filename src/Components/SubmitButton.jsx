import React, { useContext } from 'react';
import { formcontext } from '../Context/CreateContext'; // Your context path may vary
import { v4 as uuidv4 } from 'uuid';


const SubmitButton = () => {
    const { fields, setSubmitted, formData } = useContext(formcontext);

    const handleSave = () => {
        if (!fields || fields.length === 0) {
            alert("❗ Please add at least one field before saving the form.");
            return;
        }

        const formId = `form_${uuidv4()}`;
        localStorage.setItem(`savedForm_${formId}`, JSON.stringify(fields));

        const shareableUrl = `${window.location.origin}/form?formId=${formId}`;

        navigator.clipboard.writeText(shareableUrl).then(() => {
            alert(`✅ Form saved!\n🔗 Shareable URL copied:\n${shareableUrl}`);
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all required fields across all steps before submit
        const requiredFields = fields.filter(f => f.required);
        let missingFields = requiredFields.filter(f => !formData[f.id]);

        if (missingFields.length > 0) {
            alert(`Please fill all required fields before submitting.`);
            console.log("Missing required fields:", missingFields);
            return;
        }

        setSubmitted(true);
        console.log("Form submitted with data:", formData);
        alert("Form created Successfully!!");
    };


    return ( < div className = "flex gap-4 mt-6 justify-center" >
        <
        button onClick = { handleSubmit }
        className = "bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-300 ease-in-out" >
        Create <
        /button> <
        button onClick = { handleSave }
        className = "bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-300 ease-in-out" >
        Copy Url <
        /button> < /
        div >

    );
};
export default SubmitButton;