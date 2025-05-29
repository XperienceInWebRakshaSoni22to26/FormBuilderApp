import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FormBuilder from "./Components/FormBuilder";
import FormUrl from "./Components/FormUrl";
import TemplateFormUrl from "./Components/TemplateFormUrl"; // 👈 import this

const App = () => {
    return ( <
        Routes >
        <
        Route path = "/"
        element = { < FormBuilder / > }
        /> <
        Route path = "/form"
        element = { < FormUrl / > }
        /> <
        Route path = "/template-form"
        element = { < TemplateFormUrl / > }
        />  < /
        Routes >
    );
};

export default App;