import { createContext, useContext, useReducer, ReactNode, useCallback } from "react";
import {
  Booking, Provider, ProviderRequest,
  initialProviderRequests, initialCompletedJobs,
  providers as allProviders,
} from "@/data/mockData";

type Role = "customer" | "provider" | null;

interface UserProfile {
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface State {
  isAuthenticated: boolean;
  phone: string;
  role: Role;
  user: UserProfile;
  // Booking draft
  selectedServiceId: string | null;
  selectedProviderId: string | null;
  selectedDate: string | null;
  selectedTime: string | null;
  bookingNotes: string;
  // Records
  bookings: Booking[];
  providerRequests: ProviderRequest[];
  completedJobs: ProviderRequest[];
  notifications: { id: string; text: string; ts: number }[];
  // Provider Onboarding Draft
  providerRegistrationDraft: {
    serviceIds: string[];
    bio: string;
    experienceYears: number;
    workingHours: string;
    serviceRadius: number;
    kyc: {
      aadhaarVerified: boolean;
      panVerified: boolean;
      bankVerified: boolean;
    };
  };
  // New Flow State
  isNewUser: boolean;
  walletBalance: number;
  isOnline: boolean;
  providerStats: {
    rating: number;
    responseRate: number;
  };
  onboardingData: {
    serviceIds: string[];
    homeType: string;
    householdSize: string;
    frequency: string;
    budget: string;
  };
}

type Action =
  | { type: "SET_PHONE"; phone: string }
  | { type: "SET_AUTH"; value: boolean }
  | { type: "SET_ROLE"; role: Role }
  | { type: "UPDATE_USER"; user: Partial<UserProfile> }
  | { type: "SELECT_SERVICE"; id: string }
  | { type: "SELECT_PROVIDER"; id: string }
  | { type: "SELECT_DATE"; date: string }
  | { type: "SELECT_TIME"; time: string }
  | { type: "SET_NOTES"; notes: string }
  | { type: "RESET_BOOKING_DRAFT" }
  | { type: "ADD_BOOKING"; booking: Booking }
  | { type: "UPDATE_BOOKING"; id: string; patch: Partial<Booking> }
  | { type: "ADD_NOTIFICATION"; text: string }
  | { type: "ACCEPT_REQUEST"; id: string }
  | { type: "REJECT_REQUEST"; id: string }
  | { type: "UPDATE_REQUEST"; id: string; patch: Partial<ProviderRequest> }
  | { type: "COMPLETE_REQUEST"; id: string }
  | { type: "UPDATE_REGISTRATION_DRAFT"; patch: Partial<State["providerRegistrationDraft"]> }
  | { type: "UPDATE_KYC"; patch: Partial<State["providerRegistrationDraft"]["kyc"]> }
  | { type: "UPDATE_ONBOARDING"; patch: Partial<State["onboardingData"]> }
  | { type: "SET_NEW_USER"; value: boolean }
  | { type: "UPDATE_WALLET"; amount: number }
  | { type: "SET_ONLINE"; value: boolean }
  | { type: "UPDATE_STATS"; patch: Partial<State["providerStats"]> }
  | { type: "LOGOUT" };

const initialState: State = {
  isAuthenticated: false,
  phone: "",
  role: null,
  user: {
    name: "Aarav Sharma",
    phone: "",
    email: "aarav@example.com",
    address: "Bangalore, KA",
  },
  selectedServiceId: null,
  selectedProviderId: null,
  selectedDate: null,
  selectedTime: null,
  bookingNotes: "",
  bookings: [],
  providerRequests: initialProviderRequests,
  completedJobs: initialCompletedJobs,
  notifications: [],
  providerRegistrationDraft: {
    serviceIds: [],
    bio: "",
    experienceYears: 1,
    workingHours: "All day",
    serviceRadius: 5,
    kyc: { aadhaarVerified: false, panVerified: false, bankVerified: false },
  },
  isNewUser: true,
  walletBalance: 0,
  isOnline: true,
  providerStats: {
    rating: 4.8,
    responseRate: 96,
  },
  onboardingData: {
    serviceIds: [],
    homeType: "",
    householdSize: "",
    frequency: "",
    budget: "",
  },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_PHONE":
      return { ...state, phone: action.phone, user: { ...state.user, phone: action.phone } };
    case "SET_AUTH":
      return { ...state, isAuthenticated: action.value };
    case "SET_ROLE":
      return { ...state, role: action.role };
    case "UPDATE_USER":
      return { ...state, user: { ...state.user, ...action.user } };
    case "SELECT_SERVICE":
      return { ...state, selectedServiceId: action.id };
    case "SELECT_PROVIDER":
      return { ...state, selectedProviderId: action.id };
    case "SELECT_DATE":
      return { ...state, selectedDate: action.date };
    case "SELECT_TIME":
      return { ...state, selectedTime: action.time };
    case "SET_NOTES":
      return { ...state, bookingNotes: action.notes };
    case "RESET_BOOKING_DRAFT":
      return {
        ...state,
        selectedProviderId: null,
        selectedDate: null,
        selectedTime: null,
        bookingNotes: "",
      };
    case "ADD_BOOKING":
      return { ...state, bookings: [action.booking, ...state.bookings] };
    case "UPDATE_BOOKING":
      return {
        ...state,
        bookings: state.bookings.map((b) =>
          b.id === action.id ? { ...b, ...action.patch } : b
        ),
      };
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [
          { id: `n-${Date.now()}`, text: action.text, ts: Date.now() },
          ...state.notifications,
        ].slice(0, 20),
      };
    case "ACCEPT_REQUEST":
      return {
        ...state,
        providerRequests: state.providerRequests.map((r) =>
          r.id === action.id ? { ...r, status: "accepted" } : r
        ),
      };
    case "REJECT_REQUEST":
      return {
        ...state,
        providerRequests: state.providerRequests.filter((r) => r.id !== action.id),
      };
    case "UPDATE_REQUEST":
      return {
        ...state,
        providerRequests: state.providerRequests.map((r) =>
          r.id === action.id ? { ...r, ...action.patch } : r
        ),
      };
    case "COMPLETE_REQUEST": {
      const req = state.providerRequests.find((r) => r.id === action.id);
      if (!req) return state;
      return {
        ...state,
        providerRequests: state.providerRequests.filter((r) => r.id !== action.id),
        completedJobs: [{ ...req, status: "completed" }, ...state.completedJobs],
      };
    }
    case "UPDATE_REGISTRATION_DRAFT":
      return {
        ...state,
        providerRegistrationDraft: { ...state.providerRegistrationDraft, ...action.patch },
      };
    case "UPDATE_KYC":
      return {
        ...state,
        providerRegistrationDraft: {
          ...state.providerRegistrationDraft,
          kyc: { ...state.providerRegistrationDraft.kyc, ...action.patch },
        },
      };
    case "UPDATE_ONBOARDING":
      return {
        ...state,
        onboardingData: { ...state.onboardingData, ...action.patch },
      };
    case "SET_NEW_USER":
      return { ...state, isNewUser: action.value };
    case "UPDATE_WALLET":
      return { ...state, walletBalance: state.walletBalance + action.amount };
    case "SET_ONLINE":
      return { ...state, isOnline: action.value };
    case "UPDATE_STATS":
      return { ...state, providerStats: { ...state.providerStats, ...action.patch } };
    case "LOGOUT":
      return { ...initialState };
    default:
      return state;
  }
}

interface Ctx extends State {
  dispatch: React.Dispatch<Action>;
  selectedProvider: Provider | null;
}

const AppContext = createContext<Ctx | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const selectedProvider = state.selectedProviderId
    ? allProviders.find((p) => p.id === state.selectedProviderId) ?? null
    : null;

  return (
    <AppContext.Provider value={{ ...state, dispatch, selectedProvider }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
};

// Helper to create stable action callbacks
export const useAppActions = () => {
  const { dispatch } = useApp();
  return {
    notify: useCallback((text: string) => dispatch({ type: "ADD_NOTIFICATION", text }), [dispatch]),
  };
};
