import Trip from './trip';

class Traveler {
  constructor(travelerData) {
    this.travelerID = travelerData.id;
    this.travelerName = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.trips = [];
    this.tripsThisYear = [];
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
    })
    // console.log('this.trips', this.trips)
    return this.trips;
  }

  addTripsForCurrentYear(year) {
    this.trips.filter(trip => {
      if (trip.departureDate.split('/')[0] === year) {
        this.tripsThisYear.push(trip)
      }
      // console.log('this.tripsThisYear', this.tripsThisYear)
      return this.tripsThisYear;
    })
  }

  calculateYearlyTotal() {
    // calculate total for all their trips from the current date back 365 days
    // or calculate the total by passing in a year argument
    let totalYearlyCost = this.tripsThisYear.reduce((total, trip) => {
      total += trip.calculateTripCost();
      // console.log('reduced total', total)
      return total;
    }, 0);
    return totalYearlyCost.toFixed(0);
  }

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
