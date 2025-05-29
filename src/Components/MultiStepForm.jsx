import React, { useContext } from 'react';
import { formcontext } from '../Context/CreateContext';

const MultiStepForm = () => {
    const {
        fields,
        formData,
        setFormData,
        stepCount,
        currentStep,
        nextStep,
        prevStep,
    } = useContext(formcontext);

    // ✅ Use field.id instead of field.name
    const handleChange = (e, fieldId) => {
        setFormData(prev => ({
            ...prev,
            [fieldId]: e.target.value,
        }));
    };

    // ✅ Validate current step required fields
    const validateStep = () => {
        const currentStepFields = fields.filter(field => field.step === currentStep);
        let valid = true;

        currentStepFields.forEach(field => {
            if (field.required && !formData[field.id]) {
                alert(`${field.label} is required`);
                valid = false;
            }
        });

        return valid;
    };

    const handleNext = () => {
        if (validateStep()) nextStep();
    };

    const handlePrevious = () => {
        prevStep();
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // ✅ Prevent page reload
        if (!validateStep()) return;
        console.log('📝 MultiStepForm Submission:', formData);
        alert('Form Submitted!');
    };

    // Fields filtered by current step
    const currentStepFields = fields.filter(field => field.step === currentStep);

    return ( <
        div className = "max-w-lg mx-auto mt-8" >
        <
        h2 className = "text-2xl font-semibold mb-4" >
        Step { currentStep }
        of { stepCount } <
        /h2>

        <
        form className = "space-y-4" > {
            currentStepFields.length === 0 ? ( <
                p className = "text-gray-500" > No fields in this step. < /p>
            ) : (
                currentStepFields.map((field, idx) => ( <
                    div key = { field.id || idx }
                    className = "mb-4" >
                    <
                    label className = "block mb-2 text-sm font-medium text-gray-700" > { field.label } <
                    /label> <
                    input type = { field.type }
                    placeholder = { field.placeholder }
                    value = { formData[field.id] || '' }
                    onChange = { e => handleChange(e, field.id) }
                    className = "w-full p-2 border border-gray-300 rounded" /
                    >
                    <
                    /div>
                ))
            )
        }

        <
        div className = "flex justify-between mt-6" > {
            currentStep > 1 && ( <
                button type = "button"
                onClick = { handlePrevious }
                className = "bg-gray-400 text-white px-4 py-2 rounded" >
                Previous <
                /button>
            )
        }

        {
            currentStep < stepCount ? ( <
                button type = "button"
                onClick = { handleNext }
                className = "bg-blue-500 text-white px-4 py-2 rounded" >
                Next <
                /button>
            ) : ( <
                button type = "submit"
                onClick = { handleSubmit }
                className = "bg-green-500 text-white px-4 py-2 rounded" >
                Submit MultiStepForm <
                /button>
            )
        } <
        /div> < /
        form > <
        /div>
    );
};

export default MultiStepForm;