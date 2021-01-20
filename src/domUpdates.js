const domUpdates = {
  displayWelcomeMessage(user) {
    const welcomeMessage = document.querySelector('.welcome-message');
    const name = user.travelerName.split(' ')[0];
    const userTrips = document.querySelector('.user-trips');
    const userAvatar = document.querySelector('.user-avatar');
    welcomeMessage.innerText = `Welcome, ${name}!`;
    userAvatar.classList.remove('hidden');
    userTrips.innerText = `${name}'s Trips:`;
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
        <img class="trip-image" src=${trip.destinationInfo.image} alt=${trip.destinationInfo.alt}">
        <p class="card-text trip-date">Date: ${trip.departureDate}</p>
        <p class="card-text trip-duration">Duration: ${trip.tripDuration} days</p>
        <p class="card-text trip-participants">Travelers: ${trip.numberOfTravelers}</p>
        <p class="card-text trip-status">Status: ${trip.status}</p>
      </div>
      `;
    });
  },

  displayYearlyTotal(currentTraveler, yearStart) {
    currentTraveler.addTripsForCurrentYear(yearStart);
    const yearlyCost = document.querySelector('.annual-message');
    const cost = currentTraveler.calculateYearlyTotal();
    yearlyCost.innerText = `You've spent $${cost} on travel this year.`;
  },

  displayEstimatedTripCost(estimatedCost, location) {
    event.preventDefault();
    const estimatedCostText = document.querySelector('.estimated-cost');
    estimatedCostText.innerText = `The estimated cost for your trip to ${location} is $${estimatedCost}.`;
  },

  clearDashboard() {
    const tripDisplay = document.querySelector('.trip-display');
    tripDisplay.innerHTML = '';
  },

  clearForm() {
    const bookingForm = document.querySelector('.booking-form');
    bookingForm.reset();
  },

  updateTripCostMessage() {
    const estimatedCostText = document.querySelector('.estimated-cost');
    estimatedCostText.innerText = `Fill out the form to book your next trip.`;
  }
}

export default domUpdates;
