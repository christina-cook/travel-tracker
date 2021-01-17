
//~~~~~~~~~~// Imports //~~~~~~~~~~//

import './css/base.scss';
import './images/logo.png'
import './images/stewardess.png'
import Traveler from './traveler';
import Trip from './trip';
import domUpdates from './domUpdates';

//~~~~~~~~~~// Global Variables //~~~~~~~~~~//

let travelers, trips, destinations, currentTraveler;

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
  generateRandomTraveler(travelers);
  domUpdates.displayWelcomeMessage(currentTraveler);
  domUpdates.generateDestinationDropdown(destinations);
  currentTraveler.addTripsForCurrentTraveler(trips, destinations);
  domUpdates.displayTrips(currentTraveler.trips, destinations);
  domUpdates.displayYearlyTotal(currentTraveler);
};

const generateRandomTraveler = (travelerData) => {
  let userID = Math.floor(Math.random() * travelerData.length);
  let dataForRandomTraveler = travelerData.find(traveler => {
    return traveler.id === userID;
  })
  currentTraveler = new Traveler(dataForRandomTraveler);
  return currentTraveler;
};

//~~~~~~~~~~// Event Listeners //~~~~~~~~~~//

window.addEventListener('load', onStartup);
