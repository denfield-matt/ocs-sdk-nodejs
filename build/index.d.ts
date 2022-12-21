declare module "helpers/pagination/index" {
    export const PAGINATION_SCHEMA = "\n    links {\n        totalResults\n        totalPages\n        page\n        perPage\n        prevPage\n        nextPage\n    }\n";
}
declare module "helpers/index" {
    export * from "helpers/pagination/index";
}
declare module "resources/inventory/vehicles/schema" {
    export const SCHEMA = "\n    id\n    external_driver\n    external_id\n    class\n    make\n    model\n    range\n    derivative\n    vrm\n    vin\n    bodyType\n    fuelType\n    regDate\n    doors\n    seats\n    mileage\n    colour\n    transmission\n    engineSize\n    enginePower\n    powerTrain\n    emissions\n    acceleration {\n        mph\n        khp\n        zeroTo60Mph\n        zeroTo100Kph\n        maxSpeedMph\n        maxSpeedKph\n    }\n    previousOwners\n    prices {\n        vatInclusive\n        price\n        otr\n    }\n    mpg {\n        extra\n        urban\n        combined\n    }\n    tags\n    dimensions {\n        height\n        width\n        length\n        wheelBase\n        axelCount\n        grossVehicleWeight\n        grossCombinedWeight\n        kerbWeight\n        unladenWeight\n    }\n    images\n    spec\n    states\n    meta\n    created_at\n    updated_at\n";
}
declare module "types/index" {
    export type RequestOptions = {
        apiKey?: string;
        accountId?: string;
    };
    export type Paginator = {
        page?: number;
        perPage?: number;
        sort?: string;
        sortBy?: string;
    };
}
declare module "resources/inventory/vehicles/index" {
    import type OCS from "index";
    import { RequestOptions, Paginator } from "types/index";
    export default class Vehicles {
        ocs: OCS;
        constructor(ocs: OCS);
        /**
         * List all vehicles
         * @param object variables
         * @param string query
         * @param RequestOptions options (allows you to overwrite apikey / accountId on a per request basis)
         * @returns object
         */
        list({ page, perPage, sort, sortBy }: Paginator, query: string, options: RequestOptions): Promise<any>;
        /**
         * Create a vehicle
         * @param object data
         * @param RequestOptions options (allows you to overwrite apikey / accountId on a per request basis)
         * @returns object
         */
        create(data: any, options: RequestOptions): Promise<any>;
        /**
         * Retrieve a vehicle
         * @param string id
         * @param string query
         * @param RequestOptions options (allows you to overwrite apikey / accountId on a per request basis)
         * @returns object
         */
        retrieve(id: string, query: string, options: RequestOptions): Promise<any>;
        /**
         * Update a vehicle
         * @param string id
         * @param object data
         * @param string query
         * @param RequestOptions options (allows you to overwrite apikey / accountId on a per request basis)
         * @returns object
         */
        update(id: string, data: any, query: string, options: RequestOptions): Promise<any>;
        /**
         * Delete a vehicle
         * @param string id
         * @param RequestOptions options (allows you to overwrite apikey / accountId on a per request basis)
         * @returns object
         */
        destroy(id: string, options: RequestOptions): Promise<any>;
    }
}
declare module "resources/inventory/vehicle-search/index" {
    import type OCS from "index";
    import { RequestOptions, Paginator } from "types/index";
    type VehicleSearchVariables = {
        filters?: any;
        params?: Paginator;
        selectionKeys?: [string];
        rangeKeys?: [string];
    };
    export default class VehicleSearch {
        ocs: OCS;
        constructor(ocs: OCS);
        /**
         * Perform a vehicle search
         * @param VehicleSearchVariables variables
         * @param string query
         * @param RequestOptions options (allows you to overwrite apikey / accountId on a per request basis)
         * @returns object
         */
        search({ filters, params }: VehicleSearchVariables, query: string, options: RequestOptions): Promise<any>;
        /**
         * Get search facets
         * @param VehicleSearchVariables variables
         * @param RequestOptions options (allows you to overwrite apikey / accountId on a per request basis)
         * @returns object
         */
        facets({ filters, selectionKeys, rangeKeys }: VehicleSearchVariables, options: RequestOptions): Promise<any>;
        /**
         * Get vehicle search with facets
         * @param object variables
         * @param string query
         * @param RequestOptions options (allows you to overwrite apikey / accountId on a per request basis)
         * @returns object
         */
        searchWithFacets({ filters, params, selectionKeys, rangeKeys }: VehicleSearchVariables, query: string, options: RequestOptions): Promise<any>;
    }
}
declare module "resources/inventory/index" {
    import Vehicles from "resources/inventory/vehicles/index";
    import VehicleSearch from "resources/inventory/vehicle-search/index";
    import type OCS from "index";
    export default class Inventory {
        ocs: OCS;
        vehicles: Vehicles;
        vehicleSearch: VehicleSearch;
        constructor(ocs: OCS);
    }
}
declare module "resources/index" {
    import inventory from "resources/inventory/index";
    const _default: {
        inventory: typeof inventory;
    };
    export default _default;
}
declare module "index" {
    import { RequestOptions } from "types/index";
    class OCS {
        apiKey: string;
        accountId: string;
        authType: string;
        headers: any;
        apollo: any;
        constructor(apiKey: string, accountId: string);
        /**
         * Persist apikey and accountId and setup the headers and client
         * @param object headers
         * @param object options
         */
        prepareRequest(headers: any, options: any): void;
        /**
         * Triogger a query GraphQL request
         * @param object gql
         * @param object requestData
         * @param object requestHeaders
         * @param object requestOptions
         * @returns mixed
         */
        query(gql: any, requestData: any, requestHeaders: any, requestOptions: RequestOptions): Promise<any>;
        /**
         * Trigger a mutation GraphQL request
         * @param object gql
         * @param object requestData
         * @param object requestHeaders
         * @param object requestOptions
         * @returns mixed
         */
        mutate(gql: any, requestData: any, requestHeaders: any, requestOptions: RequestOptions): Promise<any>;
        /**
         * Use ApolloClient to make an API call
         * @param string type
         * @param object gql
         * @param object requestData
         * @param object requestHeaders
         * @param object requestOptions
         * @returns mixed
         */
        request(type: string, gql: any, requestData: any, requestHeaders: any, requestOptions: RequestOptions): Promise<any>;
        /**
         * Change apikey to Bearer authorization
         */
        useBearerAuth(): void;
        /**
         * Logging tool
         * @param mixed input
         * @param integer depth
         */
        log(input: any, depth: number): void;
    }
    export default OCS;
}
