
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

//~~~~~~~~~~// Event Handlers //~~~~~~~~~~//

const onStartup = () => {
  getAllData();
};

const getAllData = () => {
  let getTravelerData = fetch('http://localhost:3001/api/v1/travelers')
    .then(response => response.json());
  let getTripData = fetch('http://localhost:3001/api/v1/trips')
    .then(response => response.json());
  let getDestinationData = fetch('http://localhost:3001/api/v1/destinations')
    .then(response => response.json());

  Promise.all([getTravelerData, getTripData, getDestinationData])
    .then(data => displayDashboard(data[0], data[1], data[2]));
};

const displayDashboard = (travelerData, tripData, destinationData) => {
  travelers = travelerData.travelers;
  trips = tripData.trips;
  destinations = destinationData.destinations;
  // generateRandomTraveler(travelers);
  createTraveler(travelers[8])
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

const createTraveler = (travelerData) => {
  currentTraveler = new Traveler(travelerData);
  return currentTraveler;

}

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
  console.log('estimatedTripCost', estimatedTripCost)
  // domUpdates.displayEstimatedTripCost(estimatedTripCost);
}

//~~~~~~~~~~// Event Listeners //~~~~~~~~~~//

window.addEventListener('load', onStartup);
estimateCostButton.addEventListener('click', estimateNewTripCost);
bookTripButton.addEventListener('click', updateTrips);
