import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  type CustomerData,
  isLoggedIn,
  getCustomerData,
  logout as authLogout,
  fetchCustomerData,
} from "@/lib/auth";

// Auth Store State
interface AuthState {
  user: CustomerData | null;
  isLoggedIn: boolean;
  isLoading: boolean;

  // Core Actions
  login: (userData: CustomerData) => void;
  logout: () => void;
  updateUser: (userData: Partial<CustomerData>) => void;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, _get) => ({
      // Initial state
      user: null,
      isLoggedIn: false,
      isLoading: true,

      // Core Actions
      login: (userData) => {
        set({
          user: userData,
          isLoggedIn: true,
          isLoading: false,
        });
      },

      logout: () => {
        authLogout();

        // Clear store state
        set({
          user: null,
          isLoggedIn: false,
          isLoading: false,
        });
      },

      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },

      // Initialization - check auth state when app loads
      initialize: async () => {
        try {
          const loggedIn = isLoggedIn();

          if (loggedIn) {
            const customer = getCustomerData();
            if (customer) {
              // Use cached data
              set({
                user: customer,
                isLoggedIn: true,
                isLoading: false,
              });
            } else {
              // Try to fetch fresh data
              const freshCustomer = await fetchCustomerData();
              if (freshCustomer) {
                set({
                  user: freshCustomer,
                  isLoggedIn: true,
                  isLoading: false,
                });
              } else {
                // Token invalid
                authLogout();
                set({
                  user: null,
                  isLoggedIn: false,
                  isLoading: false,
                });
              }
            }
          } else {
            set({
              user: null,
              isLoggedIn: false,
              isLoading: false,
            });
          }
        } catch (error) {
          console.error("Failed to initialize auth state:", error);
          set({
            user: null,
            isLoggedIn: false,
            isLoading: false,
          });
        }
      },
    }),
    {
      name: "naijabites-auth",
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        // Don't persist isLoading - always start fresh to prevent flash
      }),
      // Custom hydration to prevent persistent state sync issues
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Show cached data immediately if available
          if (state.user && state.isLoggedIn) {
            state.isLoading = false;
          } else {
            state.isLoading = true;
          }
        }
      },
    },
  ),
);

// Helper hooks for easier access
export const useAuth = () => {
  const { user, isLoggedIn, isLoading } = useAuthStore();
  return { user, isLoggedIn, isLoading };
};

export const useAuthActions = () => {
  const { login, logout, updateUser, initialize } = useAuthStore();
  return { login, logout, updateUser, initialize };
};

// User info hook
export const useUserInfo = () => {
  const { user } = useAuthStore();

  // Get initials from user data
  const getInitials = () => {
    if (!user) return "U";
    return user.firstName.charAt(0).toUpperCase();
  };

  const getName = () => {
    if (!user) return "User";

    const firstNameParts = user.firstName.trim().split(/\s+/);
    const lastNameParts = user.lastName.trim().split(/\s+/);

    return `${firstNameParts[0]} ${lastNameParts[0]}`;
  };

  const getEmail = () => {
    return user?.email || "";
  };

  return {
    user,
    initials: getInitials(),
    name: getName(),
    email: getEmail(),
  };
};
