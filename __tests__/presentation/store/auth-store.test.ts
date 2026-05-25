import { useAuthStore } from "../../../src/presentation/store/auth-store";

jest.mock("../../../src/shared/utils/storage", () => ({
  setSecureItem: jest.fn().mockResolvedValue(undefined),
  getSecureItem: jest.fn(),
  deleteSecureItem: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("../../../src/data/repositories/balance.repository.impl", () => ({
  balanceRepository: {
    getBalance: jest.fn(),
  },
}));

const storage = jest.requireMock("../../../src/shared/utils/storage");
const { balanceRepository } = jest.requireMock("../../../src/data/repositories/balance.repository.impl");

beforeEach(() => {
  useAuthStore.setState({
    token: null,
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  jest.clearAllMocks();
});

describe("AuthStore", () => {
  it("starts with loading state", () => {
    const state = useAuthStore.getState();
    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(true);
  });

  it("setAuth stores token and user", async () => {
    await useAuthStore.getState().setAuth("test-token", { id: 1, name: "Test", email: "test@test.com" });

    const state = useAuthStore.getState();
    expect(state.token).toBe("test-token");
    expect(state.user?.name).toBe("Test");
    expect(state.isAuthenticated).toBe(true);
    expect(storage.setSecureItem).toHaveBeenCalledTimes(2);
  });

  it("logout clears auth state", async () => {
    await useAuthStore.getState().setAuth("test-token", { id: 1, name: "Test", email: "test@test.com" });
    await useAuthStore.getState().logout();

    const state = useAuthStore.getState();
    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(storage.deleteSecureItem).toHaveBeenCalledTimes(2);
  });

  it("hydrate sets authenticated when token and user exist and API responds", async () => {
    storage.getSecureItem
      .mockResolvedValueOnce("valid-token")
      .mockResolvedValueOnce(JSON.stringify({ id: 1, name: "Test", email: "t@t.com" }));

    balanceRepository.getBalance.mockResolvedValue({ currency: "BRL", accountBalance: 100 });

    await useAuthStore.getState().hydrate();

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.token).toBe("valid-token");
    expect(state.isLoading).toBe(false);
  });

  it("hydrate sets not authenticated when no token stored", async () => {
    storage.getSecureItem.mockResolvedValue(null);

    await useAuthStore.getState().hydrate();

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(false);
  });

  it("hydrate sets authenticated even when API fails but token exists", async () => {
    storage.getSecureItem
      .mockResolvedValueOnce("cached-token")
      .mockResolvedValueOnce(JSON.stringify({ id: 1, name: "Test", email: "t@t.com" }));

    balanceRepository.getBalance.mockRejectedValue(new Error("Network error"));

    await useAuthStore.getState().hydrate();

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.token).toBe("cached-token");
  });
});
