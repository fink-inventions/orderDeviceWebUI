document.addEventListener('DOMContentLoaded', () => {
    const orderStatus = JSON.parse(localStorage.getItem('orderStatus')) || {};
    const drinkColors = JSON.parse(localStorage.getItem('drinkColors')) || {};
    const orderStartTimes = JSON.parse(localStorage.getItem('orderStartTimes')) || {};

    function updateElapsedTime() {
        const currentTime = Date.now();

        document.querySelectorAll('.guestButtons input[type="text"]').forEach(input => {
            const guestName = input.name.replace('time', '');
            const startTime = orderStartTimes[guestName];

            if (orderStatus[guestName] && startTime) {
                const elapsedTime = currentTime - startTime;
                const seconds = Math.floor((elapsedTime / 1000) % 60);
                const minutes = Math.floor((elapsedTime / 1000) / 60);
                input.value = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
            } else {
                input.value = '';
            }
        });
    }

    document.querySelectorAll('.guestButtons button').forEach(button => {
        button.addEventListener('click', () => {
            const guestName = button.name;

            if (!orderStatus[guestName]) {
                // Starte den Bestellvorgang
                localStorage.setItem('guestName', guestName);
                window.location.href = 'drinks.html';
            } else {
                // Bestellung beenden, Hintergrundfarbe entfernen und Zeit zurücksetzen
                button.style.backgroundColor = '';
                orderStatus[guestName] = false;
                delete orderStartTimes[guestName];
                localStorage.setItem('orderStatus', JSON.stringify(orderStatus));
                localStorage.setItem('orderStartTimes', JSON.stringify(orderStartTimes));
            }
        });

        // Setze die Hintergrundfarbe für den Gast-Button, falls eine Bestellung läuft
        if (orderStatus[button.name]) {
            button.style.backgroundColor = drinkColors[button.name];
        }
    });

    setInterval(updateElapsedTime, 1000); // Aktualisiere jede Sekunde die vergangene Zeit
    updateElapsedTime(); // Initialer Aufruf der Funktion
});
