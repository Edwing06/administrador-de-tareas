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
  
  document.getElementById('btnLogin').addEventListener('click', iniciarSesion);

  function iniciarSesion(){
    const correo = document.getElementById('correoLogin').value;
    const contrasena = document.getElementById('contrasenaLogin').value;

    // Realizar la solicitud de inicio de sesión al servidor
    fetch('/autenticar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, contrasena }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo iniciar sesión. Credenciales inválidas.');
        }
        // Redirigir al usuario a la página deseada después de iniciar sesión correctamente
        window.location.href = '/index'; // Reemplaza '/dashboard' con la ruta deseada
    })
    .catch(error => {
        console.error('Error al iniciar sesión:', error.message);
        alert(error.message); // Mostrar un mensaje de error al usuario
    });
  }
