import Trip from './trip';

class Traveler {
  constructor(travelerData) {
    this.travelerID = travelerData.id;
    this.travelerName = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.trips = [];
    this.tripsThisYear = [];
    this.totalSpentThisYear;
  }

  addTripsForCurrentTraveler(tripData, destinationData, today) {
    const currentUsersTrips = tripData.filter(trip => {
      return trip.userID === this.travelerID;
    });
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
    this.verifyTripStatus(today);
    return this.trips.sort((a, b) => {
      return new Date(b.departureDate) - new Date(a.departureDate);
    });
  }

  verifyTripStatus(currentDate) {
    this.trips.forEach(trip => {
      trip.updateTripStatus(currentDate);
    });
  }

  addTripsForCurrentYear(year) {
    const currentYear = year.split('/')[0];
    this.trips.filter(trip => {
      if (trip.departureDate.split('/')[0] === currentYear) {
        this.tripsThisYear.push(trip);
      }
      return this.tripsThisYear;
    });
  }

  calculateYearlyTotal() {
    let totalYearlyCost = this.tripsThisYear.reduce((total, trip) => {
      total += trip.calculateTripCost();
      return total;
    }, 0);
    this.totalSpentThisYear = +totalYearlyCost.toFixed(0);
    return this.totalSpentThisYear;
  }
}

export default Traveler;
