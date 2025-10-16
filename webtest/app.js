// Récupération des éléments
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const showRegister = document.getElementById("show-register");
const showLogin = document.getElementById("show-login");

// Basculer entre connexion et création
showRegister.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.style.display = "none";
  registerForm.style.display = "block";
});

showLogin.addEventListener("click", (e) => {
  e.preventDefault();
  registerForm.style.display = "none";
  loginForm.style.display = "block";
});

// Gestion de la connexion
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  // TODO : envoyer ces infos au backend pour vérifier
  console.log("Connexion :", email, password);
  alert("Connexion réussie (simulation)");
});

// Gestion de la création de compte
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("register-name").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  // TODO : envoyer ces infos au backend pour créer le compte
  console.log("Création de compte :", name, email, password);
  alert("Compte créé (simulation)");
});
