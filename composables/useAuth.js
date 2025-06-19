export const useAuth = () => {
  const token = useCookie("token");
  const user = useState("user", () => null);
  const config = useRuntimeConfig();
  const login = async (email, password) => {
    const res = await $fetch(`${config.public.apiBase}/api/login`, {
      method: "POST",
      body: {
        email,
        password,
      },
    });

    token.value = res.token;
    user.value = res.user;
    return res;
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    navigateTo("/login");
  };

  const isAuthenticated = computed(() => !!token.value);

  return {
    token,
    user,
    login,
    logout,
    isAuthenticated,
  };
};
