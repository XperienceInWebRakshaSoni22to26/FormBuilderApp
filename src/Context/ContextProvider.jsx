import React, { useState, useEffect } from 'react';
import { formcontext } from './CreateContext';
import { useSearchParams } from 'react-router-dom';

const ContextProvider = ({ children }) => {
    const [fields, setFields] = useState([]);
    const [selectedFieldId, setSelectedFieldId] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({});
    const [formType, setFormType] = useState(null);
    const [stepCount, setStepCount] = useState(1);

    const [searchParams] = useSearchParams();
    const formId = searchParams.get("formId") || "default";

    const [isInitialized, setIsInitialized] = useState(false);

    // Load saved fields and formData on mount or formId change
    useEffect(() => {
        console.log("🔄 [useEffect] formId changed:", formId);
        const savedFields = localStorage.getItem(`savedForm_${formId}`);
        const savedFormData = localStorage.getItem(`savedFormData_${formId}`);
        console.log("🔍 savedFields from localStorage:", savedFields);
        console.log("🔍 savedFormData from localStorage:", savedFormData);

        if (formId === "default") {
            // reset sab kuch
            setFields([]);
            setCurrentStep(1);
            setStepCount(1);
            setFormData({});
            setSubmitted(false);
            setIsInitialized(true);

        } else if (savedFields) {
            try {
                const parsedFields = JSON.parse(savedFields);
                setFields(parsedFields);

                // **Load formData from localStorage if present, else initialize empty**
                if (savedFormData) {
                    setFormData(JSON.parse(savedFormData));
                } else {
                    const initialFormData = {};
                    parsedFields.forEach(field => {
                        initialFormData[field.id] = '';
                    });
                    setFormData(initialFormData);
                }

                // Steps nikalna aur set karna
                const steps = [...new Set(parsedFields.map(f => f.step))].sort((a, b) => a - b);
                if (steps.length > 0) {
                    // **Set currentStep to last step to show last page loaded**
                    setCurrentStep(steps[0]); // first step dikhaega

                    setStepCount(Math.max(...steps));
                } else {
                    setCurrentStep(1);
                    setStepCount(1);
                }

                setSubmitted(false);
                setIsInitialized(true);

            } catch (error) {
                console.error("❌ Error parsing saved fields JSON:", error);
                setFields([]);
                setCurrentStep(1);
                setStepCount(1);
                setFormData({});
                setSubmitted(false);
                setIsInitialized(true);
            }
        } else {
            // agar saved form nahi mila
            setFields([]);
            setCurrentStep(1);
            setStepCount(1);
            setFormData({});
            setSubmitted(false);
            setIsInitialized(true);
        }
    }, [formId]);


    // Save fields and formData to localStorage whenever they change
    useEffect(() => {
        if (fields.length > 0) {
            localStorage.setItem(`savedForm_${formId}`, JSON.stringify(fields));
            localStorage.setItem(`savedFormData_${formId}`, JSON.stringify(formData));
            console.log("💾 Saved fields and formData to localStorage");
        }
    }, [fields, formData, formId]);


    // Validate currentStep & stepCount when fields change or currentStep changes
    useEffect(() => {
        const steps = Array.from({ length: stepCount }, (_, i) => i + 1);
        console.log("🔄 [useEffect fields] fields changed, steps:", steps, "currentStep:", currentStep, "stepCount:", stepCount);

        if (stepCount > 0) {
            if (currentStep < Math.min(...steps) || currentStep > Math.max(...steps)) {
                const fallback = steps[0];
                console.warn(`⚠️ currentStep ${currentStep} out of range, resetting to fallback step: ${fallback}`);
                setCurrentStep(fallback);
            }
        } else if (isInitialized) {
            console.warn("⚠️ No steps present, resetting to step 1");
            setStepCount(1);
            setCurrentStep(1);
        }
    }, [fields, currentStep, stepCount]);





    // Move to next step
    const nextStep = () => {
        const steps = [...new Set(fields.map(f => f.step))].sort((a, b) => a - b);
        const currentIndex = steps.indexOf(currentStep);

        if (currentIndex === -1) {
            if (steps.length > 0) setCurrentStep(steps[0]);
            return;
        }

        if (currentIndex < steps.length - 1) {
            setCurrentStep(steps[currentIndex + 1]);
        } else {
            console.log("🏁 Already at last step, ready to submit form.");
        }
    };

    // Move to previous step
    const prevStep = () => {
        const steps = [...new Set(fields.map(f => f.step))].sort((a, b) => a - b);
        const currentIndex = steps.indexOf(currentStep);

        if (currentIndex === -1) {
            if (steps.length > 0) setCurrentStep(steps[0]);
            return;
        }

        if (currentIndex > 0) {
            setCurrentStep(steps[currentIndex - 1]);
        } else {
            console.log("🔙 Already at first step.");
        }
    };

    // Jump to specific step if valid
    const goToStep = (step) => {
        const steps = [...new Set(fields.map(f => f.step))];
        if (steps.includes(step)) {
            setCurrentStep(step);
        } else {
            console.warn(`⚠️ Attempted to jump to invalid step: ${step}`);
        }
    };
    // Add a new step without adding default field
    // ✅ Corrected version
    const addStep = () => {
        setStepCount(prevCount => prevCount + 1);
        setCurrentStep(prevStep => prevStep + 1);
    };


    // Add a new field with the current step
    const createfield = (type) => {
        const timestamp = Date.now();
        const newField = {
            id: timestamp,
            label: `New ${type} field`,
            name: `${type}_${timestamp}`,
            type,
            required: false,
            placeholder: '',
            minLength: 0,
            maxLength: 100,
            pattern: '',
            step: currentStep,
        };
        setFields(prevFields => [...prevFields, newField]);
        console.log("🆕 Field created:", newField);
    };



    return ( <
        formcontext.Provider value = {
            {
                fields,
                setFields,
                createfield,
                selectedFieldId,
                setSelectedFieldId,
                currentStep,
                setCurrentStep,
                formData,
                setFormData,
                formType,
                setFormType,
                nextStep,
                prevStep,
                submitted,
                setSubmitted,
                stepCount,
                setStepCount,
                goToStep,
                addStep
            }
        } > { children } <
        /formcontext.Provider>
    );
};

export default ContextProvider;