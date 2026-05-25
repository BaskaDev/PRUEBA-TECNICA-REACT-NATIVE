declare global {
  var __mockAxiosInstance: {
    interceptors: { request: jest.Mock; response: jest.Mock };
    post: jest.Mock;
    get: jest.Mock;
  };
}

export {};
