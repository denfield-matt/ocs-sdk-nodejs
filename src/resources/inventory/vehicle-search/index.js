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
var schema_1 = require("@/resources/inventory/vehicles/schema");
var VehicleSearch = /** @class */ (function () {
    function VehicleSearch(ocs) {
        this.ocs = ocs;
    }
    /**
     * Perform a vehicle search
     * @param VehicleSearchVariables variables
     * @param string query
     * @param RequestOptions options (allows you to overwrite apikey / accountId on a per request basis)
     * @returns object
     */
    VehicleSearch.prototype.search = function (_a, query, options) {
        var filters = _a.filters, params = _a.params;
        return __awaiter(this, void 0, void 0, function () {
            var input, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        input = query || schema_1.SCHEMA;
                        return [4 /*yield*/, this.ocs.query((0, graphql_tag_1["default"])(templateObject_1 || (templateObject_1 = __makeTemplateObject(["query Search($filters: JSON, $params: RequestParams) {\n                search(filters: $filters, params: $params) {\n                    ", "\n                    data {\n                        ", "\n                    }\n                }\n            }"], ["query Search($filters: JSON, $params: RequestParams) {\n                search(filters: $filters, params: $params) {\n                    ", "\n                    data {\n                        ", "\n                    }\n                }\n            }"])), helpers_1.PAGINATION_SCHEMA, input), {
                                filters: filters || {},
                                params: params || {}
                            }, {}, // requestHeaders
                            options || {} // requestOptions
                            )];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, result.search || {}];
                }
            });
        });
    };
    /**
     * Get search facets
     * @param VehicleSearchVariables variables
     * @param RequestOptions options (allows you to overwrite apikey / accountId on a per request basis)
     * @returns object
     */
    VehicleSearch.prototype.facets = function (_a, options) {
        var filters = _a.filters, selectionKeys = _a.selectionKeys, rangeKeys = _a.rangeKeys;
        return __awaiter(this, void 0, void 0, function () {
            var variables, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        variables = {
                            filters: filters || {}
                        };
                        if (selectionKeys && Object.keys(selectionKeys).length)
                            variables.selectionKeys = selectionKeys;
                        if (rangeKeys && Object.keys(rangeKeys).length)
                            variables.rangeKeys = rangeKeys;
                        return [4 /*yield*/, this.ocs.query((0, graphql_tag_1["default"])(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n                query Query($filters: JSON, $selectionKeys: [String], $rangeKeys: [String]) {\n                    facets(filters: $filters, selectionKeys: $selectionKeys, rangeKeys: $rangeKeys)\n                }\n            "], ["\n                query Query($filters: JSON, $selectionKeys: [String], $rangeKeys: [String]) {\n                    facets(filters: $filters, selectionKeys: $selectionKeys, rangeKeys: $rangeKeys)\n                }\n            "]))), variables, {}, // requestHeaders
                            options || {} // requestOptions
                            )];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, result.facets || {}];
                }
            });
        });
    };
    /**
     * Get vehicle search with facets
     * @param object variables
     * @param string query
     * @param RequestOptions options (allows you to overwrite apikey / accountId on a per request basis)
     * @returns object
     */
    VehicleSearch.prototype.searchWithFacets = function (_a, query, options) {
        var filters = _a.filters, params = _a.params, selectionKeys = _a.selectionKeys, rangeKeys = _a.rangeKeys;
        return __awaiter(this, void 0, void 0, function () {
            var input, variables, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        input = query || schema_1.SCHEMA;
                        variables = {
                            filters: filters || {},
                            params: {
                                page: 1,
                                perPage: 10
                            }
                        };
                        if (params && Object.keys(params).length)
                            variables.params = params;
                        if (selectionKeys && Object.keys(selectionKeys).length)
                            variables.selectionKeys = selectionKeys;
                        if (rangeKeys && Object.keys(rangeKeys).length)
                            variables.rangeKeys = rangeKeys;
                        return [4 /*yield*/, this.ocs.query((0, graphql_tag_1["default"])(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n                query SearchWithFacets($params: RequestParams, $selectionKeys: [String], $rangeKeys: [String], $filters: JSON) {\n                    searchWithFacets(params: $params, selectionKeys: $selectionKeys, rangeKeys: $rangeKeys, filters: $filters) {\n                        facets\n                        results {\n                            ", "\n                            data {\n                                ", "\n                            }\n                        }\n                    }\n                }\n            "], ["\n                query SearchWithFacets($params: RequestParams, $selectionKeys: [String], $rangeKeys: [String], $filters: JSON) {\n                    searchWithFacets(params: $params, selectionKeys: $selectionKeys, rangeKeys: $rangeKeys, filters: $filters) {\n                        facets\n                        results {\n                            ", "\n                            data {\n                                ", "\n                            }\n                        }\n                    }\n                }\n            "])), helpers_1.PAGINATION_SCHEMA, input), variables, {}, // requestHeaders
                            options || {} // requestOptions
                            )];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, result.searchWithFacets || {}];
                }
            });
        });
    };
    return VehicleSearch;
}());
exports["default"] = VehicleSearch;
;
var templateObject_1, templateObject_2, templateObject_3;
