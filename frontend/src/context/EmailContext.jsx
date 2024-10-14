import { createContext, useContext, useState } from "react";

const EmailContext = createContext();

export const useEmailContext = () => {
    return useContext(EmailContext);
}

export const EmailProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);

    return (
        <EmailContext.Provider value={{ email, setEmail, emailSent, setEmailSent }}>
            {children}
        </EmailContext.Provider>
    );
}