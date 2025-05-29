const formTemplates = {
    contactUs: {
        fields: [
            { id: "1", type: "text", label: "Name", required: true, placeholder: "Enter your name" },
            { id: "2", type: "email", label: "Email", required: true, placeholder: "Enter your email" },
            { id: "3", type: "textarea", label: "Message", required: true, placeholder: "Your message" }
        ]
    },
    feedback: {
        fields: [
            { id: "1", type: "text", label: "Name", required: false, placeholder: "Your name (optional)" },
            {
                id: "2",
                type: "select",
                label: "Rating",
                required: true,
                options: [
                    { label: "Excellent", value: "excellent" },
                    { label: "Good", value: "good" },
                    { label: "Fair", value: "fair" },
                    { label: "Poor", value: "poor" }
                ]
            },
            { id: "3", type: "textarea", label: "Comments", required: false, placeholder: "Additional comments" }
        ]
    },
    jobApplication: {
        fields: [
            { id: "1", type: "text", label: "Full Name", required: true, placeholder: "Enter your full name" },
            { id: "2", type: "email", label: "Email", required: true, placeholder: "Enter your email address" },
            { id: "3", type: "file", label: "Resume", required: true, placeholder: "" },
            { id: "4", type: "textarea", label: "Cover Letter", required: false, placeholder: "Write your cover letter" }
        ]
    },
    newsletterSignup: {
        fields: [
            { id: "1", type: "email", label: "Email Address", required: true, placeholder: "Enter your email" },
            { id: "2", type: "checkbox", label: "Subscribe to weekly newsletter", required: false, options: [] }
        ]
    }
};

export default formTemplates;