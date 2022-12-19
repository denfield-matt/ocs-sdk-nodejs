import gql from 'graphql-tag';

export default class Inventory {
    constructor(ocs) {
        this.ocs = ocs;
    }

    async search( variables, query ) {
        const input = query || `
            links {
                totalResults
                totalPages
                page
                perPage
                prevPage
                nextPage
            }
            data {
                id
                class
                make
                model
                range
                derivative
                meta
                vrm
                vin
                bodyType
                fuelType
                mileage
                colour
                prices {
                    vatInclusive
                    price
                    otr
                }
                transmission
                states
            }
        `;

        const result = await this.ocs.request(
            gql`query Search($filters: JSON, $params: RequestParams) {
                search(filters: $filters, params: $params) {
                    ${input}
                }
            }`,
            {
                filters: variables.filters || {},
                params: variables.params || {}
            }
        );

        return result.search || {};
    }
};