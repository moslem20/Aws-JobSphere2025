document.addEventListener('DOMContentLoaded', () => {
    console.log("Simulation page loaded");

    document.getElementById('submitAnswer').addEventListener('click', async () => {
        const userResponse = document.getElementById('userResponse').value;
        const jobRole = document.getElementById('jobRole').value;

        if (!userResponse.trim()) {
            alert("Please enter a response!");
            return;
        }

        const responseMessage = document.getElementById('responseMessage');
        responseMessage.innerHTML = "Submitting your response...";

        try {
            // Configure AWS
            AWS.config.update({
                region: "us-east-1",  // Replace with your AWS region
                credentials: new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: "us-east-1:0d52cdf0-28de-42f6-bdb5-c9259d859ed8"  // Replace with your Identity Pool ID
                })
            });

            const docClient = new AWS.DynamoDB.DocumentClient();
            const params = {
                TableName: "JobSphereResponses",
                Item: {
                    "userId": "user_123",  // Replace with dynamic user ID
                    "timestamp": Date.now(),
                    "jobRole": jobRole,
                    "response": userResponse
                }
            };

            await docClient.put(params).promise();
            responseMessage.innerHTML = `<p style="color: green;">Your response has been saved successfully!</p>`;

        } catch (error) {
            console.error("Error submitting response:", error);
            responseMessage.innerHTML = `<p style="color: red;">Error submitting response. Please try again later.</p>`;
        }
    });
});
