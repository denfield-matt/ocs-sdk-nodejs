import gql from 'graphql-tag';
import { PAGINATION_SCHEMA } from '@/helpers';
import { SCHEMA as VEHICLE_SCHEMA } from './schema';
import type OCS from '@/index';
import { RequestOptions, Paginator } from '@/types';

export default class Vehicles {
    ocs: OCS;

    constructor( ocs: OCS ) {
        this.ocs = ocs;
    }

    /**
     * List all vehicles
     * @param object variables
     * @param string query
     * @param RequestOptions options (allows you to overwrite apikey / accountId on a per request basis)
     * @returns object
     */
    async list ( { page, perPage, sort, sortBy }: Paginator, query: string, options: RequestOptions ) {
        const input: string = query || VEHICLE_SCHEMA;
        const variables: Paginator = {};

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
     * @param RequestOptions options (allows you to overwrite apikey / accountId on a per request basis)
     * @returns object
     */
    async create ( data: any, options: RequestOptions ) {
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
     * @param string id
     * @param string query
     * @param RequestOptions options (allows you to overwrite apikey / accountId on a per request basis)
     * @returns object
     */
    async retrieve ( id: string, query: string, options: RequestOptions ) {
        const input: string = query || VEHICLE_SCHEMA;

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
     * @param string id
     * @param object data
     * @param string query
     * @param RequestOptions options (allows you to overwrite apikey / accountId on a per request basis)
     * @returns object
     */
    async update ( id: string, data: any, query: string, options: RequestOptions ) {
        const input: string = query || VEHICLE_SCHEMA;

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
     * @param string id
     * @param RequestOptions options (allows you to overwrite apikey / accountId on a per request basis)
     * @returns object
     */
    async destroy ( id: string, options: RequestOptions ) {
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