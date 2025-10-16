// ==========================
//  tokenReader.js
//  Lit les infos d'un contrat ERC20
// ==========================

// Nécessite connectWallet.js pour avoir "window.ethereum" et "account"
let userAccount = null;
let provider, signer, contract;

// Adresse du contrat XAF (à modifier selon ton déploiement)
const TOKEN_ADDRESS = "0xYourTokenAddressHere"; // 👈 remplace par ton adresse
// ABI minimale pour lire name, symbol et balanceOf
const TOKEN_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)"
];

// Fonction d'initialisation une fois MetaMask connecté
async function initTokenReader(account) {
  if (!window.ethereum) {
    alert("MetaMask non détecté.");
    return;
  }

  // Vérifie si ethers.js est chargé
  if (typeof ethers === "undefined") {
    alert("⚠️ ethers.js n'est pas chargé. Vérifie ton import dans index.html");
    return;
  }

  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  userAccount = account;
  contract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);

  await displayTokenData();
}

async function displayTokenData() {
  try {
    const name = await contract.name();
    const symbol = await contract.symbol();
    const decimals = await contract.decimals();
    const balance = await contract.balanceOf(userAccount);
    const humanBalance = Number(balance) / 10 ** decimals;

    const tokenDiv = document.createElement("div");
    tokenDiv.style.marginTop = "20px";
    tokenDiv.style.padding = "10px";
    tokenDiv.style.borderTop = "1px solid #ccc";
    tokenDiv.innerHTML = `
      <p><strong>Token:</strong> ${name} (${symbol})</p>
      <p><strong>Balance:</strong> ${humanBalance.toFixed(4)} ${symbol}</p>
    `;
    document.body.appendChild(tokenDiv);
  } catch (err) {
    console.error("Erreur lors de la lecture du token:", err);
    alert("Impossible de lire le contrat ERC20. Vérifie l'adresse et le réseau.");
  }
}

// Exporte la fonction pour utilisation depuis connectWallet.js
window.initTokenReader = initTokenReader;
