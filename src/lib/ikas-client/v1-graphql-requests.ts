import { gql } from 'graphql-request';

export const LIST_STOREFRONT_JS_SCRIPT = gql`
  query listStorefrontJSScript($storefrontId: String) {
    listStorefrontJSScript(storefrontId: $storefrontId) {
      id
      name
      storefrontId
      isActive
      deleted
      scriptContent
    }
  }
`;
