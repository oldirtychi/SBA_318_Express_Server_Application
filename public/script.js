document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    fetch('/api/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});