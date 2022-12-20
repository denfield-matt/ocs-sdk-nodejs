process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { merge } from 'lodash-es';
import fetch from 'cross-fetch';
import core from '@apollo/client/core/core.cjs';
import resources from './resources/index.mjs';

const API_PROTOCOL = process.env.API_PROTOCOL || 'https';
const API_HOST = process.env.API_HOST || 'api.ocsoftware.test';
const API_ENDPOINT = process.env.API_ENDPOINT || '/graphql';
const API_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

class OCS {
    authType = 'apikey';
    headers = {};

    constructor( apiKey, accountId ) {
        this.apiKey = apiKey;
        this.accountId = accountId;

        Object.keys( resources ).forEach( key => {
            this[key] = new resources[key]( this );
        } );
    }

    prepareRequest ( headers, options ) {
        if ( !this.apiKey && !options.apiKey ) throw "An API key must be provided when initiating the SDK.";
        if ( !this.accountId && !options.apiKey ) throw "An account ID must be provided when initiating the SDK.";

        this.headers['X-OCS-ID'] = this.accountId || options.accountId;
        this.headers['Authorization'] = `${ this.authType } ${ this.apiKey || options.apiKey }`;

        this.apollo = new core.ApolloClient(
            {
                link: core.createHttpLink(
                    {
                        uri: `${ API_PROTOCOL }://${ API_HOST }${ API_ENDPOINT }`,
                        fetch,
                        headers: merge( API_HEADERS, this.headers, headers || {} )
                    }
                ),
                cache: new core.InMemoryCache( { addTypename: false } )
            }
        );
    }

    async request ( query, requestData, requestHeaders, requestOptions ) {
        this.prepareRequest( requestHeaders, requestOptions );

        try {
            const { data } = await this.apollo.query(
                {
                    query,
                    variables: requestData || {}
                }
            );

            return data;
        } catch ( _ ) {
            return {};
        }
    }

    useBearerAuth () {
        this.authType = "Bearer";
    }

    log ( input, depth ) {
        console.dir( input, { depth: depth || 100 } );
    }
}

export default OCS;