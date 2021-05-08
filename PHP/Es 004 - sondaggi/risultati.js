"use strict"

function creaDiagramma(si, no, ns) {
    let ctx = document.getElementById('idCanvas').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Si', 'No', 'Non so'],
            datasets: [{
                label: '# of Votes',
                data: [si, no, ns],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            // responsive: false
        }
    });
}