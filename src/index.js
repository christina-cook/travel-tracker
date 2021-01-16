// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

console.log('This is the JavaScript entry file - your code begins here.');

// import fetchRequests from './fetchRequests';



const getAllData = () => {
  let getTravelerData = fetch('http://localhost:3001/api/v1/travelers')
    .then(response => response.json());
  let getTripData = fetch('http://localhost:3001/api/v1/trips')
    .then(response => response.json());
  let getDestinationData = fetch('http://localhost:3001/api/v1/destinations')
    .then(response => response.json());

  Promise.all([getTravelerData, getTripData, getDestinationData])
    .then(response => {
      const dataset = {};
      dataset.travelerData = response[0]
      dataset.tripData = response[1];
      dataset.destinationData = response[2];
      console.log(dataset)
      return dataset;
    })
}

const onStartup = () => {
  getAllData();
}


window.addEventListener('load', onStartup);
