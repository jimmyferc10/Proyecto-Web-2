document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const mensaje = document.getElementById('mensaje');

  
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');

    
    if (nombre.value.trim().length < 3) {
        nombre.nextElementSibling.textContent = 'El nombre debe tener al menos 3 caracteres.';
        isValid = false;
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        email.nextElementSibling.textContent = 'Ingresa un correo electrónico válido.';
        isValid = false;
    }

    
    if (mensaje.value.trim().length < 10) {
        mensaje.nextElementSibling.textContent = 'El mensaje es muy corto.';
        isValid = false;
    }

    if (isValid) {
        alert('¡Gracias! Tu mensaje ha sido enviado correctamente.');
        this.reset();
    }
});