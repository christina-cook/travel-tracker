class Trip {
  constructor(tripData) {
    this.tripID = tripData.id;
    this.userID = tripData.userID;
    this.destinationID = tripData.destinationID;
    this.travelers = tripData.travelers;
    this.departureDate = tripData.date;
    this.tripDuration = tripData.duration;
    this.status = tripData.status;
    this.suggestedActivities = tripData.suggestedActivities;
  }

  // estimateCostOfTravel() {
  //   // calculate cost of trip
  //   // include 10% agent fee
  // }
  //
  // determineTripStatus() {
  //   // either pending or approved
  // }
}

export default Trip;
