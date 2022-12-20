import gql from 'graphql-tag';
import { SCHEMA as PAGINATION_SCHEMA } from '../../../helpers/pagination.mjs';
import { SCHEMA as VEHICLE_SCHEMA } from './schema.mjs';

export default class Inventory {
    constructor( ocs ) {
        this.ocs = ocs;
    }

    /**
     * Perform a vehicle search
     * @param object variables
     * @param string query
     * @param object options (allows you to overwrite apikey / accountId on a per request basis)
     * @returns object
     */
    async search ( variables, query, options ) {
        const input = query || VEHICLE_SCHEMA;

        const result = await this.ocs.request(
            gql`query Search($filters: JSON, $params: RequestParams) {
                search(filters: $filters, params: $params) {
                    ${ PAGINATION_SCHEMA }
                    data {
                        ${ input }
                    }
                }
            }`,
            {
                filters: variables.filters || {},
                params: variables.params || {}
            },
            {}, // requestHeaders
            options || {} // requestOptions
        );

        return result.search || {};
    }

    /**
     * Get search facets
     * @param object filters
     * @param [string] selectionKeys
     * @param [string] rangeKeys
     * @param object options (allows you to overwrite apikey / accountId on a per request basis)
     * @returns object
     */
    async facets ( filters, selectionKeys, rangeKeys, options ) {
        const variables = {
            filters: filters || {}
        };

        if ( selectionKeys && Object.keys( selectionKeys ).length ) variables.selectionKeys = selectionKeys;
        if ( rangeKeys && Object.keys( rangeKeys ).length ) variables.rangeKeys = rangeKeys;

        const result = await this.ocs.request(
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
     * @param object filters
     * @param object params
     * @param [string] selectionKeys
     * @param [string] rangeKeys
     * @param string query
     * @param object options (allows you to overwrite apikey / accountId on a per request basis)
     * @returns object
     */
    async searchWithFacets ( filters, params, selectionKeys, rangeKeys, query, options ) {
        const input = query || VEHICLE_SCHEMA;

        const variables = {
            filters: filters || {},
            params: {
                page: 1,
                perPage: 10
            }
        };

        if ( params && Object.keys( params ).length ) variables.params = params;
        if ( selectionKeys && Object.keys( selectionKeys ).length ) variables.selectionKeys = selectionKeys;
        if ( rangeKeys && Object.keys( rangeKeys ).length ) variables.rangeKeys = rangeKeys;

        const result = await this.ocs.request(
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