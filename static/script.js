document.addEventListener('DOMContentLoaded', function() {
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
  
    loginLink.addEventListener('click', function(event) {
      event.preventDefault();
      loginForm.classList.add('active-form');
      signupForm.classList.remove('active-form');
    });
  
    signupLink.addEventListener('click', function(event) {
      event.preventDefault();
      signupForm.classList.add('active-form');
      loginForm.classList.remove('active-form');
    });
  });
  