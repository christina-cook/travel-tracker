import chai from 'chai';
const expect = chai.expect;

import Trip from '../src/trip';
import tripData from './test-datasets/trip-data';
import destinationData from './test-datasets/destination-data';


describe('Trip class and methods', () => {

  let trip4;

  beforeEach(() => {
    trip4 = new Trip(tripData[3], destinationData[13]);
  });

  it('Should be a function', () => {
    expect(Trip).to.be.a('function');
  });

  it('Should be an instance of Trip', () => {
    expect(trip4).to.be.an.instanceof(Trip);
  });

  it('Should have an ID', () => {
    expect(trip4.tripID).to.equal(4);
  });

  it('Should have userID', () => {
    expect(trip4.userID).to.equal(1)
  });

  it('Should have a destinationID', () => {
    expect(trip4.destinationID).to.equal(14);
  });

  it('Should have a number of travelers', () => {
    expect(trip4.numberOfTravelers).to.equal(2);
  });

  it('Should have a departure date', () => {
    expect(trip4.departureDate).to.equal('2020/02/25');
  });

  it('Should have a trip duration', () => {
    expect(trip4.tripDuration).to.equal(10);
  });

  it('Should have a trip status', () => {
    expect(trip4.status).to.equal('approved');
  });

  it('Should have suggested activities', () => {
    expect(trip4.suggestedActivities).to.eql([]);
  });

  it('Should have destinationInfo', () => {
    expect(trip4.destinationInfo).to.eql(
      {
        "id": 14,
        "destination": "Marrakesh, Morocco",
        "estimatedLodgingCostPerDay": 70,
        "estimatedFlightCostPerPerson": 830,
        "image": "https://images.unsplash.com/photo-1517821362941-f7f753200fef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80",
        "alt": "people buying oranges and other fruit from a street vendor"
      });
  });

  it('Should calculate a total trip cost', () => {
    trip4.calculateTripCost();
    expect(trip4.totalTripCost).to.equal(2596);
  });

  it('Should be able to determine the end date of a trip', () => {
    trip4.determineTripEndDate();
    expect(trip4.tripEndDate).to.equal('2020/03/06');
  });

  it('Should be able to update the status of a trip', () => {
    trip4.updateTripStatus();
    expect(trip4.status).to.equal('past trip');
  });
});
