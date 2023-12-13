document.addEventListener('DOMContentLoaded', () => {
    const guestName = localStorage.getItem('guestName');
    if (guestName) {
        document.getElementById('guestName').value = guestName;
    }

    document.querySelectorAll('.drinkButtons button').forEach(button => {
        button.addEventListener('click', () => {
            const drinkColor = window.getComputedStyle(button).backgroundColor;

            // Speichere die Farbe des Getränks und setze den Bestellstatus
            const drinkColors = JSON.parse(localStorage.getItem('drinkColors')) || {};
            drinkColors[guestName] = drinkColor;
            localStorage.setItem('drinkColors', JSON.stringify(drinkColors));

            const orderStatus = JSON.parse(localStorage.getItem('orderStatus')) || {};
            orderStatus[guestName] = true;
            localStorage.setItem('orderStatus', JSON.stringify(orderStatus));

            // Setze die Startzeit für die Zeiterfassung
            const orderStartTimes = JSON.parse(localStorage.getItem('orderStartTimes')) || {};
            orderStartTimes[guestName] = Date.now();
            localStorage.setItem('orderStartTimes', JSON.stringify(orderStartTimes));

            window.location.href = 'index.html';
        });
    });
});
