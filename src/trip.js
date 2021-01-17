class Trip {
  constructor(tripData, destination) {
    this.tripID = tripData.id;
    this.userID = tripData.userID;
    this.destinationID = tripData.destinationID;
    this.numberOfTravelers = tripData.travelers;
    this.departureDate = tripData.date;
    this.tripDuration = tripData.duration;
    this.status = tripData.status;
    this.suggestedActivities = tripData.suggestedActivities;
    this.destinationInfo = destination;
    this.totalTripCost;
  }

  calculateTripCost() {
    const hotelCost = this.destinationInfo.estimatedLodgingCostPerDay * this.tripDuration;
    const roundtripFlightCost = (this.destinationInfo.estimatedFlightCostPerPerson * this.numberOfTravelers) * 2;
    const totalCost = hotelCost + roundtripFlightCost;
    const agentFee = totalCost * .10;
    this.totalTripCost = totalCost + agentFee;
    console.log('this.totalTripCost', this.totalTripCost)
    return this.totalTripCost;
  }

}

export default Trip;
