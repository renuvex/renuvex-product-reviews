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

export type DeleteStorefrontJSScriptMutationVariables = {}

export type DeleteStorefrontJSScriptMutationData = boolean

export interface DeleteStorefrontJSScriptMutation {
  deleteStorefrontJSScript: DeleteStorefrontJSScriptMutationData;
}

export type UpdateStorefrontJSScriptInput = {
  id: string;
  contentType?: StorefrontJSScriptContentTypeEnum;
  fileName?: string;
  isHighPriority?: boolean;
  name?: string;
  scriptContent?: string;
  storefrontId?: string;
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
    }
  }
`;
    return this.client.query<Partial<ListStorefrontQuery>>({ query });
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

  async deleteStorefrontJSScript(): Promise<APIResult<Partial<DeleteStorefrontJSScriptMutation>>> {
    const mutation = `
  mutation deleteStorefrontJSScript {
    deleteStorefrontJSScript
  }
`;
    return this.client.mutate<Partial<DeleteStorefrontJSScriptMutation>>({ mutation });
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
