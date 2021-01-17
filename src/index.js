// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

import Traveler from './traveler';
import Trip from './trip';
import domUpdates from './domUpdates';

let travelers, trips, destinations, currentTraveler;


const getAllData = () => {
  let getTravelerData = fetch('http://localhost:3001/api/v1/travelers')
    .then(response => response.json());
  let getTripData = fetch('http://localhost:3001/api/v1/trips')
    .then(response => response.json());
  let getDestinationData = fetch('http://localhost:3001/api/v1/destinations')
    .then(response => response.json());

  Promise.all([getTravelerData, getTripData, getDestinationData])
    .then(data => createDatasets(data[0], data[1], data[2]));
};

const createDatasets = (travelerData, tripData, destinationData) => {
  travelers = travelerData.travelers;
  trips = tripData.trips;
  destinations = destinationData.destinations;
  // console.log('travelers', travelers)
  // console.log('trips', trips)
  // console.log('destinations', destinations)
  generateRandomTraveler(travelers);
  domUpdates.displayWelcomeMessage(currentTraveler);
  domUpdates.addDestinationsToDropdown(destinations);
  generateTrips(trips);
};


const getTripsForCurrentTraveler = (tripData, currentTraveler) => {
  const currentUsersTrips = tripData.filter(trip => {
    return trip.userID === currentTraveler.travelerID;
  });
  currentTraveler.trips.push(currentUsersTrips);
  console.log('currentTravelers trips', currentTraveler.trips)
  domUpdates.displayTrips(currentUsersTrips, destinations);
}

const generateRandomTraveler = (data) => {
  let userID = Math.floor(Math.random() * data.length);
  let dataForRandomTraveler = data.find(traveler => {
    return traveler.id === userID;
  })
  currentTraveler = new Traveler(dataForRandomTraveler);
  // console.log('currentTraveler', currentTraveler)
  return currentTraveler;
};

const generateTrips = (tripData) => {
  let allTrips = [];
  tripData.forEach(trip => {
    let newTrip = new Trip(trip);
    allTrips.push(newTrip);
  });
  // console.log('allrips', allTrips)
  getTripsForCurrentTraveler(allTrips, currentTraveler);
};

const onStartup = () => {
  getAllData();
};




window.addEventListener('load', onStartup);
