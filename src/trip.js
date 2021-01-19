import moment from 'moment';


class Trip {
  constructor(tripData, destination) {
    this.tripID = tripData.id;
    this.userID = tripData.userID;
    this.destinationID = tripData.destinationID;
    this.numberOfTravelers = tripData.travelers;
    this.departureDate = tripData.date;
    this.tripDuration = tripData.duration;
    this.tripEndDate;
    this.status = tripData.status;
    this.suggestedActivities = tripData.suggestedActivities;
    this.destinationInfo = destination;
    this.totalTripCost;
  }

  calculateTripCost() {
    this.determineTripEndDate();
/
    const hotelCost = this.destinationInfo.estimatedLodgingCostPerDay * this.tripDuration;
    const flightCost = this.destinationInfo.estimatedFlightCostPerPerson * this.numberOfTravelers;
    const totalCost = hotelCost + flightCost;
    const agentFee = totalCost * .10;
    this.totalTripCost = totalCost + agentFee;
    return this.totalTripCost;
  }

  determineTripEndDate() {
    console.log(this.departureDate)
    const tripStart = moment(this.departureDate).format('YYYY/MM/DD');
    this.tripEndDate = moment(tripStart).add(this.tripDuration, 'days').format('YYYY/MM/DD');
    console.log('tripStart', tripStart);
    console.log('tripEndDate', this.tripEndDate);
  }


}

export default Trip;
