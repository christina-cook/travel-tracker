// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

// import fetchRequests from './fetchRequests';

let travelers, trips, destinations;


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
  console.log('travelers', travelers)
  console.log('trips', trips)
  console.log('destinations', destinations)
}


const onStartup = () => {
  getAllData();
}



window.addEventListener('load', onStartup);
