// Scroll to the registration form section when the register button is clicked
document.getElementById('registerButton').addEventListener('click', function() {
    document.getElementById('registrationSection').scrollIntoView({
        behavior: 'smooth'
    });
});

// Import Firebase Auth SDK
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Initialize Firebase Auth
const auth = getAuth();

// Register form
const registerForm = document.getElementById('registerForm');

// Register form submission
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form submission
    const email = registerForm['email'].value;
    const password = registerForm['password'].value;

    try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // User registered successfully
        console.log('User registered successfully:', userCredential.user);
        alert('User registered successfully!');
        // Redirect or perform any other action
    } catch (error) {
        // Error occurred during registration
        console.error('Error registering user:', error);
        alert('Error registering user: ' + error.message);
    }
});
