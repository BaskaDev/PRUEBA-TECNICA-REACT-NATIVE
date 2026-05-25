import { useMutation } from "@tanstack/react-query";
import { authRepository } from "../../data/repositories/auth.repository.impl";
import { useAuthStore } from "../store/auth-store";

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authRepository.login(email, password),
    onSuccess: (data) => {
      setAuth(data.token, data.user);
    },
  });
}
