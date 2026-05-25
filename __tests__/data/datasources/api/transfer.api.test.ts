import { createTransfer, fetchTransferList } from "../../../../src/data/datasources/api/transfer.api";

const mockAxiosInstance = global.__mockAxiosInstance;

const validTransferRequest = {
  value: 500,
  currency: "BRL",
  payeerDocument: "12345678900",
  transferDate: "2026-06-15",
};

const TRANSFER_URL = "https://ofqx4zxgcf.execute-api.us-east-1.amazonaws.com/default/transfer";
const TRANSFER_LIST_URL = "https://n0qaa2fx3c.execute-api.us-east-1.amazonaws.com/default/transferList";

describe("createTransfer", () => {
  it("returns success on successful API call", async () => {
    mockAxiosInstance.post = jest.fn().mockResolvedValueOnce({
      status: 200,
      data: { status: "success" },
    });

    const result = await createTransfer(validTransferRequest);
    expect(result.status).toBe("success");
  });

  it("throws on API failure", async () => {
    mockAxiosInstance.post = jest.fn().mockRejectedValueOnce(new Error("Network error"));

    await expect(createTransfer(validTransferRequest)).rejects.toThrow("Network error");
  });

  it("sends correct payload", async () => {
    mockAxiosInstance.post = jest.fn().mockResolvedValueOnce({
      status: 200,
      data: { status: "success" },
    });

    await createTransfer(validTransferRequest);
    expect(mockAxiosInstance.post).toHaveBeenCalledWith(
      TRANSFER_URL,
      validTransferRequest,
      expect.objectContaining({ timeout: 8000 }),
    );
  });
});

describe("fetchTransferList", () => {
  it("returns transfers on successful API call", async () => {
    const mockData = [
      { value: 100, date: "2026-05-20", currency: "BRL", payeer: { document: "1", name: "Test" } },
    ];
    mockAxiosInstance.get = jest.fn().mockResolvedValueOnce({ status: 200, data: mockData });

    const result = await fetchTransferList();
    expect(result).toHaveLength(1);
    expect(result[0].payeer.name).toBe("Test");
  });

  it("throws on API failure", async () => {
    mockAxiosInstance.get = jest.fn().mockRejectedValueOnce(new Error("Network error"));

    await expect(fetchTransferList()).rejects.toThrow("Network error");
  });

  it("calls the correct URL", async () => {
    mockAxiosInstance.get = jest.fn().mockResolvedValueOnce({ status: 200, data: [] });

    await fetchTransferList();
    expect(mockAxiosInstance.get).toHaveBeenCalledWith(
      TRANSFER_LIST_URL,
      expect.objectContaining({ timeout: 8000 }),
    );
  });
});
