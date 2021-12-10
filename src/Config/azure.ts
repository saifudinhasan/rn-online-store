interface AzureConfig {
  appId: string
  appScopes: string
}

export const azureConfig: AzureConfig = {
  appId: 'bd699e1d-f722-418d-b235-223d11a5a3dc',
  appScopes: 'openid offline_access profile User.Read Mail.Read',
}
