import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.43.4/+esm';

const SUPABASE_URL = 'https://wyxfjpcuyhjvypxhhlov.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5eGZqcGN1eWhqdnlweGhobG92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NzAyODcsImV4cCI6MjA3NjA0NjI4N30.oAZydfzrFt7l2izuQdzL-LJ8HbM74hooAjCeSsGIkQI';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Formulaires et messages
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');

const loginMessage = document.getElementById('login-message');
const registerMessage = document.getElementById('register-message');

// Basculer entre formulaires
showRegister.addEventListener('click', (e) => {
  e.preventDefault();
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
  loginMessage.innerHTML = '';
});

showLogin.addEventListener('click', (e) => {
  e.preventDefault();
  registerForm.style.display = 'none';
  loginForm.style.display = 'block';
  registerMessage.innerHTML = '';
});

// --- Création de compte ---
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  registerMessage.innerHTML = '';
  registerMessage.className = 'message';

  const nom = document.getElementById('register-nom').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  registerMessage.textContent = 'Création du compte en cours...';

  try {
    // 1️⃣ Tenter de créer le compte Auth
    const { data: user, error: signUpError } = await supabase.auth.signUp({ email, password });

    if (signUpError) {
      if (signUpError.message.includes('User already registered')) {
        registerMessage.className = 'message info';
        registerMessage.textContent = 'Ce compte existe déjà, vérification de la table clients...';
      } else {
        registerMessage.className = 'message error';
        registerMessage.textContent = signUpError.message;
        return;
      }
    }

    // 2️⃣ Vérifier si l'utilisateur est déjà dans la table clients
    const { data: existingClient, error: selectError } = await supabase
    .from('clients')
    .select('*')
    .eq('email', email)
    .maybeSingle();

    if (selectError) {
    registerMessage.className = 'message error';
    registerMessage.textContent = selectError.message;
    return;
    }

    // 3️⃣ Insérer dans clients si non présent
    if (!existingClient) {
    const { error: insertError } = await supabase
        .from('clients')
        .insert([{ email, nom, password }]);

    if (insertError) {
        registerMessage.className = 'message error';
        registerMessage.textContent = insertError.message;
        return;
    }
    }


    registerMessage.className = 'message success';
    registerMessage.textContent = 'Compte créé ou existant, table clients mise à jour 🎉';
    registerForm.reset();

  } catch (err) {
    console.error('Erreur lors de la création du compte:', err);
    registerMessage.className = 'message error';
    registerMessage.textContent = err.message;
  }
});
