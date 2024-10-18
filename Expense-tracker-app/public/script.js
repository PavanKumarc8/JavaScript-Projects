// Fetch expenses and render them on the dashboard
fetch('/expenses')
    .then(response => response.json())
    .then(data => {
        const expenseList = document.getElementById('expenses');
        data.forEach(expense => {
            const li = document.createElement('li');
            li.textContent = `${expense.amount} - ${expense.category}`;
            expenseList.appendChild(li);
        });
    });
