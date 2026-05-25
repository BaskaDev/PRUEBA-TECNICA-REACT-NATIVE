import type { LoginResponse } from "../../domain/entities/user";
import type { AuthRepository } from "../../domain/repositories/auth.repository";
import * as AuthApi from "../datasources/api/auth.api";

export const authRepository: AuthRepository = {
  async login(email: string, password: string): Promise<LoginResponse> {
    return AuthApi.loginUser(email, password);
  },
};
