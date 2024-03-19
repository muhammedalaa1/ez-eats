import { createContext, useContext } from "react";

// @ts-ignore
import Parse from "parse/dist/parse.min.js";

export const Context = createContext<any>(undefined);
export const useParse = () => useContext(Context);

export const ParseProvider = ({ children }: { children: React.ReactNode }) => {
    Parse.initialize(
        import.meta.env.VITE_APP_PARSE_APP_ID,
        import.meta.env.VITE_APP_JS_KEY
    );
    Parse.serverURL = import.meta.env.VITE_APP_SERVER_URL;

    return <Context.Provider value={Parse}>{children}</Context.Provider>;
};
