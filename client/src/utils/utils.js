
export function convertMinutesToDayHourMin(minutes) {
    if (minutes) {
        let days = Math.floor(minutes / (24 * 60));
        let hours = Math.floor((minutes - (days * 24 * 60)) / 60);
        let mins = minutes % 60;

        let timeString = days ? days + 'd ' : '';
        timeString += hours ? hours + 'h ' : '';
        timeString += mins + 'min ';

        return timeString;

    } else {
        return 'Unknown';
    }
}

export function getDestinationList(minutes) {
    const destinationOptions = [
        { value: 'Stockholm, Sweden', label: 'Stockholm' },
        { value: 'Falun, Sweden', label: 'Falun' },
        { value: 'Are, Sweden', label: 'Åre' }
    ];
    return destinationOptions;
}

export function getOriginList(minutes) {
    const originCities = [
        'Rome, Italy',
        'Tokyo, Japan',
        'Berlin, Germany',
        'Sydney, Australia',
        'Helsinki, Finland',
        'Athens, Greece',
        'Copenhagen, Denmark',
        'Beijing, China',
        'Kabul, Afghanistan',
        'Tirana, Albania',
        'Algiers, Algeria',
        'Andorra la Vella, Andorra',
        'Luanda, Angola',
        'Saint Johns, Antigua and Barbuda',
        'Buenos Aires, Argentina',
        'Yerevan, Armenia',
        'Canberra, Australia',
        'Vienna, Austria',
    ]

    const originOptions = originCities.map(e => {
        return { value: e, label: e }
    })
    return originOptions;
}
