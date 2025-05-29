import BuiltFormTemplate from './BuiltFormTemplate'; // import 
import React, { useContext } from "react";
import AddField from "./AddField";
import SubmitButton from "./SubmitButton";
import DragAndDrop from "./DragAndDrop";
import EditField from "./EditField";
import FormPreview from "./FormPreview";
import MultiStepForm from './MultiStepForm';
import AddPageSelection from './AddPageSelection';
import StepManager from './StepManager'; // 👈 Ye naya component aap banayenge

import { formcontext } from "../Context/CreateContext";

const FormBuilder = () => {
    const { formType } = useContext(formcontext);

    return ( <
        div className = "min-h-screen bg-gray-100 p-4 overflow-x-hidden" >
        <
        div className = "max-w-7xl mx-auto bg-white rounded-xl shadow-xl p-6 md:p-8 w-full" >
        <
        h1 className = "text-2xl md:text-3xl font-bold text-center text-blue-700 mb-8" >
        Build Your Perfect Form— Drag, Drop, and Customize with Ease <
        /h1>

        { /* Step 1: Select Type */ } {
            !formType && ( <
                div className = "mb-6" >
                <
                AddPageSelection / > { /* Yahan add karo BuiltFormTemplate */ } <
                BuiltFormTemplate / >
                <
                /div>
            )
        }

        { /* Step 2: Multi-Step Input */ } {
            formType === 'multi' && ( <
                div className = "mb-6" >
                <
                h2 className = "text-2xl font-bold text-blue-600 mb-4 text-center" > 🧩Build Your Multi - Step Form Effortlessly <
                /h2> <
                MultiStepForm / >
                <
                /div>
            )
        }


        { /* Step 3: Main Builder */ } {
            formType && ( <
                >
                <
                div className = "mb-8" > { formType === 'multi' && < StepManager / > } <
                AddField / >
                <
                /div>

                <
                div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 w-full" >
                <
                div className = "bg-gray-50 p-4 rounded-lg shadow border overflow-hidden" >
                <
                h2 className = "text-center font-semibold text-gray-700 mb-2" > Drag & Drop < /h2> <
                DragAndDrop / >
                <
                /div>

                <
                div className = "bg-gray-50 p-4 rounded-lg shadow border overflow-hidden" >
                <
                h2 className = "text-center font-semibold text-gray-700 mb-2" > Edit Field(Double click to select) < /h2> <
                EditField / >
                <
                /div>

                <
                div className = "bg-gray-50 p-4 rounded-lg shadow border overflow-hidden" >
                <
                h2 className = "text-center font-semibold text-gray-700 mb-2" > Form Preview < /h2> <
                FormPreview / >
                <
                /div> < /
                div >

                <
                div className = "flex justify-end" >
                <
                SubmitButton / >
                <
                /div> < / >
            )
        } <
        /div> < /
        div >
    );
};
export default FormBuilder;