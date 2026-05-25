import { loginUser } from "../../../../src/data/datasources/api/auth.api";

const mockAxiosInstance = global.__mockAxiosInstance;

const VALID_CREDENTIALS = { email: "gabriel@topaz.com", password: "1111" };
const LOGIN_URL = "https://qf5k9fspl0.execute-api.us-east-1.amazonaws.com/default/login";

function mockPostOnce(status: number, data: unknown) {
  mockAxiosInstance.post = jest.fn().mockResolvedValueOnce({ status, data });
}

function mockPostError(status?: number) {
  const error = status
    ? { response: { status }, isAxiosError: true }
    : new Error("Network error");
  mockAxiosInstance.post = jest.fn().mockRejectedValueOnce(error);
}

describe("loginUser", () => {
  it("returns LoginResponse on successful API call", async () => {
    mockPostOnce(200, { token: "real-token", user: { id: 1, name: "Gabriel Topaz", email: "gabriel@topaz.com" } });

    const result = await loginUser("gabriel@topaz.com", "1111");
    expect(result.token).toBe("real-token");
    expect(result.user.name).toBe("Gabriel Topaz");
  });

  it("throws on 401 from API", async () => {
    mockPostError(401);

    await expect(loginUser("bad@email.com", "wrong")).rejects.toThrow("Email o contraseña inválidos");
  });

  it("falls back to test credentials when API fails with non-401", async () => {
    mockPostError(500);

    const result = await loginUser("gabriel@topaz.com", "1111");
    expect(result.token).toBe("fake-jwt-token");
    expect(result.user.email).toBe("gabriel@topaz.com");
  });

  it("throws when test credentials do not match and API fails", async () => {
    mockPostError(500);

    await expect(loginUser("unknown@test.com", "wrong")).rejects.toThrow(
      "Error de conexión. Verifica tu internet e intenta de nuevo.",
    );
  });

  it("throws on network error", async () => {
    mockPostError(undefined);

    await expect(loginUser("unknown@test.com", "wrong")).rejects.toThrow(
      "Error de conexión. Verifica tu internet e intenta de nuevo.",
    );
  });

  it("works for all three test users", async () => {
    mockPostError(500);

    const gabriel = await loginUser("gabriel@topaz.com", "1111");
    expect(gabriel.user.id).toBe(1);

    const alejo = await loginUser("alejo@topaz.com", "2222");
    expect(alejo.user.id).toBe(2);

    const wilson = await loginUser("wilson@topaz.com", "3333");
    expect(wilson.user.id).toBe(3);
  });

  it("sends correct payload to API", async () => {
    mockAxiosInstance.post = jest.fn().mockResolvedValueOnce({
      status: 200,
      data: { token: "t", user: { id: 1, name: "G", email: "g@t.com" } },
    });

    await loginUser(VALID_CREDENTIALS.email, VALID_CREDENTIALS.password);

    expect(mockAxiosInstance.post).toHaveBeenCalledWith(
      LOGIN_URL,
      { email: VALID_CREDENTIALS.email, password: VALID_CREDENTIALS.password },
      expect.objectContaining({ timeout: 8000 }),
    );
  });
});
