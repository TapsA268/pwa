document.addEventListener('DOMContentLoaded', () => {
    displayGoals();
    
    const goalForm = document.getElementById('goal-form');
    goalForm.addEventListener('submit', addGoal);
});

function addGoal(event) {
    event.preventDefault();
    
    const goalName = document.getElementById('goalName').value;
    const goalDescription = document.getElementById('goalDescription').value;
    const goalDate = document.getElementById('goalDate').value;
    
    const goal = {
        name: goalName,
        description: goalDescription,
        date: goalDate,
    };

    const goals = JSON.parse(localStorage.getItem('goals')) || [];
    goals.push(goal);
    localStorage.setItem('goals', JSON.stringify(goals));

    goalForm.reset();
    displayGoals();
}

function displayGoals() {
    const goals = JSON.parse(localStorage.getItem('goals')) || [];
    const goalList = document.getElementById('goal-list');

    goalList.innerHTML = '';
    goals.forEach((goal, index) => {
        const card = document.createElement('div');
        card.className = 'card mb-3';
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${goal.name}</h5>
                <p class="card-text">${goal.description}</p>
                <p class="card-text"><small class="text-muted">Fecha Límite: ${goal.date}</small></p>
                <button class="btn btn-danger" onclick="deleteGoal(${index})">Eliminar</button>
            </div>
        `;
        goalList.appendChild(card);
    });
}

function deleteGoal(index) {
    const goals = JSON.parse(localStorage.getItem('goals')) || [];
    goals.splice(index, 1);
    localStorage.setItem('goals', JSON.stringify(goals));
    displayGoals();
}
