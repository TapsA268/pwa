document.getElementById('food-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const foodName = document.getElementById('food-name').value;
    const calories = document.getElementById('calories').value;
    const date = document.getElementById('date').value;

    const foodEntry = {
        foodName,
        calories,
        date
    };

    saveFoodEntry(foodEntry);
    displayFoodEntries();
    this.reset();
});

function saveFoodEntry(foodEntry) {
    let foodEntries = localStorage.getItem('foodEntries') ? JSON.parse(localStorage.getItem('foodEntries')) : [];
    foodEntries.push(foodEntry);
    localStorage.setItem('foodEntries', JSON.stringify(foodEntries));
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

// Muestra las entradas al cargar la página
document.addEventListener('DOMContentLoaded', displayFoodEntries);
