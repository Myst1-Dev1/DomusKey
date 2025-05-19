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
      type
      ownerImg
      ownerName
    }
  }
`;

export const GET_SINGLE_IMMOBILE = gql`
  query ($id: ID!) {
    immobile(id: $id) {
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
      type
      ownerImg
      ownerName
    }
  }
`;
