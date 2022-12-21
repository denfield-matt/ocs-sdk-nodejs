"use strict";
exports.__esModule = true;
var vehicles_1 = require("./vehicles");
var vehicle_search_1 = require("./vehicle-search");
var Inventory = /** @class */ (function () {
    function Inventory(ocs) {
        this.ocs = ocs;
        this.vehicles = new vehicles_1["default"](ocs);
        this.vehicleSearch = new vehicle_search_1["default"](ocs);
    }
    return Inventory;
}());
exports["default"] = Inventory;
