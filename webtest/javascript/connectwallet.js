const connectButton = document.getElementById("connectButton");
const statusText = document.getElementById("connectionStatus");
const walletAddress = document.getElementById("walletAddress");
const walletBalance = document.getElementById("walletBalance");
const networkName = document.getElementById("networkName");

async function connectWallet() {
  if (typeof window.ethereum === "undefined") {
    alert("⚠️ MetaMask non détecté. Vérifie que l'extension est activée.");
    return;
  }

  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const account = accounts[0];

    if (account) {
      statusText.textContent = "Connected";
      statusText.style.color = "green";
      walletAddress.textContent = "Wallet address: " + account;

      const balanceWei = await window.ethereum.request({
        method: "eth_getBalance",
        params: [account, "latest"],
      });
      const balanceEth = parseFloat(parseInt(balanceWei, 16) / 1e18).toFixed(4);
      walletBalance.textContent = "Balance: " + balanceEth + " ETH";

      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      const network = getNetworkName(chainId);
      networkName.textContent = "Network: " + network + " (" + chainId + ")";

      // Après la ligne :
      window.ethereum.on("chainChanged", () => window.location.reload());

      if (typeof window.initTokenReader === "function") {
        initTokenReader(account);
}

    } else {
      setDisconnected();
    }
  } catch (error) {
    console.error(error);
    setDisconnected();
  }
}

function getNetworkName(chainId) {
  switch (chainId) {
    case "0x1": return "Ethereum Mainnet";
    case "0x5": return "Goerli Testnet";
    case "0xaa36a7": return "Sepolia Testnet";
    case "0x89": return "Polygon Mainnet";
    case "0x13881": return "Polygon Mumbai Testnet";
    case "0xa4b1": return "Arbitrum One";
    case "0x66eed": return "Arbitrum Sepolia";
    case "0x38": return "Binance Smart Chain";
    case "0x61": return "BSC Testnet";
    default: return "Unknown Network";
  }
}

function setDisconnected() {
  statusText.textContent = "Not connected";
  statusText.style.color = "red";
  walletAddress.textContent = "";
  walletBalance.textContent = "";
  networkName.textContent = "";
}

connectButton.addEventListener("click", connectWallet);
