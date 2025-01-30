document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('report-output').style.display = 'none';
    loadMonthlyReportCharts();
});

function generateReport() {
    const selectedMonth = document.getElementById('month').value;
    if (!selectedMonth) {
        alert("Please select a month to generate the report.");
        return;
    }

    fetch('monthly_reports.json')
        .then(response => response.json())
        .then(data => {
            const report = data.find(entry => entry.month === selectedMonth);
            if (report) {
                displayReport(report);
            } else {
                alert("No report available for the selected month.");
            }
        })
        .catch(error => console.error('Error fetching monthly reports:', error));
}

function displayReport(report) {
    document.getElementById('total-members').textContent = report.totalMembers;
    document.getElementById('active-members').textContent = report.activeMembers;
    document.getElementById('inactive-members').textContent = report.inactiveMembers;
    document.getElementById('new-members').textContent = report.newMembers;
    document.getElementById('cds-rented').textContent = report.cdsRented;
    document.getElementById('cds-bought').textContent = report.cdsBought;
    document.getElementById('total-sales').textContent = report.totalSales;
    document.getElementById('profit').textContent = report.profit;
    document.getElementById('profit-percentage').textContent = report.profitPercentage;
    document.getElementById('report-output').style.display = 'block';
}

function loadMonthlyReportCharts() {
    fetch('monthly_reports.json')
        .then(response => response.json())
        .then(data => {
            const labels = data.map(entry => entry.month);
            const newMembers = data.map(entry => entry.newMembers);
            const cdsRented = data.map(entry => entry.cdsRented);
            const cdsBought = data.map(entry => entry.cdsBought);

            const ctx1 = document.getElementById('monthlyNewMembersChart').getContext('2d');
            new Chart(ctx1, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'New Members',
                        data: newMembers,
                        borderColor: '#5A9',
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: { title: { display: true, text: 'Month' } },
                        y: { beginAtZero: true }
                    }
                }
            });

            const ctx2 = document.getElementById('cdSalesChart').getContext('2d');
            new Chart(ctx2, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'CDs Rented',
                            data: cdsRented,
                            backgroundColor: '#3498db'
                        },
                        {
                            label: 'CDs Bought',
                            data: cdsBought,
                            backgroundColor: '#e74c3c'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: { title: { display: true, text: 'Month' } },
                        y: { beginAtZero: true }
                    }
                }
            });
        })
        .catch(error => console.error('Error loading chart data:', error));
}
