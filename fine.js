function calculateFine() {
    // Get input values
    const daysOverdue = parseInt(document.getElementById('days-overdue').value);
    const dailyFine = parseFloat(document.getElementById('daily-fine').value);
    
    // Validate the inputs
    if (isNaN(daysOverdue) || isNaN(dailyFine) || daysOverdue < 0 || dailyFine < 0) {
        alert("Please enter valid values for days overdue and daily fine.");
        return;
    }

    // Calculate the fine
    const fineAmount = daysOverdue * dailyFine;

    // Display the result
    document.getElementById('fine-amount').textContent = `Rs${fineAmount.toFixed(2)}`;
}
