import { BaseGraphQLAPIClient, BaseGraphQLAPIClientOptions, APIResult } from '@ikas/admin-api-client';

export enum StorefrontJSScriptContentTypeEnum {
  FILE = "FILE",
  SCRIPT = "SCRIPT"
}

export type CreateStorefrontJSScriptInput = {
  contentType: StorefrontJSScriptContentTypeEnum;
  fileName?: string;
  isHighPriority?: boolean;
  name: string;
  scriptContent: string;
  storefrontId: string;
}

export type DateFilterInput = {
  eq?: number;
  gt?: number;
  gte?: number;
  in?: Array<number>;
  lt?: number;
  lte?: number;
  ne?: number;
  nin?: Array<number>;
}

export type PaginationInput = {
  limit?: number;
  page?: number;
}

export type StringFilterInput = {
  eq?: string;
  in?: Array<string>;
  ne?: string;
  nin?: Array<string>;
}

export type UpdateStorefrontJSScriptInput = {
  contentType?: StorefrontJSScriptContentTypeEnum;
  fileName?: string;
  id: string;
  isHighPriority?: boolean;
  name?: string;
  scriptContent?: string;
  storefrontId?: string;
}

export type WebhookInput = {
  endpoint: string;
  salesChannelIds?: Array<string>;
  scopes: Array<string>;
}

export type GetMerchantQueryVariables = {}

export type GetMerchantQueryData = {
  id: string;
  email: string;
  storeName?: string;
}

export interface GetMerchantQuery {
  getMerchant: GetMerchantQueryData;
}

export type GetAuthorizedAppQueryVariables = {}

export type GetAuthorizedAppQueryData = {
  id: string;
  salesChannelId?: string;
}

export interface GetAuthorizedAppQuery {
  getAuthorizedApp: GetAuthorizedAppQueryData;
}

export type ListStorefrontQueryVariables = {}

export type ListStorefrontQueryData = Array<{
  id: string;
  name: string;
  mainStorefrontThemeId?: string;
  themes: Array<{
  id: string;
  name: string;
  themeId?: string;
  themeVersionId?: string;
  isMainTheme: boolean;
  deleted: boolean;
}>;
}>

export interface ListStorefrontQuery {
  listStorefront: ListStorefrontQueryData;
}

export type CreateStorefrontJSScriptMutationVariables = {
  input: CreateStorefrontJSScriptInput;
}

export type CreateStorefrontJSScriptMutationData = {
  id: string;
  name: string;
  storefrontId: string;
  isActive: boolean;
}

export interface CreateStorefrontJSScriptMutation {
  createStorefrontJSScript: CreateStorefrontJSScriptMutationData;
}

export type UpdateStorefrontJSScriptMutationVariables = {
  input: UpdateStorefrontJSScriptInput;
}

export type UpdateStorefrontJSScriptMutationData = {
  id: string;
  name: string;
  storefrontId: string;
  isActive: boolean;
}

export interface UpdateStorefrontJSScriptMutation {
  updateStorefrontJSScript: UpdateStorefrontJSScriptMutationData;
}

export type ListProductsForSyncQueryVariables = {
  pagination?: PaginationInput;
  id?: StringFilterInput;
}

export type ListProductsForSyncQueryData = {
  count: number;
  hasNext: boolean;
  limit: number;
  page: number;
  data: Array<{
  id: string;
  name: string;
  deleted: boolean;
  updatedAt?: number;
  metaData?: {
  slug: string;
};
}>;
}

export interface ListProductsForSyncQuery {
  listProduct: ListProductsForSyncQueryData;
}

export type ListOrdersForReviewRequestsQueryVariables = {
  pagination?: PaginationInput;
  id?: StringFilterInput;
  updatedAt?: DateFilterInput;
}

export type ListOrdersForReviewRequestsQueryData = {
  count: number;
  hasNext: boolean;
  limit: number;
  page: number;
  data: Array<{
  id: string;
  orderNumber?: string;
  merchantId: string;
  orderPackageStatus?: OrderPackageStatusEnum;
  orderPaymentStatus?: OrderPaymentStatusEnum;
  orderedAt?: number;
  shippingMethod: OrderShippingMethodEnum;
  status: OrderStatusEnum;
  updatedAt?: number;
  customerId?: string;
  customer?: {
  id?: string;
  email?: string;
  isGuestCheckout?: boolean;
  notificationsAccepted?: boolean;
};
  orderLineItems: Array<{
  id: string;
  deleted: boolean;
  quantity: number;
  status: OrderLineItemStatusEnum;
  statusUpdatedAt?: number;
  variant: {
  id?: string;
  name: string;
  productId?: string;
};
}>;
  orderPackages?: Array<{
  id: string;
  deleted: boolean;
  orderLineItemIds: Array<string>;
  orderPackageFulfillStatus: OrderPackageFulfillStatusEnum;
  updatedAt?: number;
}>;
}>;
}

