import { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [BikeData, setBikeData] = useState([]);
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState(false);
    const [toBePaid, setPayment] = useState(null);

    const provider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (currUser) => {
            setUser(currUser);
            setLoading(false);
        });
        return () => unsubcribe();
    }, []);

    const signWithGoogle = () => {
        return signInWithPopup(auth, provider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const passReset = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    // Handle bike data fetch with better error handling
    useEffect(() => {
        setLoading(true);
        fetch('https://ebikes-ten.vercel.app/bikes')
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json(); // Only parse if the response is valid
            })
            .then((data) => {
                setBikeData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching bike data:", error);
                setLoading(false); // Stop loading if an error occurs
            });
    }, []);

    // Handle admin user fetch
    useEffect(() => {
        if (user) {
            fetch(`https://ebikes-ten.vercel.app/users/admin?email=${user.email}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => {
                    if (data.role === 'admin') {
                        setAdmin(true);
                    } else {
                        setAdmin(false);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching admin data:", error);
                });
        }
    }, [user]);

    const obj = {
        BikeData,
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        signIn,
        logOut,
        signWithGoogle,
        auth,
        passReset,
        admin,
        toBePaid,
        setPayment
    };

    return (
        <AuthContext.Provider value={obj}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
