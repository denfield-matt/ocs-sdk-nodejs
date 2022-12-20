import gql from 'graphql-tag';
import { SCHEMA as PAGINATION_SCHEMA } from '../../../helpers/pagination.mjs';
import { SCHEMA as VEHICLE_SCHEMA } from './schema.mjs';

export default class Vehicles {
    constructor( ocs ) {
        this.ocs = ocs;
    }

    /**
     * List all vehicles
     * @param object variables
     * @param string query
     * @param object options (allows you to overwrite apikey / accountId on a per request basis)
     * @returns object
     */
    async list ( { page, perPage, sort, sortBy }, query, options ) {
        const input = query || VEHICLE_SCHEMA;
        const variables = {};

        if ( page ) variables.page = page;
        if ( perPage ) variables.perPage = perPage;
        if ( sort && sortBy ) variables.sort = sort;
        if ( sort && sortBy ) variables.sortBy = sortBy;

        const result = await this.ocs.query(
            gql`query Vehicles($page: Int, $perPage: Int, $sort: String, $sortBy: String) {
                vehicles(page: $page, perPage: $perPage, sort: $sort, sortBy: $sortBy) {
                    ${PAGINATION_SCHEMA}
                    data {
                        ${input}
                    }
                }
            }`,
            variables,
            {}, // requestHeaders
            options || {} // requestOptions
        );

        return result.vehicles || {};
    }

    /**
     * Create a vehicle
     * @param object data
     * @param object options (allows you to overwrite apikey / accountId on a per request basis)
     * @returns object
     */
    async create ( data, options ) {
        const result = await this.ocs.mutate(
            gql`mutation StoreVehicle($data: VehicleInput!) {
                storeVehicle(data: $data) {
                    ${VEHICLE_SCHEMA}
                }
            }`,
            { data },
            {}, // requestHeaders
            options || {} // requestOptions
        );

        return result.storeVehicle || {};
    }

    /**
     * Retrieve a vehicle
     * @param object id
     * @param string query
     * @param object options (allows you to overwrite apikey / accountId on a per request basis)
     * @returns object
     */
    async retrieve ( id, query, options ) {
        const input = query || VEHICLE_SCHEMA;

        const result = await this.ocs.query(
            gql`query Vehicle($value: String!, $key: String) {
                vehicle(value: $value, key: $key) {
                    ${input}
                }
            }`,
            {
                key: 'id',
                value: id
            },
            {}, // requestHeaders
            options || {} // requestOptions
        );

        return result.vehicle || {};
    }

    /**
     * Update a vehicle
     * @param object id
     * @param object data
     * @param string query
     * @param object options (allows you to overwrite apikey / accountId on a per request basis)
     * @returns object
     */
    async update ( id, data, query, options ) {
        const input = query || VEHICLE_SCHEMA;

        const result = await this.ocs.mutate(
            gql`mutation UpdateVehicle($value: String!, $data: VehicleInput!, $key: String) {
                updateVehicle(value: $value, data: $data, key: $key) {
                    ${input}
                }
            }`,
            {
                key: 'id',
                value: id,
                data
            },
            {}, // requestHeaders
            options || {} // requestOptions
        );

        return result.updateVehicle || {};
    }

    /**
     * Delete a vehicle
     * @param object id
     * @param object options (allows you to overwrite apikey / accountId on a per request basis)
     * @returns object
     */
    async destroy ( id, options ) {
        const result = await this.ocs.mutate(
            gql`mutation DestoryVehicle($value: String!) {
                destoryVehicle(value: $value)
            }`,
            {
                value: id
            },
            {}, // requestHeaders
            options || {} // requestOptions
        );

        return result.destoryVehicle || false;
    }
};