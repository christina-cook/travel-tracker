import Trip from './trip';

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
    // this.yearlyTotal;
  }

  addTripsForCurrentTraveler(tripData) {
    // filter through all the trips data
    // if the userID on a trip matches the travelerID,
    // push trip to this.trips (instantiating as a new trip)
    const currentUsersTrips = tripData.filter(trip => {
      return trip.userID === this.travelerID;
    })
    currentUsersTrips.forEach(trip => {
      this.trips.push(new Trip(trip));
    })
    // console.log('this.trips', this.trips)
    return this.trips;
  }

  // calculateYearlyTotal() {
  //  calculate total for all their trips from the current date back 365 days
  //  or calculate the total by passing in a year argument
  // }
  //
  // sortTrips() {
  //   // sort trips into present, past, upcoming, pending
  // }

  // sortPending() {
  //   // if the status of the trip is pending, push trip to pendingTrips
  // }
  //
  // sortUpcoming() {
  //   // if the departureDate is greater than the current date,
  //   // push trip to upcomingTrips
  // }
  //
  // sortPast() {
  //   // if the end date is less than the current date,
  //   // push trip to pastTrips
  // }
  //
  // sortCurrent() {
  //   // if the current date greater than the departureDate and less than
  //   // the end date, push trip to currentTrips
  // }
}

export default Traveler;
