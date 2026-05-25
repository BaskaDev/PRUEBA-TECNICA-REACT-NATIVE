import type { LoginResponse } from "../entities/user";

export interface AuthRepository {
  login(email: string, password: string): Promise<LoginResponse>;
}
