import React from 'react';
import { v4 as uuidv4 } from 'uuid'; // 👈 make sure you import this
import formTemplates from '../api/formTemplates';

const BuiltFormTemplate = ({ onSelectTemplate }) => {
    const templatesArray = Object.entries(formTemplates).map(([key, value]) => ({
        id: key,
        ...value,
    }));

    const renderInputField = (field) => {
        const commonProps = {
            id: field.id,
            name: field.label.toLowerCase().replace(/\s+/g, '_'),
            placeholder: field.placeholder || '',
            required: field.required || false,
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
                        field.options && field.options.map((opt, idx) => ( <
                            option key = { idx }
                            value = { opt.value } > { opt.label } < /option>
                        ))
                    } <
                    /select>
        );
        case "checkbox":
            return <input type = "checkbox"
            id = { field.id }
            name = { field.label.toLowerCase().replace(/\s+/g, '_') }
            />;
        default:
            return <input type = "text" {...commonProps }
            />;
    }
};

// 🔵 This is the function we'll use for "Use Template"
const handleUseTemplate = (template) => {
    const formId = `form_${uuidv4()}`;
    localStorage.setItem(`savedForm_${formId}`, JSON.stringify(template.fields));

    const shareableUrl = `${window.location.origin}/template-form?formId=${formId}`;

    navigator.clipboard.writeText(shareableUrl).then(() => {
        alert(`✅ Template saved!\n🔗 Shareable URL copied:\n${shareableUrl}`);
    });

    onSelectTemplate(template); // existing behavior
};

return ( <
    div className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6" > {
        templatesArray.map((template) => ( <
                div key = { template.id }
                className = "bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer flex flex-col" >
                <
                h3 className = "text-2xl font-semibold mb-4 text-blue-700 capitalize border-b border-blue-200 pb-2" > { template.id.replace(/([A-Z])/g, ' $1') } <
                /h3>

                <
                form className = "flex flex-col space-y-5 flex-1" > {
                    template.fields.map((field) => ( <
                            div key = { field.id }
                            className = "flex flex-col" >
                            <
                            label htmlFor = { field.id }
                            className = "mb-1 font-medium text-gray-700" > { field.label } {
                                field.required && < span className = "text-red-500" > * < /span>} < /
                                label > { renderInputField(field) } <
                                    /div>
                            ))
                    } <
                    /form>

                    <
                    button
                    onClick = {
                        () => handleUseTemplate(template)
                    }
                    className = "mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md shadow-md transition duration-300" >
                    Use Template <
                    /button> < /
                    div >
                ))
        } <
        /div>
    );
};

export default BuiltFormTemplate;