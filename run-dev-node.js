function createAccounts() {
    for (var i = 0; i < 10; i++) {
        console.log('creating new account...')
        acc = personal.newAccount("");
        personal.unlockAccount(acc, "");
        eth.sendTransaction({from: eth.accounts[0], to: acc, value: web3.toWei(1000, "ether")});
    }
}

function unlockAccounts() {
  eth.accounts.forEach(function (account) {
    console.log('Unlocking ' + account + '...');
    personal.unlockAccount(account, '', 86400);
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
  // keep accounts unlocked
  while (true) {
      unlockAccounts()
  }
}

setupDevNode();
