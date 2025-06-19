// Mock user data - in real app, this would come from auth context/API
export const mockUser = {
  id: "1",
  name: "Jill Doe",
  email: "jill.doe@example.com",
  avatar: "https://github.com/shadcn.png",
  initials: "JD",
  isLoggedIn: true, // This would be managed by auth state in real app
};

// Mock app state - in real app, this would come from global state/context
export const mockAppState = {
  cartItemsCount: 4, // This would come from cart state/context
  searchQuery: "", // This would be managed by search state
};
