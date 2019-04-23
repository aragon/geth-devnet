function unlockAndFundAccounts() {
  firstAccount = eth.accounts[0]
  eth.accounts.forEach(function (account) {
    console.log('Unlocking ' + account + '...');
    personal.unlockAccount(account, '', 86400);
    if (account !== firstAccount) {
      console.log('Sending 10K ETH to ' + account + '...')
      eth.sendTransaction({ from: firstAccount, to: account, value: web3.toWei(10000, "ether") });
    }
  });
}

function pendingTransactions() {
  if (web3.eth.pendingTransactions === undefined || web3.eth.pendingTransactions === null) {
    return txpool.status.pending || txpool.status.queued;
  }
  else if (typeof web3.eth.pendingTransactions === "function")  {
    return web3.eth.pendingTransactions().length > 0;
  }
  else {
    return web3.eth.pendingTransactions.length > 0 || web3.eth.getBlock('pending').transactions.length > 0;
  }
}

function setupDevNode() {
  web3.eth.filter("pending").watch(function () {
    if (miner.hashrate > 0) return;
    console.log("== Pending transactions! Looking for next block...");
    miner.start(8);
  });

  web3.eth.filter("latest").watch(function () {
    if (!pendingTransactions()) {
      console.log("== No transactions left. Stopping miner...");
      miner.stop();
    }
  });
}

unlockAndFundAccounts();
setupDevNode();
