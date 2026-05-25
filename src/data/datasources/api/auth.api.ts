import axios from "axios";
import type { LoginResponse } from "../../../domain/entities/user";
import { useMockModeStore } from "../../../presentation/store/mock-mode-store";
import { API } from "../../../shared/constants/api";
import { apiClient } from "./client";

const TEST_CREDENTIALS: Record<string, { id: number; name: string; password: string }> = {
  "gabriel@topaz.com": { id: 1, name: "Gabriel Topaz", password: "1111" },
  "alejo@topaz.com": { id: 2, name: "Alejo Topaz", password: "2222" },
  "wilson@topaz.com": { id: 3, name: "Wilson Topaz", password: "3333" },
};

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await apiClient.post<LoginResponse>(
      API.LOGIN,
      { email, password },
      { timeout: 8000 },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error("Email o contraseña inválidos");
    }
    const testUser = TEST_CREDENTIALS[email.toLowerCase()];
    if (testUser && testUser.password === password) {
      useMockModeStore.getState().setMockMode(true, "autenticación");
      return {
        token: "fake-jwt-token",
        user: { id: testUser.id, name: testUser.name, email: email.toLowerCase() },
      };
    }
    throw new Error("Error de conexión. Verifica tu internet e intenta de nuevo.");
  }
}
