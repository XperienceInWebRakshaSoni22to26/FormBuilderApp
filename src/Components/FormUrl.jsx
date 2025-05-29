import React, { useContext, useEffect } from "react";
import { formcontext } from "../Context/CreateContext";

const FormUrl = () => {
    const {
        fields,
        currentStep,
        nextStep,
        prevStep,
        formData,
        setFormData,
        submitted,
        setSubmitted
    } = useContext(formcontext);

    const maxStep = fields.length > 0 ? Math.max(...fields.map(f => Number(f.step))) : 1;

    useEffect(() => {
        console.log("🧹 Fields loaded or changed:", fields);
        console.log("📍 Current Step:", currentStep);
        console.log("🧼 Max Step calculated:", maxStep);
    }, [fields, currentStep, maxStep]);

    if (!fields || fields.length === 0) {
        console.log("⚠️ No form data available!");
        return <div > No form data available. < /div>;
    }

    const stepFields = fields.filter(field => Number(field.step) === Number(currentStep));
    console.log(`🔎 Fields for current step (${currentStep}):`, stepFields);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`✏️ Input Changed - Field: ${name}, New Value: ${value}`);
        setFormData(prev => {
            const newFormData = {...prev, [name]: value };
            console.log("🗃️ Updated formData:", newFormData);
            return newFormData;
        });
    };

    const validateStep = () => {
        let valid = true;
        console.log(`🧪 Validating step ${currentStep}...`);
        stepFields.forEach(field => {
            if (field.required && !formData[field.id]) {
                valid = false;
                alert(`${field.label} is required`);
                console.log(`❌ Validation failed: ${field.label} is required but empty`);
            }
        });
        console.log(`✅ Validation result for step ${currentStep}: ${valid}`);
        return valid;
    };

    const handleNext = () => {
        console.log("➡️ Next button clicked. Current step before next:", currentStep);
        if (validateStep()) {
            if (currentStep < maxStep) {
                nextStep();
                console.log("➡️ Moving to next step...");
            } else {
                console.log("🏁 Already at last step, no further next step.");
            }
        } else {
            console.log("⛔ Next step blocked due to validation failure.");
        }
    };

    const handlePrev = () => {
        console.log("⬅️ Previous button clicked. Current step before prev:", currentStep);
        if (currentStep > 1) {
            prevStep();
            console.log("⬅️ Moving to previous step...");
        } else {
            console.log("⛔ Already at first step, cannot go back further.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("📝 Submit button clicked at step:", currentStep);
        if (!validateStep()) {
            console.log("⛔ Submit blocked due to validation failure.");
            return;
        }
        setSubmitted(true);
        console.log("🎉 Form successfully submitted with data:", formData);
        alert("Form submitted!");
    };

    if (submitted) {
        console.log("🎉 Form submission complete. Rendering thank you message.");
        return ( <
            div className = "text-green-600 font-semibold mt-10 text-center" >
            Thanks
            for submitting!
            <
            /div>
        );
    }

    return ( <
        div className = "max-w-3xl mx-auto p-6 mt-10 bg-white rounded shadow" >
        <
        h2 className = "text-2xl font-bold mb-6 text-center" > Fill the Form < /h2> <
        form className = "space-y-6"
        onSubmit = { handleSubmit } > {
            stepFields.length === 0 && ( <
                div className = "text-red-500 font-semibold" >
                No fields found
                for step { currentStep } <
                /div>
            )
        } {
            stepFields.map(field => ( <
                div key = { field.id } >
                <
                label className = "block font-medium mb-1" > { field.label } {
                    field.required && < span className = "text-red-500" > * < /span>} < /
                    label > {
                        field.type === "textarea" ? ( <
                            textarea name = { field.id }
                            placeholder = { field.placeholder }
                            value = { formData[field.id] || "" }
                            onChange = { handleInputChange }
                            required = { field.required }
                            className = "w-full border border-gray-300 rounded px-3 py-2" /
                            >
                        ) : field.type === "select" ? ( <
                                select name = { field.id }
                                value = { formData[field.id] || "" }
                                onChange = { handleInputChange }
                                required = { field.required }
                                className = "w-full border border-gray-300 rounded px-3 py-2" >
                                <
                                option value = "" > Select an option < /option> {
                                field.options &&
                                field.options.map(opt => ( <
                                    option key = { opt.value }
                                    value = { opt.value } > { opt.label } <
                                    /option>
                                ))
                            } <
                            /select>
                    ): ( <
                        input type = { field.type }
                        name = { field.id }
                        value = { formData[field.id] || "" }
                        onChange = { handleInputChange }
                        placeholder = { field.placeholder }
                        required = { field.required }
                        className = "w-full border border-gray-300 rounded px-3 py-2" /
                        >
                    )
                } <
                /div>
            ))
        }

        <
        div className = "flex justify-between" >
        <
        button type = "button"
        disabled = { currentStep === 1 }
        onClick = { handlePrev }
        className = "bg-gray-300 px-4 py-2 rounded disabled:opacity-50" >
        Previous <
        /button>

        {
            currentStep < maxStep ? ( <
                button type = "button"
                onClick = { handleNext }
                className = "bg-blue-500 text-white px-4 py-2 rounded" >
                Next <
                /button>
            ) : ( <
                button type = "submit"
                className = "bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700" >
                Submit <
                /button>
            )
        } <
        /div> < /
        form > <
        /div>
    );
};

export default FormUrl;