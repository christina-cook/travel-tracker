// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

// import fetchRequests from './fetchRequests';
import Traveler from './traveler';

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
}

const generateRandomTraveler = (data) => {
  let userID = Math.floor(Math.random() * data.length);
  // console.log('userID', userID)
  let dataForRandomTraveler = data.find(traveler => {
    return traveler.id === userID;
  })
  // console.log('dataForRandomTraveler', dataForRandomTraveler)
  currentTraveler = new Traveler(dataForRandomTraveler)
  // console.log('currentTraveler', currentTraveler)
  return currentTraveler;
}

const onStartup = () => {
  getAllData();
}



window.addEventListener('load', onStartup);
