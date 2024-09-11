import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { Inputs } from '../pages/signup/Signup';

// Define the shape of the authUser object
type AuthUser = Inputs;

// Define the shape of the context value
interface AuthContextType {
  authUser: AuthUser | null;
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

// Create the AuthContext with an initial value of undefined
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Custom hook to use the AuthContext
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuthContext must be used within an AuthContextProvider'
    );
  }
  return context;
};

// Define the props for AuthContextProvider
interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    const user = localStorage.getItem('chat-user');
    return user ? (JSON.parse(user) as AuthUser) : null;
  });

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default {
  AuthContextProvider,
};
