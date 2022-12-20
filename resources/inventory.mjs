import gql from 'graphql-tag';
import { result } from 'lodash-es';
import { SCHEMA as PAGINATION_SCHEMA } from '../helpers/pagination.mjs';

const VEHICLE_SCHEMA = `
    id
    external_driver
    external_id
    class
    make
    model
    range
    derivative
    vrm
    vin
    bodyType
    fuelType
    regDate
    doors
    seats
    mileage
    colour
    transmission
    engineSize
    enginePower
    powerTrain
    emissions
    acceleration {
        mph
        khp
        zeroTo60Mph
        zeroTo100Kph
        maxSpeedMph
        maxSpeedKph
    }
    previousOwners
    prices {
        vatInclusive
        price
        otr
    }
    mpg {
        extra
        urban
        combined
    }
    tags
    dimensions {
        height
        width
        length
        wheelBase
        axelCount
        grossVehicleWeight
        grossCombinedWeight
        kerbWeight
        unladenWeight
    }
    images
    spec
    states
    meta
    created_at
    updated_at
`

export default class Inventory {
    constructor(ocs) {
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
                    ${PAGINATION_SCHEMA}
                    data {
                        ${input}
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

    async facets ( filters, selectionKeys, rangeKeys, options ) {
        const variables = {
            filters: filters || {}
        };

        if (selectionKeys) variables.selectionKeys = selectionKeys;
        if (rangeKeys) variables.rangeKeys = rangeKeys;

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
};