import Vehicles from './vehicles/index.mjs';
import VehicleSearch from './vehicle-search/index.mjs';

export default class Inventory {
    constructor( ocs ) {
        this.ocs = ocs;

        this.vehicles = new Vehicles( ocs );
        this.vehicleSearch = new VehicleSearch( ocs );
    }
}