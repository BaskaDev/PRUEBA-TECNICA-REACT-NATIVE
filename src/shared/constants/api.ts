export const API = {
  LOGIN: "https://qf5k9fspl0.execute-api.us-east-1.amazonaws.com/default/login",
  BALANCE: "https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com/default/balance",
  TRANSFER: "https://ofqx4zxgcf.execute-api.us-east-1.amazonaws.com/default/transfer",
  TRANSFER_LIST: "https://n0qaa2fx3c.execute-api.us-east-1.amazonaws.com/default/transferList",
} as const;

export const QUERY_KEYS = {
  BALANCE: ["balance"],
  TRANSFER_LIST: ["transferList"],
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth-token",
  AUTH_USER: "auth-user",
} as const;
