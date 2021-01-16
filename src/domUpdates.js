const domUpdates = {
  displayWelcomeMessage(user) {
    console.log('user', user)
    const welcomeMessage = document.querySelector('.welcome-message');
    const name = user.travelerName.split(' ')[0];
    welcomeMessage.innerText = `Welcome, ${name}!`;
    console.log('name', name)
  }
}

export default domUpdates;
