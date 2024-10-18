let transactions = [];
let balance = 0;

document.getElementById('transaction-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    const transaction = {
        description: description,
        amount: amount
    };

    transactions.push(transaction);
    updateBalance();
    displayTransactions();
    clearForm();
});

function updateBalance() {
    balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    document.getElementById('balance').innerText = `Total Balance: $${balance.toFixed(2)}`;
}

function displayTransactions() {
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = '';

    transactions.forEach((transaction, index) => {
        const div = document.createElement('div');
        div.className = 'transaction';
        div.innerHTML = `${transaction.description}: $${transaction.amount.toFixed(2)} 
        <button onclick="deleteTransaction(${index})">Delete</button>`;
        transactionList.appendChild(div);
    });
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateBalance();
    displayTransactions();
}

function clearForm() {
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
}
