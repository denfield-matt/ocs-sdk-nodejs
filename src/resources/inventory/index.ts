import Vehicles from './vehicles';
import VehicleSearch from './vehicle-search';
import type OCS from '@/index';

export default class Inventory {
    ocs: OCS;
    vehicles: Vehicles;
    vehicleSearch: VehicleSearch;

    constructor( ocs: OCS ) {
        this.ocs = ocs;

        this.vehicles = new Vehicles( ocs );
        this.vehicleSearch = new VehicleSearch( ocs );
    }
}