export interface ListOrdersForReviewRequestsQuery {
  listOrder: ListOrdersForReviewRequestsQueryData;
}

export type SaveProductWebhooksMutationVariables = {
  input: WebhookInput;
}

export type SaveProductWebhooksMutationData = Array<{
  id: string;
  endpoint: string;
  scope: string;
  createdAt?: number;
  updatedAt?: number;
  deleted: boolean;
}>

export interface SaveProductWebhooksMutation {
  saveWebhooks: SaveProductWebhooksMutationData;
}

export type SaveOrderWebhooksMutationVariables = {
  input: WebhookInput;
}

export type SaveOrderWebhooksMutationData = Array<{
  id: string;
  endpoint: string;
  scope: string;
  createdAt?: number;
  updatedAt?: number;
  deleted: boolean;
}>

export interface SaveOrderWebhooksMutation {
  saveWebhooks: SaveOrderWebhooksMutationData;
}

export class GeneratedQueries {
  client: BaseGraphQLAPIClient<any>;

  constructor(client: BaseGraphQLAPIClient<any>) {
    this.client = client;
  }

  async getMerchant(): Promise<APIResult<Partial<GetMerchantQuery>>> {
    const query = `
  query getMerchant {
    getMerchant {
      id
      email
      storeName
    }
  }
`;
    return this.client.query<Partial<GetMerchantQuery>>({ query });
  }

  async getAuthorizedApp(): Promise<APIResult<Partial<GetAuthorizedAppQuery>>> {
    const query = `
  query getAuthorizedApp {
    getAuthorizedApp {
      id
      salesChannelId
    }
  }
`;
    return this.client.query<Partial<GetAuthorizedAppQuery>>({ query });
  }

  async listStorefront(): Promise<APIResult<Partial<ListStorefrontQuery>>> {
    const query = `
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
    return this.client.query<Partial<ListStorefrontQuery>>({ query });
  }

  async listProductsForSync(variables: ListProductsForSyncQueryVariables): Promise<APIResult<Partial<ListProductsForSyncQuery>>> {
    const query = `
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
    return this.client.query<Partial<ListProductsForSyncQuery>>({ query, variables });
  }

  async listOrdersForReviewRequests(variables: ListOrdersForReviewRequestsQueryVariables): Promise<APIResult<Partial<ListOrdersForReviewRequestsQuery>>> {
    const query = `
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
    return this.client.query<Partial<ListOrdersForReviewRequestsQuery>>({ query, variables });
  }
}

export class GeneratedMutations {
  client: BaseGraphQLAPIClient<any>;

  constructor(client: BaseGraphQLAPIClient<any>) {
    this.client = client;
  }

  async createStorefrontJSScript(variables: CreateStorefrontJSScriptMutationVariables): Promise<APIResult<Partial<CreateStorefrontJSScriptMutation>>> {
    const mutation = `
  mutation createStorefrontJSScript($input: CreateStorefrontJSScriptInput!) {
    createStorefrontJSScript(input: $input) {
      id
      name
      storefrontId
      isActive
    }
  }
`;
    return this.client.mutate<Partial<CreateStorefrontJSScriptMutation>>({ mutation, variables });
  }

  async updateStorefrontJSScript(variables: UpdateStorefrontJSScriptMutationVariables): Promise<APIResult<Partial<UpdateStorefrontJSScriptMutation>>> {
    const mutation = `
  mutation updateStorefrontJSScript($input: UpdateStorefrontJSScriptInput!) {
    updateStorefrontJSScript(input: $input) {
      id
      name
      storefrontId
      isActive
    }
  }
`;
    return this.client.mutate<Partial<UpdateStorefrontJSScriptMutation>>({ mutation, variables });
  }

  async saveProductWebhooks(variables: SaveProductWebhooksMutationVariables): Promise<APIResult<Partial<SaveProductWebhooksMutation>>> {
    const mutation = `
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
    return this.client.mutate<Partial<SaveProductWebhooksMutation>>({ mutation, variables });
  }

  async saveOrderWebhooks(variables: SaveOrderWebhooksMutationVariables): Promise<APIResult<Partial<SaveOrderWebhooksMutation>>> {
    const mutation = `
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
    return this.client.mutate<Partial<SaveOrderWebhooksMutation>>({ mutation, variables });
  }
}

export class ikasAdminGraphQLAPIClient<TokenData> extends BaseGraphQLAPIClient<TokenData> {
  queries: GeneratedQueries;
  mutations: GeneratedMutations;

  constructor(options: BaseGraphQLAPIClientOptions<TokenData>) {
    super(options);
    this.queries = new GeneratedQueries(this);
    this.mutations = new GeneratedMutations(this);
  }
}
