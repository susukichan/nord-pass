const logout = (): void => {
  localStorage.removeItem("token");
};

export default logout;
