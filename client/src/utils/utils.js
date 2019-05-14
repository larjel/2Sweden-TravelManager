
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
