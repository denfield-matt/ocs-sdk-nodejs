import gql from 'graphql-tag';
import { PAGINATION_SCHEMA } from '@/helpers';
import { SCHEMA as VEHICLE_SCHEMA } from '@/resources/inventory/vehicles/schema';
import type OCS from '@/index';
import { RequestOptions, Paginator } from '@/types';

type VehicleSearchVariables = {
    filters?: any
    params?: Paginator
    selectionKeys?: [string]
    rangeKeys?: [string]
}

export default class VehicleSearch {
    ocs: OCS;

    constructor( ocs: OCS ) {
        this.ocs = ocs;
    }

    /**
     * Perform a vehicle search
     * @param VehicleSearchVariables variables
     * @param string query
     * @param RequestOptions options (allows you to overwrite apikey / accountId on a per request basis)
     * @returns object
     */
    async search ( { filters, params }: VehicleSearchVariables, query: string, options: RequestOptions ) {
        const input = query || VEHICLE_SCHEMA;

        const result = await this.ocs.query(
            gql`query Search($filters: JSON, $params: RequestParams) {
                search(filters: $filters, params: $params) {
                    ${ PAGINATION_SCHEMA }
                    data {
                        ${ input }
                    }
                }
            }`,
            {
                filters: filters || {},
                params: params || {}
            },
            {}, // requestHeaders
            options || {} // requestOptions
        );

        return result.search || {};
    }

    /**
     * Get search facets
     * @param VehicleSearchVariables variables
     * @param RequestOptions options (allows you to overwrite apikey / accountId on a per request basis)
     * @returns object
     */
    async facets ( { filters, selectionKeys, rangeKeys }: VehicleSearchVariables, options: RequestOptions ) {
        const variables: VehicleSearchVariables = {
            filters: filters || {}
        };

        if ( selectionKeys && Object.keys( selectionKeys ).length ) variables.selectionKeys = selectionKeys;
        if ( rangeKeys && Object.keys( rangeKeys ).length ) variables.rangeKeys = rangeKeys;

        const result = await this.ocs.query(
            gql`
                query Query($filters: JSON, $selectionKeys: [String], $rangeKeys: [String]) {
                    facets(filters: $filters, selectionKeys: $selectionKeys, rangeKeys: $rangeKeys)
                }
            `,
            variables,
            {}, // requestHeaders
            options || {} // requestOptions
        );

        return result.facets || {};
    }

    /**
     * Get vehicle search with facets
     * @param object variables
     * @param string query
     * @param RequestOptions options (allows you to overwrite apikey / accountId on a per request basis)
     * @returns object
     */
    async searchWithFacets ( { filters, params, selectionKeys, rangeKeys }: VehicleSearchVariables, query: string, options: RequestOptions ) {
        const input = query || VEHICLE_SCHEMA;

        const variables: VehicleSearchVariables = {
            filters: filters || {},
            params: {
                page: 1,
                perPage: 10
            }
        };

        if ( params && Object.keys( params ).length ) variables.params = params;
        if ( selectionKeys && Object.keys( selectionKeys ).length ) variables.selectionKeys = selectionKeys;
        if ( rangeKeys && Object.keys( rangeKeys ).length ) variables.rangeKeys = rangeKeys;

        const result = await this.ocs.query(
            gql`
                query SearchWithFacets($params: RequestParams, $selectionKeys: [String], $rangeKeys: [String], $filters: JSON) {
                    searchWithFacets(params: $params, selectionKeys: $selectionKeys, rangeKeys: $rangeKeys, filters: $filters) {
                        facets
                        results {
                            ${ PAGINATION_SCHEMA }
                            data {
                                ${input}
                            }
                        }
                    }
                }
            `,
            variables,
            {}, // requestHeaders
            options || {} // requestOptions
        );

        return result.searchWithFacets || {};
    }
};