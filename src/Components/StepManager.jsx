import React, { useContext } from "react";
import { formcontext } from "../Context/CreateContext";

const StepManager = () => {
    const { currentStep, setCurrentStep, stepCount, setStepCount, addStep } = useContext(formcontext);

    const handleAddStep = () => {
        console.log("➡️ Add New Step clicked");
        addStep(); // ab yeh naye step ko add karega sahi tarah
    };

    const handleStepSelect = (e) => {
        const step = parseInt(e.target.value);
        if (!isNaN(step)) {
            setCurrentStep(step);
        }
    };

    return ( <
        div className = "mb-4 flex flex-wrap gap-4 items-center" >
        <
        label className = "text-gray-700 font-medium" > Select Step: < /label> <
        select value = { currentStep }
        onChange = { handleStepSelect }
        className = "border px-3 py-1 rounded" > {
            Array.from({ length: stepCount }, (_, i) => i + 1).map((step) => ( <
                option key = { step }
                value = { step } >
                Step { step } <
                /option>
            ))
        } <
        /select>

        <
        button onClick = { handleAddStep }
        className = "bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700" > ➕Add New Step <
        /button> < /
        div >
    );
};

export default StepManager;