import checkPropTypes from 'check-prop-types';

//----------------------------------------------------------------------------
// Constants used for selection of menu options
export const MENU_OPT = {
  SEARCH: 'search',
  HOME: 'home',
  INFO: 'info',
  RECOMMEND: 'recommend',
  STOCKHOLM: 'stockholm',
  FALUN: 'falun',
  ARE: 'are'
}
Object.freeze(MENU_OPT); // Makes the variables of MENU_OPT immutable

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
export function truncDecAndRound(number, digits) {
  const multiplier = Math.pow(10, digits);
  const adjustedNum = number * multiplier;
  const truncatedNum = Math.round(adjustedNum);

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
    'EUR',
    'USD',
    'GBP',
    'NOK',
    'DKK'
  ]

  const currencyOptions = currencies.map(e => {
    return { value: e, label: e }
  })
  return currencyOptions;
}

//----------------------------------------------------------------------------
// Remove data that will not be used from the Rome2Rio API JSON response
//----------------------------------------------------------------------------
export function filterJsonResponse(data) {
  if (!data) {
    return;
  }
  if (data.airlines) {
    data.airlines = null; // Remove airlines
  }
  if (data.aircrafts) {
    data.aircrafts = null; // Remove aircrafts
  }
  if (data.agencies) {
    data.agencies = null; // Remove agencies
  }
  if (data.routes && Array.isArray(data.routes)) {
    // Remove 'alternatives' from each route
    data.routes.forEach((route) => {
      if (route.alternatives) {
        route.alternatives = null;

        if (route.segments && Array.isArray(route.segments)) {
          // Remove 'agencies' from each segment
          route.segments.forEach((segment) => {
            if (segment.agencies) {
              segment.agencies = null;
            }
          })
        }
      }
    })
  }
}

//----------------------------------------------------------------------------
// Find by test attribute. Test support function.
export const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

//----------------------------------------------------------------------------
// Check props. Test support function.
export const checkProps = (component, expectedProps) => {
  // ESLint will warn on "using proptypes from another component is not safe", but since
  // this function is only used for testing, we will ignore this warning
  /*eslint-disable */
  const propsErr = checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
  /*eslint-enable */
  return propsErr;
};
