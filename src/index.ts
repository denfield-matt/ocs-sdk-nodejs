// if (process.env.NODE_ENV === 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// }

import { merge } from 'lodash-es';
import fetch from 'cross-fetch';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core/index.js';
import resources from './resources';
import { RequestOptions } from '@/types';

const API_PROTOCOL = process.env.API_PROTOCOL || 'https';
const API_HOST = process.env.API_HOST || 'api.ocsoftware.test';
const API_ENDPOINT = process.env.API_ENDPOINT || '/graphql';
const API_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};



class OCS {
    apiKey: string;
    accountId: string;
    authType: string = 'apikey';
    headers: any = {};
    apollo: any;

    constructor( apiKey: string, accountId: string ) {
        this.apiKey = apiKey;
        this.accountId = accountId;

        Object.keys( resources ).forEach( (key: string) => {
            // @ts-ignore
            this[key] = new resources[key]( this );
        } );
    }

    /**
     * Persist apikey and accountId and setup the headers and client
     * @param object headers
     * @param object options
     */
    prepareRequest ( headers: any, options: any ) {
        if ( !this.apiKey && !options.apiKey ) throw "An API key must be provided when using the SDK.";
        if ( !this.accountId && !options.accountId ) throw "An account ID must be provided when using the SDK.";

        if (
            this.apollo &&
            (
                ( !options.apiKey && !options.accountId ) ||
                (
                    ( options.apiKey && options.apiKey === this.apiKey ) &&
                    ( options.accountId && options.accountId === this.accountId )
                )
            )
        ) return;

        if ( options.apiKey && !this.apiKey ) this.apiKey = options.apiKey;
        if ( options.accountId && !this.accountId ) this.accountId = options.accountId;

        this.headers['X-OCS-ID'] = this.accountId || options.accountId;
        this.headers['Authorization'] = `${ this.authType } ${ this.apiKey || options.apiKey }`;

        this.apollo = new ApolloClient(
            {
                link: createHttpLink(
                    {
                        uri: `${ API_PROTOCOL }://${ API_HOST }${ API_ENDPOINT }`,
                        fetch,
                        headers: merge( API_HEADERS, this.headers, headers || {} )
                    }
                ),
                cache: new InMemoryCache( { addTypename: false } )
            }
        );
    }

    /**
     * Triogger a query GraphQL request
     * @param object gql
     * @param object requestData
     * @param object requestHeaders
     * @param object requestOptions
     * @returns mixed
     */
    async query ( gql: any, requestData: any, requestHeaders: any, requestOptions: RequestOptions ) {
        return await this.request(
            'query',
            gql,
            requestData,
            requestHeaders,
            requestOptions
        );
    }

    /**
     * Trigger a mutation GraphQL request
     * @param object gql
     * @param object requestData
     * @param object requestHeaders
     * @param object requestOptions
     * @returns mixed
     */
    async mutate ( gql: any, requestData: any, requestHeaders: any, requestOptions: RequestOptions ) {
        return await this.request(
            'mutate',
            gql,
            requestData,
            requestHeaders,
            requestOptions
        );
    }

    /**
     * Use ApolloClient to make an API call
     * @param string type
     * @param object gql
     * @param object requestData
     * @param object requestHeaders
     * @param object requestOptions
     * @returns mixed
     */
    async request ( type: string, gql: any, requestData: any, requestHeaders: any, requestOptions: RequestOptions ) {
        this.prepareRequest( requestHeaders, requestOptions );

        const { data } = await this.apollo[type](
            {
                [type === 'query' ? 'query' : 'mutation']: gql,
                variables: requestData || {}
            }
        );

        return data;
    }

    /**
     * Change apikey to Bearer authorization
     */
    useBearerAuth () {
        this.authType = "Bearer";
    }

    /**
     * Logging tool
     * @param mixed input
     * @param integer depth
     */
    log ( input: any, depth: number ) {
        console.dir( input, { depth: depth || 100 } );
    }
}

export default OCS;