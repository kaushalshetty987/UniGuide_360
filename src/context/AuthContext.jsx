import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { auth, googleProvider, db } from '../lib/firebase';
import {
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    // Flag to prevent onAuthStateChanged from overriding role set by login functions
    const roleSetByLogin = useRef(false);

    const loginWithGoogle = async (targetRole) => {
        try {
            roleSetByLogin.current = true; // Signal that we'll handle the role ourselves
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            await checkCreateUser(user, { role: targetRole });
            return user;
        } catch (error) {
            roleSetByLogin.current = false;
            console.error("Google Sign In Error:", error);
            throw error;
        }
    };

    const loginWithEmail = async (email, password, targetRole) => {
        try {
            roleSetByLogin.current = true;
            const result = await signInWithEmailAndPassword(auth, email, password);
            await checkCreateUser(result.user, { role: targetRole });
            return result.user;
        } catch (error) {
            roleSetByLogin.current = false;
            console.error("Email Sign In Error:", error);
            throw error;
        }
    };

    const registerWithEmail = async (email, password, name, targetRole) => {
        roleSetByLogin.current = true;
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await checkCreateUser(result.user, { displayName: name, role: targetRole });
        return result.user;
    };

    const logout = async () => {
        setUserRole(null);
        setCurrentUser(null);
        roleSetByLogin.current = false;
        await signOut(auth);
    };

    const checkCreateUser = async (user, additionalData = {}) => {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            const userData = {
                uid: user.uid,
                email: user.email,
                name: user.displayName || additionalData.displayName || "New User",
                photoURL: user.photoURL || "https://ui-avatars.com/api/?name=" + (user.displayName || "User"),
                role: additionalData.role || "student",
                createdAt: new Date().toISOString()
            };
            await setDoc(userRef, userData);
            console.log("AuthContext: Created new user with role:", userData.role);
            setUserRole(userData.role);
        } else {
            // Existing user — always update role to what was selected on the login page
            if (additionalData.role && additionalData.role !== userSnap.data().role) {
                console.log(`AuthContext: Switching role from ${userSnap.data().role} to ${additionalData.role}`);
                await updateDoc(userRef, { role: additionalData.role });
                setUserRole(additionalData.role);
            } else {
                setUserRole(userSnap.data().role);
            }
        }
    };

    useEffect(() => {
        console.log("AuthContext: Setting up auth listener");
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log("AuthContext: Auth state changed", user ? "User logged in" : "No user");
            setCurrentUser(user);

            if (user) {
                // If role was already set by the login function, skip Firestore read
                if (roleSetByLogin.current) {
                    console.log("AuthContext: Skipping Firestore read, role already set by login function");
                    roleSetByLogin.current = false;
                    setLoading(false);
                    return;
                }

                // Page refresh / returning user — read role from Firestore with timeout
                const userRef = doc(db, "users", user.uid);
                try {
                    const timeoutPromise = new Promise((_, reject) =>
                        setTimeout(() => reject(new Error('Firestore read timed out')), 5000)
                    );
                    const userSnap = await Promise.race([getDoc(userRef), timeoutPromise]);
                    if (userSnap.exists()) {
                        setUserRole(userSnap.data().role);
                    } else {
                        setUserRole("student");
                    }
                } catch (e) {
                    console.warn("AuthContext: Error/timeout fetching user role, using fallback:", e.message);
                    setUserRole("student");
                } finally {
                    setLoading(false);
                }
            } else {
                setUserRole(null);
                setLoading(false);
            }
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userRole,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logout
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
