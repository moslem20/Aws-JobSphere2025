document.getElementById('aws-login').addEventListener('click', function(event) {
    event.preventDefault();

    const clientId = '5hho5js7a9g3980oue9a6707j';  // Your Cognito App Client ID
    const domain = 'us-east-13mjs3disp.auth.us-east-1.amazoncognito.com';  // Your Cognito domain
    const redirectUri = 'http://jobsphereai-2025.s3-website-us-east-1.amazonaws.com/index.html';  // Your S3 website URL

    const loginUrl = `https://${domain}/login?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}`;
    window.location.href = loginUrl;
});
