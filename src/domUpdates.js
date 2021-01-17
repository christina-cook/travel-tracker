const domUpdates = {
  displayWelcomeMessage(user) {
    const welcomeMessage = document.querySelector('.welcome-message');
    const name = user.travelerName.split(' ')[0];
    welcomeMessage.innerText = `Welcome, ${name}!`;
  },

  addDestinationsToDropdown(data) {
    const dropdown = document.querySelector('.dropdown');
    const alphabetizedDestinations = data.sort((a, b) => {
      let destinationA = a.destination;
      let destinationB = b.destination;
      if (destinationA < destinationB) {
        return -1;
      }
      if (destinationA > destinationB) {
        return 1;
      }
      return 0;
    });
    alphabetizedDestinations.forEach(destination => {
      let destinationOption = `
        <option value=${destination.destination} id=${destination.id}>
          ${destination.destination}
        </option>`;
      dropdown.insertAdjacentHTML('beforeend', destinationOption);
    });
  },

  displayTrips(tripData, destinations) {
    console.log('tripData', tripData)
    const tripLog = document.querySelector('.trip-log');
    tripData.forEach(trip => {
      destinations.find(destination => {
        if (trip.destinationID === destination.id) {
          let location = destination.destination
          tripLog.innerHTML += `
          <div class="trip-card">
            <h3 class="trip-destination">${location}</h3>
            <img class="trip-image" src=${destination.image} alt=${destination.alt}>
            <p class="trip-date">Date: ${trip.departureDate}</p>
            <p class="trip-duration">Duration: ${trip.tripDuration} days</p>
            <p class="trip-participants">Travelers: ${trip.travelers}</p>
            <p class="trip-status">Status: ${trip.status.charAt(0).toUpperCase() +
           trip.status.slice(1)}</p>
          </div>
          `
        }
      });
    });
  },
}

export default domUpdates;
