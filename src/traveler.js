class Traveler {
  constructor(travelerData) {
    this.travelerID = travelerData.id;
    this.travelerName = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.trips = [];
    // this.pastTrips = [];
    // this.presentTrips = [];
    // this.upcomingTrips = [];
    // this.pendingTrips = [];
    // this.yearlyAmountSpent = 0;
  }

  // calculateYearlyAmountSpent() {
  //
  // }
  //
  // sortTrips() {
  //   // sort trips into present, past, upcoming, pending
  // }
}

export default Traveler;
