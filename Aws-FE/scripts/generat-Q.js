document.addEventListener('DOMContentLoaded', () => {
  const generateButton = document.getElementById('generateQuestions');
  const jobRoleInput = document.getElementById('jobRole');
  const questionsContainer = document.getElementById('questionsContainer');
  const errorMessage = document.getElementById('errorMessage');

  generateButton.addEventListener('click', async () => {
      const jobRole = jobRoleInput.value.trim();

      if (!jobRole) {
          errorMessage.textContent = "Please enter a job role!";
          errorMessage.style.display = "block";
          return;
      }

      try {
          const response = await fetch(
              `https://pc2s70d9sg.execute-api.us-east-1.amazonaws.com/prod/questions?jobRole=${encodeURIComponent(jobRole)}`
          );

          if (!response.ok) {
              throw new Error(`Error ${response.status}: Failed to fetch questions`);
          }

          const result = await response.json();
          questionsContainer.innerHTML = result.questions.map((q) => `<p>${q}</p>`).join("");
          errorMessage.style.display = "none";
      } catch (error) {
          console.error("Error fetching questions:", error);
          errorMessage.textContent = error.message;
          errorMessage.style.display = "block";
          questionsContainer.innerHTML = "";
      }
  });
});