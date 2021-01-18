
//~~~~~~~~~~// Imports //~~~~~~~~~~//

import './css/base.scss';
import './images/logo.png'
import './images/stewardess.png'
import Traveler from './traveler';
import Trip from './trip';
import domUpdates from './domUpdates';

//~~~~~~~~~~// Global Variables //~~~~~~~~~~//

let travelers, trips, destinations, currentTraveler, newTripInfo;

//~~~~~~~~~~// Query Selectors //~~~~~~~~~~//

const estimateCostButton = document.querySelector('.estimate-cost');
const bookTripButton = document.querySelector('.book-trip');
const loginButton = document.querySelector('.login-button');
const loginPage = document.querySelector('.login-page');
const mainDashboard = document.querySelector('.main-dashboard');

//~~~~~~~~~~// Event Handlers //~~~~~~~~~~//

const checkLoginInputs = () => {
  event.preventDefault()
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const userID = usernameInput.value.split('').splice(8, 2).join('');
  console.log(userID)
  if (usernameInput.value.includes('traveler') && passwordInput.value.includes('travel2020')) {
    loadPage(+userID);
  } else {
    window.alert('Please enter a valid username and password')
  }
}

const loadPage = (userID) => {
  getAllData(userID);
};

const getAllData = (userID) => {
  let getTravelerData = fetch('http://localhost:3001/api/v1/travelers')
    .then(response => response.json());
  let getTripData = fetch('http://localhost:3001/api/v1/trips')
    .then(response => response.json());
  let getDestinationData = fetch('http://localhost:3001/api/v1/destinations')
    .then(response => response.json());
  let getSingleTraveler = fetch(`http://localhost:3001/api/v1/travelers/${userID}`)
    .then(response => response.json());

  Promise.all([getTravelerData, getTripData, getDestinationData, getSingleTraveler])
    .then(data => displayDashboard(data[0], data[1], data[2], data[3]));
};

const displayDashboard = (travelerData, tripData, destinationData, singleTraveler) => {
  travelers = travelerData.travelers;
  trips = tripData.trips;
  destinations = destinationData.destinations;
  currentTraveler = new Traveler(singleTraveler);
  console.log('currentTraveler', currentTraveler)
  // generateRandomTraveler(travelers);
  // createTraveler(travelers[8]);
  loginPage.classList.add('hidden');
  mainDashboard.classList.remove('hidden');
  domUpdates.displayWelcomeMessage(currentTraveler);
  domUpdates.generateDestinationDropdown(destinations);
  currentTraveler.addTripsForCurrentTraveler(trips, destinations);
  domUpdates.displayTrips(currentTraveler.trips, destinations);
  domUpdates.displayYearlyTotal(currentTraveler);
};

// const generateRandomTraveler = (travelerData) => {
//   let userID = Math.floor(Math.random() * travelerData.length);
//   let dataForRandomTraveler = travelerData.find(traveler => {
//     return traveler.id === userID;
//   })
//   currentTraveler = new Traveler(dataForRandomTraveler);
//   return currentTraveler;
// };

// const createTraveler = (travelerData) => {
//   currentTraveler = new Traveler(travelerData);
//   return currentTraveler;
// }

const updateTrips = () => {
  const newTrip = formatNewTrip();
  return fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newTrip)
  })
    .then(response => response.json())
    .catch(err => console.error(err))
}

const formatNewTrip = () => {
  const destination = document.getElementById('trip-destination').value;
  const departureDate = document.getElementById('departure-date').value.replace(/-/g, '/');
  const tripDuration = document.getElementById('trip-duration').value;
  const totalTravelers = document.getElementById('total-travelers').value;
  newTripInfo = {
    id: getRandomTripID(),
    userID: currentTraveler.travelerID,
    destinationID: findDestinationID(destination).id,
    travelers: totalTravelers,
    date: departureDate,
    duration: tripDuration,
    status: 'pending',
    suggestedActivities: [],
  }
  return newTripInfo;
}

const getRandomTripID = () => {
  return Math.floor(Math.random() * (900 - 201) + 201);
}

const findDestinationID = (selectedDestination) => {
  const newTripDestinationID = destinations.find(destination => {
    if (destination.destination.includes(selectedDestination)) {
      return destination.id;
    }
  });
  return newTripDestinationID;
}

const estimateNewTripCost = () => {
  formatNewTrip();
  const destinationForNewTrip = destinations.find(destination => newTripInfo.destinationID === destination.id);
  const newTrip = new Trip(newTripInfo, destinationForNewTrip);
  const estimatedTripCost = newTrip.calculateTripCost();
  const tripLocation = newTrip.destinationInfo.destination;
  domUpdates.displayEstimatedTripCost(estimatedTripCost, tripLocation);
}

//~~~~~~~~~~// Event Listeners //~~~~~~~~~~//

// window.addEventListener('load', loadPage);
estimateCostButton.addEventListener('click', estimateNewTripCost);
bookTripButton.addEventListener('click', updateTrips);
loginButton.addEventListener('click', checkLoginInputs);
