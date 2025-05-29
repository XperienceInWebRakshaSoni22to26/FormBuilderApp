import React, { useEffect, useState } from 'react';

const TemplateFormUrl = () => {
    const [formStructure, setFormStructure] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const formId = params.get("formId");

        if (formId) {
            const storedForm = localStorage.getItem(`savedForm_${formId}`);
            if (storedForm) {
                setFormStructure(JSON.parse(storedForm));
            } else {
                console.error("No form found in localStorage for this ID");
            }
        }
    }, []);

    const renderInputField = (field) => {
        const commonProps = {
            id: field.id,
            name: field.label.toLowerCase().replace(/\s+/g, '_'),
            placeholder: field.placeholder ? field.placeholder : '',
            required: field.required ? true : false,
            className: "w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        };

        switch (field.type) {
            case "text":
            case "email":
            case "file":
                return <input type = { field.type } {...commonProps }
                />;
            case "textarea":
                return <textarea {...commonProps }
                rows = { 4 }
                />;
            case "select":
                return ( <
                        select {...commonProps } >
                        <
                        option value = "" > Select an option < /option> {
                        (field.options && field.options.length > 0) &&
                        field.options.map((opt, idx) => ( <
                            option key = { idx }
                            value = { opt.value } > { opt.label } < /option>
                        ))
                    } <
                    /select>
        );
        case "checkbox":
            return ( <
                input type = "checkbox"
                id = { field.id }
                name = { field.label.toLowerCase().replace(/\s+/g, '_') }
                />
            );
        default:
            return <input type = "text" {...commonProps }
            />;
    }
};

const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Form submitted (demo)");
};

if (!formStructure) return <div className = "text-center p-6" > ⏳Loading form... < /div>;

return ( <
    div className = "max-w-3xl mx-auto mt-10 px-4" >
    <
    h2 className = "text-2xl font-bold mb-6 text-blue-700" > Please fill this form < /h2> <
    form onSubmit = { handleSubmit }
    className = "space-y-6" > {
        formStructure.map((field) => ( <
                div key = { field.id }
                className = "flex flex-col" >
                <
                label htmlFor = { field.id }
                className = "mb-1 font-medium text-gray-700" > { field.label } {
                    field.required ? < span className = "text-red-500" > * < /span> : null} < /
                    label > { renderInputField(field) } <
                        /div>
                ))
        } <
        button
        type = "submit"
        className = "bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded" >
        Submit <
        /button> < /
        form > <
        /div>
    );
};

export default TemplateFormUrl;