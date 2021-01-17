class Trip {
  constructor(tripData, destination) {
    this.tripID = tripData.id;
    this.userID = tripData.userID;
    this.destinationID = tripData.destinationID;
    this.travelers = tripData.travelers;
    this.departureDate = tripData.date;
    this.tripDuration = tripData.duration;
    this.status = tripData.status;
    this.suggestedActivities = tripData.suggestedActivities;
    this.destinationInfo = destination;
    this.totalTripCost;
  }

  calculateTripCost(destinationData) {
    // calculate cost of trip
    // include 10% agent fee
    console.log('destinationData', destinationData);
  }

  // determineTripStatus() {
  //   // either pending or approved
  // }
}

export default Trip;
