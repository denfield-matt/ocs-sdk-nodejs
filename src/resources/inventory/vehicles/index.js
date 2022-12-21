"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var graphql_tag_1 = require("graphql-tag");
var helpers_1 = require("@/helpers");
var schema_1 = require("./schema");
var Vehicles = /** @class */ (function () {
    function Vehicles(ocs) {
        this.ocs = ocs;
    }
    /**
     * List all vehicles
     * @param object variables
     * @param string query
     * @param RequestOptions options (allows you to overwrite apikey / accountId on a per request basis)
     * @returns object
     */
    Vehicles.prototype.list = function (_a, query, options) {
        var page = _a.page, perPage = _a.perPage, sort = _a.sort, sortBy = _a.sortBy;
        return __awaiter(this, void 0, void 0, function () {
            var input, variables, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        input = query || schema_1.SCHEMA;
                        variables = {};
                        if (page)
                            variables.page = page;
                        if (perPage)
                            variables.perPage = perPage;
                        if (sort && sortBy)
                            variables.sort = sort;
                        if (sort && sortBy)
                            variables.sortBy = sortBy;
                        return [4 /*yield*/, this.ocs.query((0, graphql_tag_1["default"])(templateObject_1 || (templateObject_1 = __makeTemplateObject(["query Vehicles($page: Int, $perPage: Int, $sort: String, $sortBy: String) {\n                vehicles(page: $page, perPage: $perPage, sort: $sort, sortBy: $sortBy) {\n                    ", "\n                    data {\n                        ", "\n                    }\n                }\n            }"], ["query Vehicles($page: Int, $perPage: Int, $sort: String, $sortBy: String) {\n                vehicles(page: $page, perPage: $perPage, sort: $sort, sortBy: $sortBy) {\n                    ", "\n                    data {\n                        ", "\n                    }\n                }\n            }"])), helpers_1.PAGINATION_SCHEMA, input), variables, {}, // requestHeaders
                            options || {} // requestOptions
                            )];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, result.vehicles || {}];
                }
            });
        });
    };
    /**
     * Create a vehicle
     * @param object data
     * @param RequestOptions options (allows you to overwrite apikey / accountId on a per request basis)
     * @returns object
     */
    Vehicles.prototype.create = function (data, options) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ocs.mutate((0, graphql_tag_1["default"])(templateObject_2 || (templateObject_2 = __makeTemplateObject(["mutation StoreVehicle($data: VehicleInput!) {\n                storeVehicle(data: $data) {\n                    ", "\n                }\n            }"], ["mutation StoreVehicle($data: VehicleInput!) {\n                storeVehicle(data: $data) {\n                    ", "\n                }\n            }"])), schema_1.SCHEMA), { data: data }, {}, // requestHeaders
                        options || {} // requestOptions
                        )];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.storeVehicle || {}];
                }
            });
        });
    };
    /**
     * Retrieve a vehicle
     * @param string id
     * @param string query
     * @param RequestOptions options (allows you to overwrite apikey / accountId on a per request basis)
     * @returns object
     */
    Vehicles.prototype.retrieve = function (id, query, options) {
        return __awaiter(this, void 0, void 0, function () {
            var input, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input = query || schema_1.SCHEMA;
                        return [4 /*yield*/, this.ocs.query((0, graphql_tag_1["default"])(templateObject_3 || (templateObject_3 = __makeTemplateObject(["query Vehicle($value: String!, $key: String) {\n                vehicle(value: $value, key: $key) {\n                    ", "\n                }\n            }"], ["query Vehicle($value: String!, $key: String) {\n                vehicle(value: $value, key: $key) {\n                    ", "\n                }\n            }"])), input), {
                                key: 'id',
                                value: id
                            }, {}, // requestHeaders
                            options || {} // requestOptions
                            )];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.vehicle || {}];
                }
            });
        });
    };
    /**
     * Update a vehicle
     * @param string id
     * @param object data
     * @param string query
     * @param RequestOptions options (allows you to overwrite apikey / accountId on a per request basis)
     * @returns object
     */
    Vehicles.prototype.update = function (id, data, query, options) {
        return __awaiter(this, void 0, void 0, function () {
            var input, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input = query || schema_1.SCHEMA;
                        return [4 /*yield*/, this.ocs.mutate((0, graphql_tag_1["default"])(templateObject_4 || (templateObject_4 = __makeTemplateObject(["mutation UpdateVehicle($value: String!, $data: VehicleInput!, $key: String) {\n                updateVehicle(value: $value, data: $data, key: $key) {\n                    ", "\n                }\n            }"], ["mutation UpdateVehicle($value: String!, $data: VehicleInput!, $key: String) {\n                updateVehicle(value: $value, data: $data, key: $key) {\n                    ", "\n                }\n            }"])), input), {
                                key: 'id',
                                value: id,
                                data: data
                            }, {}, // requestHeaders
                            options || {} // requestOptions
                            )];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.updateVehicle || {}];
                }
            });
        });
    };
    /**
     * Delete a vehicle
     * @param string id
     * @param RequestOptions options (allows you to overwrite apikey / accountId on a per request basis)
     * @returns object
     */
    Vehicles.prototype.destroy = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ocs.mutate((0, graphql_tag_1["default"])(templateObject_5 || (templateObject_5 = __makeTemplateObject(["mutation DestoryVehicle($value: String!) {\n                destoryVehicle(value: $value)\n            }"], ["mutation DestoryVehicle($value: String!) {\n                destoryVehicle(value: $value)\n            }"]))), {
                            value: id
                        }, {}, // requestHeaders
                        options || {} // requestOptions
                        )];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.destoryVehicle || false];
                }
            });
        });
    };
    return Vehicles;
}());
exports["default"] = Vehicles;
;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
