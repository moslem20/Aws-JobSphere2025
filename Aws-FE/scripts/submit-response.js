// document.addEventListener('DOMContentLoaded', () => {
//     const submitButton = document.getElementById('submitAnswer');
//     const jobRoleInput = document.getElementById('jobRole');
//     const responseInput = document.getElementById('responseInput');
//     const errorMessage = document.getElementById('errorMessage');
//     const responseMessage = document.getElementById('responseMessage');

//     // Ensure elements exist before adding event listeners
//     if (!submitButton || !jobRoleInput || !responseInput || !errorMessage || !responseMessage) {
//         console.error("Some DOM elements are missing. Check your HTML structure.");
//         return;
//     }

//     submitButton.addEventListener('click', async () => {
//         // Clear previous messages
//         errorMessage.style.display = "none";
//         responseMessage.style.display = "none";

//         const jobRole = jobRoleInput.value.trim();
//         const responseText = responseInput.value.trim();

//         // Validate inputs
//         if (!jobRole || !responseText) {
//             errorMessage.textContent = "Please fill in all fields!";
//             errorMessage.style.display = "block";
//             return;
//         }

//         const requestBody = {
//             userId: "user_123", // Replace with dynamic user ID logic if needed
//             response: responseText,
//             jobRole: jobRole
//         };

//         try {
//             const response = await fetch('https://ldze6rg09i.execute-api.us-east-1.amazonaws.com/prod', {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(requestBody)
//             });

//             console.log("Response status:", response.status); // Log the response status
//             console.log("Response headers:", response.headers); // Log the response headers

//             // Check response status
//             if (!response.ok) {
//                 let errorResponse;
//                 try {
//                     errorResponse = await response.json();
//                 } catch {
//                     errorResponse = { error: "Unexpected server error." };
//                 }
//                 throw new Error(errorResponse.error || `Error ${response.status}: Failed to submit response`);
//             }

//             const result = await response.json();
//             console.log("Response result:", result); // Log the response result
//             responseMessage.textContent = "Response submitted successfully!";
//             responseMessage.style.display = "block";
//         } catch (error) {
//             console.error("Submission error:", error);
//             if (error instanceof TypeError) {
//                 errorMessage.textContent = "Network error. Please check your internet connection.";
//             } else {
//                 errorMessage.textContent = error.message || "An error occurred. Please try again.";
//             }
//             errorMessage.style.display = "block";
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submitAnswer');
    const jobRoleInput = document.getElementById('jobRole');
    const responseInput = document.getElementById('responseInput');
    const errorMessage = document.getElementById('errorMessage');
    const responseMessage = document.getElementById('responseMessage');

    // Ensure elements exist before adding event listeners
    if (!submitButton || !jobRoleInput || !responseInput || !errorMessage || !responseMessage) {
        console.error("Some DOM elements are missing. Check your HTML structure.");
        return;
    }

    submitButton.addEventListener('click', async () => {
        // Clear previous messages
        errorMessage.style.display = "none";
        responseMessage.style.display = "none";

        const jobRole = jobRoleInput.value.trim();
        const responseText = responseInput.value.trim();

        // Validate inputs
        if (!jobRole || !responseText) {
            errorMessage.textContent = "Please fill in all fields!";
            errorMessage.style.display = "block";
            return;
        }

        // The request payload (formatted correctly for Lambda)
        const requestBody = {
            body: JSON.stringify({
                userId: "user_123", // Replace with dynamic user ID logic if needed
                response: responseText,
                jobRole: jobRole,
            }),
        };
        
        try {
            const response = await fetch('https://ldze6rg09i.execute-api.us-east-1.amazonaws.com/prod/optional', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody) // Correctly wrap the body as expected by Lambda
            });
            const requestBody1 = {
                body: JSON.stringify(requestBody)
            };
            console.log(requestBody1);
            // console.log("Response status:", response.status); // Log the response status
            // console.log("Response headers:", response.headers); // Log the response headers

            // Check response status
            if (!response.ok) {
                let errorResponse;
                try {
                    errorResponse = await response.json();
                } catch {
                    errorResponse = { error: "Unexpected server error." };
                }
                throw new Error(errorResponse.error || `Error ${response.status}: Failed to submit response`);
            }

            const result = await response.json();
            console.log("Response result:", result); // Log the response result
            responseMessage.textContent = "Response submitted successfully!";
            responseMessage.style.display = "block";
        } catch (error) {
            console.error("Submission error:", error);
            if (error instanceof TypeError) {
                errorMessage.textContent = "Network error. Please check your internet connection.";
            } else {
                errorMessage.textContent = error.message || "An error occurred. Please try again.";
            }
            errorMessage.style.display = "block";
        }
    });
});
