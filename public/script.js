const form = document.getElementById('prediction-form');
const predictionsList = document.getElementById('predictions-list');

// Load predictions from the server
const loadPredictions = async () => {
    const response = await fetch('/predictions');
    const predictions = await response.json();

    predictionsList.innerHTML = '';
    predictions.forEach(prediction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${prediction.name}</td>
            <td>${prediction.date}</td>
            <td>${prediction.time}</td>
        `;
        predictionsList.appendChild(row);
    });
};

// Handle form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    const response = await fetch('/predictions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, date, time })
    });

    if (response.ok) {
        form.reset();
        loadPredictions();
    } else {
        alert('Failed to submit prediction.');
    }
});

// Initial load
loadPredictions();