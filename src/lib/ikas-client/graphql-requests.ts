import { gql } from 'graphql-request';

export const GET_MERCHANT = gql`
  query getMerchant {
    getMerchant {
      id
      email
      storeName
    }
  }
`;

export const GET_AUTHORIZED_APP = gql`
  query getAuthorizedApp {
    getAuthorizedApp {
      id
      salesChannelId
    }
  }
`;

export const LIST_STOREFRONT = gql`
  query listStorefront {
    listStorefront {
      id
      name
      mainStorefrontThemeId
      themes {
        id
        name
        themeId
        themeVersionId
        isMainTheme
        deleted
      }
    }
  }
`;

export const CREATE_STOREFRONT_JS_SCRIPT = gql`
  mutation createStorefrontJSScript($input: CreateStorefrontJSScriptInput!) {
    createStorefrontJSScript(input: $input) {
      id
      name
      storefrontId
      isActive
    }
  }
`;

export const UPDATE_STOREFRONT_JS_SCRIPT = gql`
  mutation updateStorefrontJSScript($input: UpdateStorefrontJSScriptInput!) {
    updateStorefrontJSScript(input: $input) {
      id
      name
      storefrontId
      isActive
    }
  }
`;

export const LIST_PRODUCTS_FOR_SYNC = gql`
  query listProductsForSync($pagination: PaginationInput, $id: StringFilterInput) {
    listProduct(pagination: $pagination, id: $id) {
      count
      hasNext
      limit
      page
      data {
        id
        name
        deleted
        updatedAt
        metaData {
          slug
        }
      }
    }
  }
`;

export const LIST_ORDERS_FOR_REVIEW_REQUESTS = gql`
  query listOrdersForReviewRequests($pagination: PaginationInput, $id: StringFilterInput, $updatedAt: DateFilterInput) {
    listOrder(pagination: $pagination, id: $id, updatedAt: $updatedAt) {
      count
      hasNext
      limit
      page
      data {
        id
        orderNumber
        merchantId
        orderPackageStatus
        orderPaymentStatus
        orderedAt
        shippingMethod
        status
        updatedAt
        customerId
        customer {
          id
          email
          isGuestCheckout
          notificationsAccepted
        }
        orderLineItems {
          id
          deleted
          quantity
          status
          statusUpdatedAt
          variant {
            id
            name
            productId
          }
        }
        orderPackages {
          id
          deleted
          orderLineItemIds
          orderPackageFulfillStatus
          updatedAt
        }
      }
    }
  }
`;

export const LIST_CUSTOMERS_FOR_REVIEW_EMAIL_CONSENT = gql`
  query listCustomersForReviewEmailConsent($pagination: PaginationInput, $id: StringFilterInput) {
    listCustomer(pagination: $pagination, id: $id) {
      count
      hasNext
      limit
      page
      data {
        id
        email
        deleted
        subscriptionStatus
        subscriptionStatusUpdatedAt
        updatedAt
      }
    }
  }
`;

export const SAVE_PRODUCT_WEBHOOKS = gql`
  mutation saveProductWebhooks($input: WebhookInput!) {
    saveWebhooks(input: $input) {
      id
      endpoint
      scope
      createdAt
      updatedAt
      deleted
    }
  }
`;

export const SAVE_ORDER_WEBHOOKS = gql`
  mutation saveOrderWebhooks($input: WebhookInput!) {
    saveWebhooks(input: $input) {
      id
      endpoint
      scope
      createdAt
      updatedAt
      deleted
    }
  }
`;
