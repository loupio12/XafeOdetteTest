const connectButton = document.getElementById('connect-wallet');
const walletStatus = document.getElementById('wallet-status');
const disconnectBtn = document.getElementById('disconnect-wallet');

let currentAccount = null;

// --- Connexion au wallet ---
connectButton.addEventListener('click', async () => {
  if (typeof window.ethereum === 'undefined') {
    alert('MetaMask non détecté !');
    return;
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    currentAccount = accounts[0];
    walletStatus.textContent = `Connected: ${currentAccount}`;
  } catch (err) {
    console.error(err);
    walletStatus.textContent = 'Erreur de connexion';
  }
});

// --- Déconnexion du wallet ---
disconnectBtn.addEventListener('click', () => {
  currentAccount = null;
  walletStatus.textContent = 'Not connected';
  window.location.href = '/./webtest/index.html';
}); 


// --- Boutons factices pour la démo ---
document.getElementById('get-decimals').addEventListener('click', () => {
  alert('Fonction "Get Decimals" (à implémenter)');
});

document.getElementById('get-balance').addEventListener('click', () => {
  if (!currentAccount) return alert('Connectez votre wallet d’abord');
  alert(`Balance de ${currentAccount} (fonction à implémenter)`);
});

document.getElementById('mint-button').addEventListener('click', () => {
  alert('Fonction "Mint" (à implémenter)');
});

