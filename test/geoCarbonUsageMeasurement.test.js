import chai from 'chai';
import GeoCarbonUsageMeasurement from '../src/geoCarbonUsageMeasurement.js';
import chaiAsPromised from 'chai-as-promised';
import { expect } from "chai";

chai.should();

describe('GeoCarbonUsageMeasurement', () => {
  describe('fetchPowerUsage', () => {
    it('should fetch power usage based on the current location', async () => {
      // Mock the functions used in the GeoCarbonUsageMeasurement class
      const fetchGeoInfoMock = async () => ({ country_code3: 'USA' });
      const getCarbonUsageMock = async () => 379.26;

      // Create an instance of GeoCarbonUsageMeasurement with mocked functions
      const geoCarbonUsageMeasurement = new GeoCarbonUsageMeasurement(fetchGeoInfoMock, getCarbonUsageMock);

      // Call the fetchPowerUsage method
      const powerUsage = await geoCarbonUsageMeasurement.fetchPowerUsage();

      // Assert that the result matches the expected power usage
      powerUsage.should.equal(379.26);
    });

    it('should handle errors during power usage fetching', async () => {
      chai.use(chaiAsPromised);
      // Mock the functions used in the GeoCarbonUsageMeasurement class to simulate an error
      const fetchGeoInfoMockWithError = async () => {
        throw new Error('Mock fetchGeoInfo error');
      };

      // Create an instance of GeoCarbonUsageMeasurement with the mocked function
      const geoCarbonUsageMeasurement = new GeoCarbonUsageMeasurement(fetchGeoInfoMockWithError);

      // Call the fetchPowerUsage method and expect it to throw an error
      await expect(geoCarbonUsageMeasurement.fetchPowerUsage()).to.eventually.throw;
    });
  });
});