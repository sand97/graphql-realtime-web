import {gql} from "../../__generated__";


gql(/* GraphQL */ `
    fragment ObservationFields on Observation {
        id
        value
        hospitalisationId
        equipmentId
        equipment {
            id
            name
        }
        createdAt
    }
`);


export const LAST_OBSERVATION_QUERY = gql(/* GraphQL */ `
    query lastObservations($payload: LastObservationInput!) {
        lastObservations(payload: $payload) {
            data {
                id
                ...ObservationFields
            }
        }
    }
`);

export const OBSERVATION_SUBSCRIPTION = gql(/* GraphQL */  `
    subscription observationAdded($hospitalisationId: ID!) {
        observationAdded(hospitalisationId:$hospitalisationId) {
            id
            ...ObservationFields
        }
    }
`)