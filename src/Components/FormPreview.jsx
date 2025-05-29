import React, { useContext, useState } from 'react';
import { formcontext } from '../Context/CreateContext';
import PreviewWrapper from "./PreviewWrapper";

const FormPreview = () => {
        const { fields, currentStep, setCurrentStep, formData, setFormData } = useContext(formcontext);
        const [errors, setErrors] = useState({});

        const stepFields = fields.filter(field => field.step === currentStep);

        let maxStep = 0;
        if (fields.length > 0) {
            maxStep = Math.max(...fields.map(f => f.step));
        }

        const validate = () => {
            const newErrors = {};
            stepFields.forEach(field => {
                const value = formData[field.id] || '';

                if (field.required && !value.toString().trim()) {
                    newErrors[field.id] = 'This field is required';
                }
                if (field.minLength && value.length < field.minLength) {
                    newErrors[field.id] = `Minimum length is ${field.minLength}`;
                }
                if (field.maxLength && value.length > field.maxLength) {
                    newErrors[field.id] = `Maximum length is ${field.maxLength}`;
                }
                if (field.pattern) {
                    const regex = new RegExp(field.pattern);
                    if (!regex.test(value)) {
                        newErrors[field.id] = 'Invalid format';
                    }
                }
            });
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };

        const handleChange = (id, value) => {
            setFormData(prev => ({...prev, [id]: value }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            if (validate()) {
                alert("Form preview is valid! Submitting...");
                // Final submit logic here
            } else {
                alert("Please fix errors before submitting.");
            }
        };

        return ( <
            PreviewWrapper >
            <
            div className = "border p-4 rounded shadow bg-white max-w-xl mx-auto" >
            <
            h2 className = "text-xl font-semibold mb-4 text-center" >
            Form Preview - Step { currentStep } <
            /h2>

            <
            form onSubmit = { handleSubmit } > {
                stepFields.map(field => ( <
                        div key = { field.id }
                        className = "mb-4" >
                        <
                        label className = "block font-medium mb-1" > { field.label } {
                            field.required && < span className = "text-red-500" > * < /span>} < /
                            label >

                                { /* Input type rendering */ } {
                                    field.type === 'text' && ( <
                                        input type = "text"
                                        placeholder = { field.placeholder || '' }
                                        value = { formData[field.id] || '' }
                                        onChange = { e => handleChange(field.id, e.target.value) }
                                        className = "border p-2 w-full rounded" /
                                        >
                                    )
                                }

                            {
                                field.type === 'textarea' && ( <
                                    textarea placeholder = { field.placeholder || '' }
                                    value = { formData[field.id] || '' }
                                    onChange = { e => handleChange(field.id, e.target.value) }
                                    className = "border p-2 w-full rounded" /
                                    >
                                )
                            }

                            {
                                field.type === 'email' && ( <
                                    input type = "email"
                                    placeholder = { field.placeholder || '' }
                                    value = { formData[field.id] || '' }
                                    onChange = { e => handleChange(field.id, e.target.value) }
                                    className = "border p-2 w-full rounded" /
                                    >
                                )
                            }

                            {
                                field.type === 'password' && ( <
                                    input type = "password"
                                    placeholder = { field.placeholder || '' }
                                    value = { formData[field.id] || '' }
                                    onChange = { e => handleChange(field.id, e.target.value) }
                                    className = "border p-2 w-full rounded" /
                                    >
                                )
                            }

                            {
                                field.type === 'tel' && ( <
                                    input type = "tel"
                                    placeholder = { field.placeholder || '' }
                                    value = { formData[field.id] || '' }
                                    onChange = { e => handleChange(field.id, e.target.value) }
                                    className = "border p-2 w-full rounded" /
                                    >
                                )
                            }

                            {
                                field.type === 'date' && ( <
                                    input type = "date"
                                    value = { formData[field.id] || '' }
                                    onChange = { e => handleChange(field.id, e.target.value) }
                                    className = "border p-2 w-full rounded" /
                                    >
                                )
                            }

                            {
                                field.type === 'checkbox' && ( <
                                    input type = "checkbox"
                                    checked = { formData[field.id] || false }
                                    onChange = { e => handleChange(field.id, e.target.checked) }
                                    className = "mr-2" /
                                    >
                                )
                            }

                            {
                                field.type === 'select' && ( <
                                    select value = { formData[field.id] || '' }
                                    onChange = { e => handleChange(field.id, e.target.value) }
                                    className = "border p-2 w-full rounded" >
                                    <
                                    option value = "" > Select an option < /option> <
                                    option value = "option1" > Option 1 < /option> <
                                    option value = "option2" > Option 2 < /option> < /
                                    select >
                                )
                            }

                            {
                                field.type === 'radio' && ( <
                                    div className = "space-y-1" >
                                    <
                                    label className = "mr-4" >
                                    <
                                    input type = "radio"
                                    name = { `radio-${field.id}` }
                                    value = "option1"
                                    checked = { formData[field.id] === 'option1' }
                                    onChange = { e => handleChange(field.id, e.target.value) }
                                    className = "mr-2" /
                                    >
                                    Option 1 <
                                    /label> <
                                    label >
                                    <
                                    input type = "radio"
                                    name = { `radio-${field.id}` }
                                    value = "option2"
                                    checked = { formData[field.id] === 'option2' }
                                    onChange = { e => handleChange(field.id, e.target.value) }
                                    className = "mr-2" /
                                    >
                                    Option 2 <
                                    /label> < /
                                    div >
                                )
                            }

                            {
                                errors[field.id] && ( <
                                    p className = "text-red-500 text-sm mt-1" > { errors[field.id] } < /p>
                                )
                            } <
                            /div>
                        ))
                }

                <
                div className = "flex justify-between mt-6" >
                <
                button
                type = "button"
                disabled = { currentStep === 1 }
                onClick = {
                    () => {
                        setErrors({});
                        setCurrentStep(currentStep - 1);
                    }
                }
                className = "bg-gray-300 px-4 py-2 rounded disabled:opacity-50" >
                Previous <
                /button>

                {
                    currentStep < maxStep ? ( <
                        button type = "button"
                        onClick = {
                            () => {
                                if (validate()) {
                                    setErrors({});
                                    setCurrentStep(currentStep + 1);
                                } else {
                                    alert("Please fix errors before continuing.");
                                }
                            }
                        }
                        className = "bg-blue-600 text-white px-4 py-2 rounded" >
                        Next <
                        /button>
                    ) : ( <
                        button type = "submit"
                        className = "bg-green-600 text-white px-6 py-2 rounded" >
                        Submit Preview <
                        /button>
                    )
                } <
                /div> < /
                form > <
                /div> < /
                PreviewWrapper >
            );
        };

        export default FormPreview;