const domUpdates = {
  displayWelcomeMessage(user) {
    const welcomeMessage = document.querySelector('.welcome-message');
    const name = user.travelerName.split(' ')[0];
    const userTrips = document.querySelector('.user-trips');
    welcomeMessage.innerText = `Welcome, ${name}!`;
    userTrips.innerText = `${name}'s Trips:`
  },

  generateDestinationDropdown(destinationData) {
    const dropdown = document.querySelector('.dropdown');
    const alphabetizedDestinations = destinationData.sort((a, b) => {
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

  displayTrips(tripData) {
    const tripDisplay = document.querySelector('.trip-display');
    tripData.forEach(trip => {
      tripDisplay.innerHTML += `
      <div class="trip-card">
        <h3 class="trip-destination">${trip.destinationInfo.destination}</h3>
        <img class="trip-image" src=${trip.destinationInfo.image} alt=${trip.destinationInfo.alt} height="200px" width="300px">
        <p class="trip-date">Date: ${trip.departureDate}</p>
        <p class="trip-duration">Duration: ${trip.tripDuration} days</p>
        <p class="trip-participants">Travelers: ${trip.numberOfTravelers}</p>
        <p class="trip-status">Status: ${trip.status.charAt(0).toUpperCase() +
       trip.status.slice(1)}</p>
      </div>
      `
    });
  },

  displayYearlyTotal(currentTraveler) {
    currentTraveler.addTripsForCurrentYear('2020');
    const yearlyCost = document.querySelector('.annual-message');
    const cost = currentTraveler.calculateYearlyTotal();
    console.log('cost', cost)
    yearlyCost.innerText = `You've spent $${cost} on travel this year.`;
  },
}

export default domUpdates;
