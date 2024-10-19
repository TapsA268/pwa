document.getElementById('goal-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const goalName = document.getElementById('goalName').value;
    const goalDescription = document.getElementById('goalDescription').value;
    const goalDate = document.getElementById('goalDate').value;

    const goal = {
        name: goalName,
        description: goalDescription,
        date: goalDate
    };

    saveGoal(goal);
    displayGoals();
    this.reset();
});

function saveGoal(goal) {
    let goals = localStorage.getItem('goals') ? JSON.parse(localStorage.getItem('goals')) : [];
    goals.push(goal);
    localStorage.setItem('goals', JSON.stringify(goals));
}

function displayGoals() {
    const goals = JSON.parse(localStorage.getItem('goals')) || [];
    const goalList = document.getElementById('goal-list');

    goalList.innerHTML = '';
    goals.forEach((goal, index) => {
        const card = document.createElement('div');
        card.className = 'card mb-3';
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${goal.name}</h5>
                    <p class="card-text">Descripción: ${goal.description}</p>
                    <p class="card-text">Fecha Límite: ${goal.date}</p>
                    <button class="btn btn-danger" onclick="deleteGoal(${index})">Eliminar</button>
                </div>
            </div>
        `;
        goalList.appendChild(card);
    });
}

function deleteGoal(index) {
    let goals = JSON.parse(localStorage.getItem('goals')) || [];
    goals.splice(index, 1);
    localStorage.setItem('goals', JSON.stringify(goals));
    displayGoals();
}

// Muestra los objetivos al cargar la página
document.addEventListener('DOMContentLoaded', displayGoals);
