import chai from 'chai';
const expect = chai.expect;

import Traveler from '../src/traveler';
import travelerData from './test-datasets/traveler-data';
import tripData from './test-datasets/trip-data';
import destinationData from './test-datasets/destination-data';

describe('Traveler class and methods', () => {

  let traveler1, traveler2;

  beforeEach(() => {
    traveler1 = new Traveler(travelerData[0]);
    traveler2 = new Traveler(travelerData[1]);
  });

  it('Should be a function', () => {
    expect(Traveler).to.be.a('function');
  });

  it('Should be an instance of Traveler', () => {
    expect(traveler1).to.be.an.instanceof(Traveler);
  });

  it('Should have an ID', () => {
    expect(traveler1.travelerID).to.equal(1);
  });

  it('Should have a name', () => {
    expect(traveler2.travelerName).to.equal('Rachael Vaughten');
  });

  it('Should have a type', () => {
    expect(traveler1.travelerType).to.equal('relaxer');
  });

  it('Should hold all the user\'s trips', () => {
    expect(traveler2.trips).to.eql([]);
  });

  it('Should be able to store all trips for a user', () => {
    traveler1.addTripsForCurrentTraveler(tripData, destinationData);
    expect(traveler1.trips.length).to.equal(4);
  });

  it('Should be able to store trips for the current year', () => {
    traveler2.addTripsForCurrentTraveler(tripData, destinationData);
    expect(traveler2.trips.length).to.equal(4);
    expect(traveler2.tripsThisYear).to.eql([]);
    traveler2.addTripsForCurrentYear('2021');
    expect(traveler2.tripsThisYear.length).to.equal(1);
  });

  it('Should be able to calculate total amount spent on travel in the current year', () => {
    traveler2.addTripsForCurrentTraveler(tripData, destinationData);
    traveler2.addTripsForCurrentYear('2021');
    traveler2.calculateYearlyTotal();
    expect(traveler2.totalSpentThisYear).to.equal(4972);
  })

})
