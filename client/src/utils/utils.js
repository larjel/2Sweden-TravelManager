
//----------------------------------------------------------------------------
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

//----------------------------------------------------------------------------
export function truncateDecimals(number, digits) {
    var multiplier = Math.pow(10, digits),
        adjustedNum = number * multiplier,
        truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

    return truncatedNum / multiplier;
};

//----------------------------------------------------------------------------
export function getDestinationList() {
    const destinationOptions = [
        { value: 'Stockholm, Sweden', label: 'Stockholm' },
        { value: 'Falun, Sweden', label: 'Falun' },
        { value: 'Are, Sweden', label: 'Åre' }
    ];
    return destinationOptions;
}

//----------------------------------------------------------------------------
export function getOriginList() {
    const originCities = [
        'Athens, Greece',
        'Beijing, China',
        'Berlin, Germany',
        'Buenos Aires, Argentina',
        'Canberra, Australia',
        'Copenhagen, Denmark',
        'Helsinki, Finland',
        'Rome, Italy',
        'Sydney, Australia',
        'Tokyo, Japan',
        'Vienna, Austria',
    ]

    const originOptions = originCities.map(e => {
        return { value: e, label: e }
    })
    return originOptions;
}

//----------------------------------------------------------------------------
// 3 letter currency codes to support (in ISO 4217 format).
// See: https://en.wikipedia.org/wiki/ISO_4217 for complete list.
//----------------------------------------------------------------------------
export function getCurrencyList() {
    const currencies = [
        'SEK',
        'USD',
        'EUR',
        'NOK',
        'GPD',
        'DKK'
    ]

    const currencyOptions = currencies.map(e => {
        return { value: e, label: e }
    })
    return currencyOptions;
}
