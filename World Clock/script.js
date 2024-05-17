function updateCityTimes() {
    const cities = [
        { id: 'los-angeles-time', timezone: 'America/Los_Angeles' },
        { id: 'bangkok-time', timezone: 'Asia/Bangkok' },
        { id: 'tokyo-time', timezone: 'Asia/Tokyo' },
        { id: 'london-time', timezone: 'Europe/London' },
        { id: 'new-york-time', timezone: 'America/New_York' },
    ];

    cities.forEach(city => {
        const cityTime = new Date().toLocaleString('en-GB', {
            timeZone: city.timezone,
            weekday: 'short',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        document.getElementById(city.id).innerText = cityTime;
    });
}

setInterval(updateCityTimes, 1000);
updateCityTimes();
