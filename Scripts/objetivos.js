document.addEventListener('DOMContentLoaded', function() {
    // Muestra los objetivos al cargar la página
    displayGoals();

    // Botón para solicitar permisos de notificaciones
    const notificationButton = document.getElementById('miBoton');
    notificationButton.addEventListener('click', function() {
        Notification.requestPermission().then(function(permission) {
            if (permission === 'granted') {
                console.log('Permiso concedido para las notificaciones.');
                new Notification('¡Hola! Has habilitado las notificaciones.');
            } else {
                console.log('Permiso denegado para las notificaciones.');
            }
        }).catch(function(error) {
            console.error('Error al solicitar permiso de notificación:', error);
        });
    });

    document.getElementById('testNotification').addEventListener('click', function() {
        new Notification('Este es un mensaje de prueba');
    });

    document.getElementById('goal-form').addEventListener('submit', function(e) {
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
        checkGoalReminders(); // Verifica si se necesita enviar una notificación
    });
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
            <div class="card-body">
                <h5 class="card-title">${goal.name}</h5>
                <p class="card-text">Descripción: ${goal.description}</p>
                <p class="card-text">Fecha Límite: ${goal.date}</p>
                <button class="btn btn-danger" onclick="deleteGoal(${index})">Eliminar</button>
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

function checkGoalReminders() {
    const goals = JSON.parse(localStorage.getItem('goals')) || [];
    const currentDate = new Date();

    goals.forEach((goal) => {
        const goalDate = new Date(goal.date);
        const timeDiff = goalDate - currentDate;
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        // Si faltan 2 días, enviar notificación
        if (daysDiff === 2) {
            sendNotification(goal.name);
        }
    });
}

function sendNotification(goalName) {
    if (Notification.permission === 'granted') {
        new Notification('Recordatorio de Objetivo', {
            body: `Faltan 2 días para el objetivo: ${goalName}`,
            icon: 'img1.jpeg', // Reemplaza con el ícono de tu aplicación
            vibrate: [200, 100, 200],
        });
    }
}
