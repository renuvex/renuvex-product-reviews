import { BaseGraphQLAPIClient, BaseGraphQLAPIClientOptions, APIResult } from '@ikas/admin-api-client';



export type ListStorefrontJSScriptQueryVariables = {
  storefrontId?: string;
}

export type ListStorefrontJSScriptQueryData = Array<{
  id: string;
  name: string;
  storefrontId: string;
  isActive: boolean;
  deleted: boolean;
  scriptContent: string;
}>

export interface ListStorefrontJSScriptQuery {
  listStorefrontJSScript: ListStorefrontJSScriptQueryData;
}

export class GeneratedQueries {
  client: BaseGraphQLAPIClient<any>;

  constructor(client: BaseGraphQLAPIClient<any>) {
    this.client = client;
  }

  async listStorefrontJSScript(variables: ListStorefrontJSScriptQueryVariables): Promise<APIResult<Partial<ListStorefrontJSScriptQuery>>> {
    const query = `
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
    return this.client.query<Partial<ListStorefrontJSScriptQuery>>({ query, variables });
  }
}

export class ikasAdminGraphQLAPIClient<TokenData> extends BaseGraphQLAPIClient<TokenData> {
  queries: GeneratedQueries;

  constructor(options: BaseGraphQLAPIClientOptions<TokenData>) {
    super(options);
    this.queries = new GeneratedQueries(this);
  }
}
