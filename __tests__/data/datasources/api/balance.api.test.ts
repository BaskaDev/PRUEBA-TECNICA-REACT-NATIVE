import { fetchBalance } from "../../../../src/data/datasources/api/balance.api";

const mockAxiosInstance = global.__mockAxiosInstance;

const BALANCE_URL = "https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com/default/balance";

describe("fetchBalance", () => {
  it("returns balance on successful API call", async () => {
    mockAxiosInstance.get = jest.fn().mockResolvedValueOnce({
      status: 200,
      data: { currency: "BRL", accountBalance: 2500 },
    });

    const result = await fetchBalance();
    expect(result.currency).toBe("BRL");
    expect(result.accountBalance).toBe(2500);
  });

  it("throws on API failure", async () => {
    mockAxiosInstance.get = jest.fn().mockRejectedValueOnce(new Error("Network error"));

    await expect(fetchBalance()).rejects.toThrow("Network error");
  });

  it("throws on 500 error", async () => {
    mockAxiosInstance.get = jest.fn().mockRejectedValueOnce({
      response: { status: 500 },
      isAxiosError: true,
    });

    await expect(fetchBalance()).rejects.toBeDefined();
  });

  it("calls the correct URL", async () => {
    mockAxiosInstance.get = jest.fn().mockResolvedValueOnce({
      status: 200,
      data: { currency: "BRL", accountBalance: 100 },
    });

    await fetchBalance();
    expect(mockAxiosInstance.get).toHaveBeenCalledWith(
      BALANCE_URL,
      expect.objectContaining({ timeout: 8000 }),
    );
  });
});
