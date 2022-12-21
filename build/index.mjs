import{merge as S}from"lodash-es";import O from"cross-fetch";import{ApolloClient as v,createHttpLink as I,InMemoryCache as q}from"@apollo/client/core/index.js";import u from"graphql-tag";var o=`
    links {
        totalResults
        totalPages
        page
        perPage
        prevPage
        nextPage
    }
`;var c=`
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
`;var l=class{constructor(t){this.ocs=t}async list({page:t,perPage:e,sort:s,sortBy:a},r,n){let g=r||c,i={};return t&&(i.page=t),e&&(i.perPage=e),s&&a&&(i.sort=s),s&&a&&(i.sortBy=a),(await this.ocs.query(u`query Vehicles($page: Int, $perPage: Int, $sort: String, $sortBy: String) {
                vehicles(page: $page, perPage: $perPage, sort: $sort, sortBy: $sortBy) {
                    ${o}
                    data {
                        ${g}
                    }
                }
            }`,i,{},n||{})).vehicles||{}}async create(t,e){return(await this.ocs.mutate(u`mutation StoreVehicle($data: VehicleInput!) {
                storeVehicle(data: $data) {
                    ${c}
                }
            }`,{data:t},{},e||{})).storeVehicle||{}}async retrieve(t,e,s){let a=e||c;return(await this.ocs.query(u`query Vehicle($value: String!, $key: String) {
                vehicle(value: $value, key: $key) {
                    ${a}
                }
            }`,{key:"id",value:t},{},s||{})).vehicle||{}}async update(t,e,s,a){let r=s||c;return(await this.ocs.mutate(u`mutation UpdateVehicle($value: String!, $data: VehicleInput!, $key: String) {
                updateVehicle(value: $value, data: $data, key: $key) {
                    ${r}
                }
            }`,{key:"id",value:t,data:e},{},a||{})).updateVehicle||{}}async destroy(t,e){return(await this.ocs.mutate(u`mutation DestoryVehicle($value: String!) {
                destoryVehicle(value: $value)
            }`,{value:t},{},e||{})).destoryVehicle||!1}};import m from"graphql-tag";var h=class{constructor(t){this.ocs=t}async search({filters:t,params:e},s,a){let r=s||c;return(await this.ocs.query(m`query Search($filters: JSON, $params: RequestParams) {
                search(filters: $filters, params: $params) {
                    ${o}
                    data {
                        ${r}
                    }
                }
            }`,{filters:t||{},params:e||{}},{},a||{})).search||{}}async facets({filters:t,selectionKeys:e,rangeKeys:s},a){let r={filters:t||{}};return e&&Object.keys(e).length&&(r.selectionKeys=e),s&&Object.keys(s).length&&(r.rangeKeys=s),(await this.ocs.query(m`
                query Query($filters: JSON, $selectionKeys: [String], $rangeKeys: [String]) {
                    facets(filters: $filters, selectionKeys: $selectionKeys, rangeKeys: $rangeKeys)
                }
            `,r,{},a||{})).facets||{}}async searchWithFacets({filters:t,params:e,selectionKeys:s,rangeKeys:a},r,n){let g=r||c,i={filters:t||{},params:{page:1,perPage:10}};return e&&Object.keys(e).length&&(i.params=e),s&&Object.keys(s).length&&(i.selectionKeys=s),a&&Object.keys(a).length&&(i.rangeKeys=a),(await this.ocs.query(m`
                query SearchWithFacets($params: RequestParams, $selectionKeys: [String], $rangeKeys: [String], $filters: JSON) {
                    searchWithFacets(params: $params, selectionKeys: $selectionKeys, rangeKeys: $rangeKeys, filters: $filters) {
                        facets
                        results {
                            ${o}
                            data {
                                ${g}
                            }
                        }
                    }
                }
            `,i,{},n||{})).searchWithFacets||{}}};var p=class{constructor(t){this.ocs=t,this.vehicles=new l(t),this.vehicleSearch=new h(t)}};var d={inventory:p};process.env.NODE_TLS_REJECT_UNAUTHORIZED="0";var P=process.env.API_PROTOCOL||"https",A=process.env.API_HOST||"api.ocsoftware.test",V=process.env.API_ENDPOINT||"/graphql",K={"Content-Type":"application/json",Accept:"application/json"},f=class{constructor(t,e){this.authType="apikey";this.headers={};this.apiKey=t,this.accountId=e,Object.keys(d).forEach(s=>{this[s]=new d[s](this)})}prepareRequest(t,e){if(!this.apiKey&&!e.apiKey)throw"An API key must be provided when using the SDK.";if(!this.accountId&&!e.accountId)throw"An account ID must be provided when using the SDK.";this.apollo&&(!e.apiKey&&!e.accountId||e.apiKey&&e.apiKey===this.apiKey&&e.accountId&&e.accountId===this.accountId)||(e.apiKey&&!this.apiKey&&(this.apiKey=e.apiKey),e.accountId&&!this.accountId&&(this.accountId=e.accountId),this.headers["X-OCS-ID"]=this.accountId||e.accountId,this.headers.Authorization=`${this.authType} ${this.apiKey||e.apiKey}`,this.apollo=new v({link:I({uri:`${P}://${A}${V}`,fetch:O,headers:S(K,this.headers,t||{})}),cache:new q({addTypename:!1})}))}async query(t,e,s,a){return await this.request("query",t,e,s,a)}async mutate(t,e,s,a){return await this.request("mutate",t,e,s,a)}async request(t,e,s,a,r){this.prepareRequest(a,r);let{data:n}=await this.apollo[t]({[t==="query"?"query":"mutation"]:e,variables:s||{}});return n}useBearerAuth(){this.authType="Bearer"}log(t,e){console.dir(t,{depth:e||100})}},U=f;export{U as default};
