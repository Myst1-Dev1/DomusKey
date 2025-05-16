import { gql } from 'apollo-angular';

export const GET_IMMOBILES = gql`
  query GetImmobiles {
    immobiles {
      id
      title
      description
      img
      price
      perspectiveImgs
      latitude
      longitude
      location
      bedNumbers
      bathNumbers
      propertySize
    }
  }
`;