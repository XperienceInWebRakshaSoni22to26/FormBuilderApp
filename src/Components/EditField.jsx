import React, { useContext, useState, useEffect } from 'react';
import { formcontext } from "../Context/CreateContext";

const EditField = () => {
    const { fields, setFields, selectedFieldId } = useContext(formcontext);

    // Find selected field object from fields array
    const field = fields.find(f => f.id === selectedFieldId);

    // Local states for editing form inputs
    const [label, setLabel] = useState('');
    const [placeholder, setPlaceholder] = useState('');
    const [required, setRequired] = useState(false);
    const [options, setOptions] = useState([]);

    // Update local state when selected field changes
    useEffect(() => {
        if (field) {
            console.log("EditField: selected field changed:", field);
            setLabel(field.label || '');
            setPlaceholder(field.placeholder || '');
            setRequired(field.required || false);
            setOptions(field.options || []);
        }
    }, [field]);

    // If no field selected, show message
    if (!field) return <div className = "p-4" > Please select a field to edit < /div>;

    // Function to update field in context state
    const updateField = (key, value) => {
        const updatedFields = fields.map(f =>
            f.id === field.id ? {...f, [key]: value } : f
        );
        setFields(updatedFields);
    };

    // Handle options input as comma-separated list
    const handleOptionsChange = (e) => {
        const opts = e.target.value.split(',').map(o => o.trim()).filter(o => o);
        setOptions(opts);
        updateField("options", opts.map(opt => ({ label: opt, value: opt.toLowerCase().replace(/\s+/g, '_') })));
    };

    return ( <
        div className = "p-4 border rounded bg-gray-50 dark:bg-gray-700" >
        <
        h2 className = "text-lg font-bold mb-4" > Edit Field: { field.type } < /h2>

        <
        label className = "block mb-1 font-medium" > Label < /label> <
        input type = "text"
        className = "w-full p-2 mb-4 border rounded"
        value = { label }
        onChange = {
            e => {
                setLabel(e.target.value);
                updateField("label", e.target.value);
            }
        }
        />

        {
            field.type !== "checkbox" && field.type !== "radio" && ( <
                >
                <
                label className = "block mb-1 font-medium" > Placeholder < /label> <
                input type = "text"
                className = "w-full p-2 mb-4 border rounded"
                value = { placeholder }
                onChange = {
                    e => {
                        setPlaceholder(e.target.value);
                        updateField("placeholder", e.target.value);
                    }
                }
                /> < / >
            )
        }

        <
        label className = "inline-flex items-center mb-4" >
        <
        input type = "checkbox"
        className = "mr-2"
        checked = { required }
        onChange = {
            e => {
                setRequired(e.target.checked);
                updateField("required", e.target.checked);
            }
        }
        />
        Required <
        /label>

        {
            (field.type === "select" || field.type === "radio") && ( <
                >
                <
                label className = "block mb-1 font-medium" > Options(comma separated) < /label> <
                input type = "text"
                className = "w-full p-2 mb-4 border rounded"
                value = { options.map(opt => opt.label).join(", ") }
                onChange = { handleOptionsChange }
                /> < / >
            )
        } <
        /div>
    );
};

export default EditField;