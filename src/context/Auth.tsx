import {
    useContext,
    createContext,
    ReactNode,
    useEffect,
    useState,
} from "react";
//@ts-ignore
import Parse from "parse/dist/parse.min.js";
import { toast } from "react-toastify";

export interface User {
    id: number;
    attributes: {
        email: string;
        username: string;
    };
}

interface AuthContextType {
    user: User | undefined;
    logout: () => void;
    login: (username: string, passowrd: string) => Promise<Boolean>;
    signup: (
        username: string,
        passowrd: string,
        email: string
    ) => Promise<Boolean>;
}

export const AuthContext = createContext<AuthContextType>({
    user: undefined,
    logout: () => {},
    login: async () => false,
    signup: async () => false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | undefined>();
    const [fetched, setFetched] = useState<boolean>(false);
    const logout = () => {
        localStorage.clear();

        setUser(undefined);
        toast.success(`Logged out`);
    };
    const login = async (username: string, passowrd: string) => {
        try {
            const loggedInUser = await Parse.User.logIn(username, passowrd);

            setUser(loggedInUser);
            setFetched(true);
            toast.success(`Logged in as ${username}`);
            return true;
        } catch (error: any) {
            toast.error(`Check the password or the username`);
            return false;
        }
    };

    const signup = async (
        username: string,
        password: string,
        email: string
    ) => {
        try {
            const createdUser = await Parse.User.signUp(username, password, {
                email,
            });

            const loggedInUser = await Parse.User.current();
            setUser(loggedInUser);
            setFetched(true);
            toast.success(
                `Success! User ${createdUser.getUsername()} was successfully created!`
            );
            return true;
        } catch (error) {
            toast.error(`Error happened`);
            return false;
        }
    };
    useEffect(() => {
        const fetch = async () => {
            try {
                const currentUser = await Parse.User.current();
                setUser(currentUser);
            } catch (error) {
                console.log(error);
            } finally {
                setFetched(true);
            }
        };
        fetch();
    }, []);
    return (
        <AuthContext.Provider value={{ user, logout, login, signup }}>
            {fetched ? children : null}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export const authenticated = () => useAuth().user != null;
