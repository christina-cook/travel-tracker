const domUpdates = {
  displayWelcomeMessage(user) {
    console.log('user', user)
    const welcomeMessage = document.querySelector('.welcome-message');
    const name = user.travelerName.split(' ')[0];
    welcomeMessage.innerText = `Welcome, ${name}!`;
    console.log('name', name)
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
}

export default domUpdates;
