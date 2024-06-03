let is24HourFormat = true;
function updateTime() {
    let now = new Date(); //vytvoří datum
    let hours = now.getHours();//aktualnni hodiny
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    //aby se hodiny zobrazovaly jako dvouciferné číslo
    if (hours < 10) {
        hours = '0' + hours;
    } else {
        hours = hours.toString();
    }

    if (minutes < 10) {
        minutes = '0' + minutes;
    } else {
        minutes = minutes.toString();
    }

    if (seconds < 10) {
        seconds = '0' + seconds;
    } else {
        seconds = seconds.toString();
    }
    let timeString;
    if (is24HourFormat) {
        if (hours < 10) {
            hours = '0' + hours;
        } else {
            hours = hours.toString();
        }
        timeString = `${hours}:${minutes}:${seconds}`;
    } else {
        let period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        if (hours < 10) {
            hours = '0' + hours;
        } else {
            hours = hours.toString();
        }
        timeString = `${hours}:${minutes}:${seconds} ${period}`;
    }


    document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;
}

function updateDate() {
    let now = new Date();
    let days = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'];
    let months = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];

    //aktuální názvy
    let day = days[now.getDay()];
    let date = now.getDate();
    let month = months[now.getMonth()];
    let year = now.getFullYear();

    document.getElementById('date').textContent = `${day}, ${date}. ${month} ${year}`;
}

function updateTimezones() {
    let timezones = [
        { elementId: 'newyork', timezone: 'America/New_York', displayName: 'New York' },
        { elementId: 'londyn', timezone: 'Europe/London', displayName: 'Londýn' },
        { elementId: 'pariz', timezone: 'Europe/Paris', displayName: 'Paříž' },
        { elementId: 'tokyo', timezone: 'Asia/Tokyo', displayName: 'Tokio' },
        { elementId: 'sydney', timezone: 'Australia/Sydney', displayName: 'Sydney' },
        { elementId: 'moskva', timezone: 'Europe/Moscow', displayName: 'Moskva' },
        { elementId: 'dubai', timezone: 'Asia/Dubai', displayName: 'Dubaj' },
        { elementId: 'la', timezone: 'America/Los_Angeles', displayName: 'Los Angeles' },
    ];
//aktualní čas
    timezones.forEach(zone => {
       let time = moment().tz(zone.timezone).format('HH:mm:ss');
        document.getElementById(zone.elementId).textContent = `${zone.displayName}: ${time}`;
    });
}
function casFormat() {
    let formatSelect = document.getElementById('time-format');
    is24HourFormat = formatSelect.value === '24';
    updateTime();
    updateTimezones();
}

//kazdou sekundu aktualizuje čas
setInterval(() => {
    updateTime();
    updateDate();
    updateTimezones();
}, 1000);

// aby se časy zobrazovaly hned po načtění stránky
updateTime();
updateDate();
updateTimezones();

