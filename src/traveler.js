import Trip from './trip';

class Traveler {
  constructor(travelerData) {
    this.travelerID = travelerData.id;
    this.travelerName = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.trips = [];
    this.tripsThisYear = [];
    this.totalSpentThisYear;
    // this.pastTrips = [];
    // this.presentTrips = [];
    // this.upcomingTrips = [];
    // this.pendingTrips = [];
  }

  addTripsForCurrentTraveler(tripData, destinationData) {
    const currentUsersTrips = tripData.filter(trip => {
      return trip.userID === this.travelerID;
    })
    let tripLocation;
    currentUsersTrips.forEach(trip => {
      destinationData.forEach(destination => {
        if (trip.destinationID === destination.id) {
          tripLocation = destination;
        }
        return tripLocation;
      })
      this.trips.push(new Trip(trip, tripLocation));
    });
    return this.trips.sort((a, b) => {
      return new Date(b.departureDate) - new Date(a.departureDate);
    });
  }

  addTripsForCurrentYear(year) {
    const currentYear = year.split('/')[0];
    this.trips.filter(trip => {
      if (trip.departureDate.split('/')[0] === currentYear) {
        this.tripsThisYear.push(trip);
      }
      return this.tripsThisYear;
    })
  }

  calculateYearlyTotal() {
    let totalYearlyCost = this.tripsThisYear.reduce((total, trip) => {
      total += trip.calculateTripCost();
      return total;
    }, 0);
    this.totalSpentThisYear = +totalYearlyCost.toFixed(0);
    return this.totalSpentThisYear;
  }

  // sortTrips() {
  //   sort trips based on date and status
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
