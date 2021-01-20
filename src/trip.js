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
    const hotelCost = this.destinationInfo.estimatedLodgingCostPerDay * this.tripDuration;
    const flightCost = this.destinationInfo.estimatedFlightCostPerPerson * this.numberOfTravelers;
    const totalCost = hotelCost + flightCost;
    const agentFee = totalCost * .10;
    this.totalTripCost = totalCost + agentFee;
    return this.totalTripCost;
  }

  determineTripEndDate() {
    const tripStart = moment(this.departureDate).format('YYYY/MM/DD');
    this.tripEndDate = moment(tripStart).add(this.tripDuration, 'days').format('YYYY/MM/DD');
  }

  updateTripStatus(today) {
    this.determineTripEndDate();
    const tripStart = moment(this.departureDate).format('YYYY/MM/DD');
    if (moment(this.tripEndDate).isBefore(today)) {
      this.status = 'past trip';
    } else if (moment(tripStart).isAfter(today) && this.status === 'approved') {
      this.status = 'upcoming trip';
    } else if (moment(tripStart).isBefore(today) && moment(this.tripEndDate).isAfter(today)) {
      this.status = 'current trip';
    } else if (this.status === 'pending') {
      this.status = 'trip pending';
    }
  }
}

export default Trip;
