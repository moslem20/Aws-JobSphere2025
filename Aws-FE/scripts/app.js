document.addEventListener('DOMContentLoaded', () => {
  console.log('JobSphere AI loaded successfully!');

  // Handle login form submission
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
      loginForm.addEventListener('submit', (event) => {
          event.preventDefault();
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          loginUser(email, password);
      });
  }

  // Handle signup form submission
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
      signupForm.addEventListener('submit', (event) => {
          event.preventDefault();
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          const confirmPassword = document.getElementById('confirmPassword').value;
          if (password !== confirmPassword) {
              alert('Passwords do not match!');
              return;
          }
          signupUser(email, password);
      });
  }

  function loginUser(email, password) {
      alert(`Logging in user: ${email}`);
      // AWS Cognito login logic can be implemented here
  }

  function signupUser(email, password) {
      alert(`Signing up user: ${email}`);
      // AWS Cognito signup logic can be implemented here
  }

  // Dashboard user greeting
  const userGreeting = document.getElementById('user-name');
  if (userGreeting) {
      userGreeting.innerText = 'John Doe';
  }
});