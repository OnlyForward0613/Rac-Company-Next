import { useQuery } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { useRouter } from "next/router";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useCookies } from "react-cookie";
import { type LoginInputs } from "~/components/Forms/Login/LoginForm";
import LoadingScreen from "~/components/LoadingScreen";
import useFetchUser from "~/hooks/useFetchUser";
import useLoginUser from "~/hooks/useLoginUser";
import useRegisterUser from "~/hooks/useRegisterUser";

export type AuthContextType = {
  authType: TwoFactorAuthenticationType;
  user: UserType | null;
  isAuthenticating: boolean;
  isFetchingUser: boolean;
  isRegistering: boolean;
  isAuthCodeVerified: boolean;
  loginError: AxiosError | null;
  registerError: string | null;
  restrictedPaths: string[];
  handleCodeVerification: (sixDigitCode: string) => void;
  handleConfirmPasswordReset: (password: string) => void;
  handleLogin: (data: LoginInputs) => void;
  handleLogout: () => void;
  handleRegister: (data: RegisterType) => Promise<void>;
  handleSendResetEmail: (email: string) => boolean;
  handleVerifyPasswordResetCode: (code: string) => boolean;
  setAuthType: (authType: TwoFactorAuthenticationType) => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const useAuthContext = () => useContext(AuthContext);

export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  jwt: string;
  racId: string;
};

export type RegisterType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  contactAddress: {
    country: string;
    state: string;
    city: string;
    streetAddress: string;
    countryCode: string;
    phoneNumber: string;
    postalCode: string;
  }[];
};

export type TwoFactorAuthenticationType = "email" | "TOTP" | null;

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const restrictedPaths = useMemo(
    () => ["/login", "/authentication", "/register", "/password-reset"],
    [],
  );
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const [loginInputs, setLoginInputs] = useState<LoginInputs | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [authType, setAuthType] = useState<TwoFactorAuthenticationType>(null); // todo: get this data in user object from backend
  const [isAuthCodeVerified, setIsAuthCodeVerified] = useState(false); // todo: convert to useQuery and data from server instead

  const {
    data: user,
    isLoading: isAuthenticating,
    isFetching: isFetchingUser,
    isRefetching,
    error: loginError,
    refetch,
  } = useQuery<UserType | null, AxiosError>({
    queryKey: ["user"],
    queryFn: async () => {
      if (loginInputs) {
        console.log("logging in...");
        return await useLoginUser(loginInputs).then(async (userData) => {
          if (authType === null || isAuthCodeVerified) {
            setLoginInputs(null);
            setIsRegistering(false);
            setIsAuthCodeVerified(false);
            console.log("user logged in");
            handleJWTCookie(userData.jwt);
            return userData;
          }

          redirectTo("/authentication");
          return null;
        });
      } else if (cookies.jwt) {
        console.log("token found, fetching user info...");
        const token = cookies.jwt as string;
        return await useFetchUser(token).then(async (userData) => {
          console.log("user found");
          return userData;
        });
      }

      return null;
    },
    initialData: null,
  });

  const handleCodeVerification = (sixDigitCode: string) => {
    console.log("verifying: ", sixDigitCode);
    setIsAuthCodeVerified(true);
  };

  const handleConfirmPasswordReset = (password: string) => {
    // todo: handle backend api useChangePassword(token, code, password)
    console.log("changing password to: ", password);
    console.log("Redirecting to login...");
    redirectTo("/login");
  };

  const handleJWTCookie = (jwtCookie: string) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1); // Set expiration to 1 day from now
    setCookie("jwt", jwtCookie, { expires: expirationDate });
  };

  const handleLogin = (inputs: LoginInputs) => {
    setLoginInputs(inputs);
  };

  const handleLogout = () => {
    removeCookie("jwt");
  };

  const handleRegister = async (inputs: RegisterType) => {
    setRegisterError(null);
    setIsRegistering(true);
    console.log("registering...");
    await useRegisterUser(inputs)
      .then(() => {
        setLoginInputs(inputs);
      })
      .catch((e: AxiosError) => {
        const res = e.response as { data: { message: string } };
        setRegisterError(res.data.message);
        setIsRegistering(false);
        console.log("register failed");
      });
  };

  const handleRedirect = () => {
    const pathWithoutQuery = router.asPath.split("?");
    if (!pathWithoutQuery[0]) return;
    // when going to restrictedPaths
    // redirect to /shop or callback route if token exist else redirect to /login
    if (user && !isRefetching) {
      if (restrictedPaths.includes(pathWithoutQuery[0])) {
        console.log("Redirecting to /shop...");
        redirectTo("/shop");
      } else {
        console.log(`Redirecting to ${pathWithoutQuery[0]}...`);
        redirectTo(pathWithoutQuery[0]);
      }
    } else if (!user && !isRefetching) {
      if (pathWithoutQuery[0] === "/password-reset" && pathWithoutQuery[1])
        return;

      if (!restrictedPaths.includes(pathWithoutQuery[0])) {
        console.log("User logged out or token expired");
        console.log("Redirecting to /login...");
        redirectTo("/login");
      } else {
        console.log(`Redirecting to ${pathWithoutQuery[0]}...`);
        redirectTo(pathWithoutQuery[0]);
      }
    } else if (!user && cookies.jwt === undefined && isRefetching) {
      if (!restrictedPaths.includes(pathWithoutQuery[0])) {
        console.log("User logged out or token expired");
        console.log("Redirecting to /login...");
        redirectTo("/login");
      }
    }
  };

  const handleSendResetEmail = (email: string) => {
    const result = true; // todo: handle backend api useVerifyResetCode(email)
    console.log("sending reset link to email: ", email);
    return result;
  };

  const handleVerifyPasswordResetCode = (code: string) => {
    const result = true; // todo: handle backend api useVerifyResetCode(token, code)
    console.log("verifying code: ", code);
    return result;
  };

  const redirectTo = (path: string) => {
    void router.replace(path).catch((e) => console.log(e));
  };

  useEffect(() => {
    if (loginInputs) void refetch(); // fetch user after clicking login
  }, [loginInputs, isAuthCodeVerified]);

  useEffect(() => {
    if (!cookies.jwt) void refetch(); // set user to null if there is no cookie
  }, [cookies.jwt]);

  useEffect(() => {
    handleRedirect(); // redirect page when user value changes
  }, [user]);

  const value: AuthContextType = {
    authType,
    user,
    isAuthenticating,
    isFetchingUser,
    isRegistering,
    isAuthCodeVerified,
    loginError,
    registerError,
    restrictedPaths,
    handleCodeVerification,
    handleConfirmPasswordReset,
    handleLogin,
    handleLogout,
    handleRegister,
    handleSendResetEmail,
    handleVerifyPasswordResetCode,
    setAuthType,
  };

  if (isRefetching && loginInputs === null) return <LoadingScreen />;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
