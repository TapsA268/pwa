document.addEventListener('DOMContentLoaded', () => {
    displayTotalCalories();
    displayFoodEntries();
    displayCaloriesChart();
});

function displayTotalCalories() {
    const foodEntries = JSON.parse(localStorage.getItem('foodEntries')) || [];
    const totalCalories = foodEntries.reduce((total, entry) => total + parseInt(entry.calories), 0);
    
    const totalCaloriesElement = document.getElementById('total-calories');
    totalCaloriesElement.textContent = `Total: ${totalCalories} calorías`;
}

function displayFoodEntries() {
    const foodEntries = JSON.parse(localStorage.getItem('foodEntries')) || [];
    const foodEntriesContainer = document.getElementById('food-entries');

    foodEntriesContainer.innerHTML = '';
    foodEntries.forEach(entry => {
        const card = document.createElement('div');
        card.className = 'col-lg-4 mb-4';
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${entry.foodName}</h5>
                    <p class="card-text">Calorías: ${entry.calories}</p>
                    <p class="card-text">Fecha: ${entry.date}</p>
                </div>
            </div>
        `;
        foodEntriesContainer.appendChild(card);
    });
}

function displayCaloriesChart() {
    const foodEntries = JSON.parse(localStorage.getItem('foodEntries')) || [];
    
    // Agrupar calorías por fecha
    const caloriesByDate = {};
    foodEntries.forEach(entry => {
        const date = entry.date; // Asumiendo que la fecha está en el formato YYYY-MM-DD
        if (!caloriesByDate[date]) {
            caloriesByDate[date] = 0;
        }
        caloriesByDate[date] += parseInt(entry.calories);
    });

    // Preparar datos para el gráfico
    const labels = Object.keys(caloriesByDate);
    const data = Object.values(caloriesByDate);

    const ctx = document.getElementById('caloriesChart').getContext('2d');
    const caloriesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Calorías Consumidas',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Calorías'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Fecha'
                    }
                }
            }
        }
    });
}
