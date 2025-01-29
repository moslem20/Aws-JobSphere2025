document.addEventListener("DOMContentLoaded", async () => {
    try {
        const userNameSpan = document.getElementById("username");

        // AWS Cognito Configuration
        AWS.config.region = "us-east-1"; // Set your AWS region

        const poolData = {
            UserPoolId: "us-east-1_1xmCXGAB1", // Replace with your Cognito User Pool ID
            ClientId: "6qep6viv8ti3oa4th6l50f9i7v" // Replace with your Cognito App Client ID
        };

        const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        const cognitoUser = userPool.getCurrentUser();

        if (cognitoUser) {
            cognitoUser.getSession((err, session) => {
                if (err) {
                    console.error("Session error:", err);
                    userNameSpan.textContent = "Guest";
                    return;
                }

                // Get user attributes
                cognitoUser.getUserAttributes((err, attributes) => {
                    if (err) {
                        console.error("Error fetching user attributes:", err);
                        userNameSpan.textContent = "User";
                    } else {
                        const userName = attributes.find(attr => attr.Name === "name")?.Value || "User";
                        userNameSpan.textContent = userName;
                    }
                });
            });
        } else {
            userNameSpan.textContent = "Guest";
        }
    } catch (error) {
        console.error("Error loading user data:", error);
        document.getElementById("username").textContent = "Guest";
    }
});