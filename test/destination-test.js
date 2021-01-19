import chai from 'chai';
const expect = chai.expect;

import Destination from '../src/destination';
import destinationData from './test-datasets/destination-data';

describe('Destination class', () => {

  let destination1, destination2;

  beforeEach(() => {
    destination1 = new Destination(destinationData[0]);
    destination2 = new Destination(destinationData[1]);
  });

  it('Should be a function', () => {
    expect(Destination).to.be.a('function');
  });

  it('Should be an instance of Destination', () => {
    expect(destination1).to.be.an.instanceof(Destination);
  });

  it('Should be a new instance of Destination', () => {
    expect(destination2).to.be.an.instanceof(Destination);
  });

  it('Should have an ID', () => {
    expect(destination1.destinationID).to.equal(1);
  });

  it('Should have a location name', () => {
    expect(destination1.destination).to.equal('Lima, Peru');
  });

  it('Should have an estimated hotel cost per day', () => {
    expect(destination1.estimatedLodgingCostPerDay).to.equal(70);
  });

  it('Should have an estimated flight cost per person', () => {
    expect(destination2.estimatedFlightCostPerPerson).to.equal(780);
  });

  it('Should have an image', () => {
    expect(destination2.image).to.equal('https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80');
  });

  it('Should have alt text', () => {
    expect(destination2.alt).to.equal('city with boats on the water during the day time');
  });
})
