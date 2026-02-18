import {
    collection,
    addDoc,
    updateDoc,
    doc,
    arrayUnion,
    onSnapshot,
    query,
    where,
    orderBy,
    serverTimestamp,
    getDocs,
    getDoc
} from "firebase/firestore";
import {
    ref,
    uploadBytes,
    getDownloadURL
} from "firebase/storage";
import { db, storage } from "../lib/firebase";

// Collection References
const COURSES_COLLECTION = "courses";
const DOCUMENTS_COLLECTION = "documents";
const USERS_COLLECTION = "users";

export const dbService = {
    // --- Courses ---

    // Add a new course
    addCourse: async (courseData) => {
        try {
            const docRef = await addDoc(collection(db, COURSES_COLLECTION), {
                ...courseData,
                createdAt: serverTimestamp(),
                students: [] // Initialize empty student list
            });
            return { id: docRef.id, ...courseData };
        } catch (error) {
            console.error("Error adding course:", error);
            throw error;
        }
    },

    // Subscribe to all courses (Real-time) — with error handling
    subscribeToCourses: (callback) => {
        const q = query(collection(db, COURSES_COLLECTION), orderBy("createdAt", "desc"));
        return onSnapshot(q,
            (snapshot) => {
                const courses = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                callback(courses);
            },
            (error) => {
                console.warn("subscribeToCourses error (falling back to empty):", error.message);
                callback([]); // Fallback to empty array on error
            }
        );
    },

    // Register a student for a course
    registerForCourse: async (courseId, studentId) => {
        try {
            const courseRef = doc(db, COURSES_COLLECTION, courseId);
            await updateDoc(courseRef, {
                students: arrayUnion(studentId)
            });
            return true;
        } catch (error) {
            console.error("Error registering for course:", error);
            throw error;
        }
    },

    // --- Documents ---

    // Upload a document (Storage + Firestore)
    uploadDocument: async (file, studentId, studentName) => {
        try {
            // 1. Upload to Storage
            const storageRef = ref(storage, `documents/${studentId}/${Date.now()}_${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            // 2. Create Firestore record
            const docData = {
                name: file.name,
                url: downloadURL,
                studentId: studentId,
                studentName: studentName,
                status: 'pending', // pending, verified, rejected
                uploadedAt: serverTimestamp(),
                type: file.type,
                size: file.size
            };

            const docRef = await addDoc(collection(db, DOCUMENTS_COLLECTION), docData);
            return { id: docRef.id, ...docData };
        } catch (error) {
            console.error("Error uploading document:", error);
            throw error;
        }
    },

    // Subscribe to documents for a specific student — with error handling
    subscribeToStudentDocuments: (studentId, callback) => {
        const q = query(
            collection(db, DOCUMENTS_COLLECTION),
            where("studentId", "==", studentId),
            orderBy("uploadedAt", "desc")
        );
        return onSnapshot(q,
            (snapshot) => {
                const docs = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                callback(docs);
            },
            (error) => {
                console.warn("subscribeToStudentDocuments error (falling back to empty):", error.message);
                callback([]);
            }
        );
    },

    // Subscribe to ALL documents (For Admin) — with error handling
    subscribeToAllDocuments: (callback) => {
        const q = query(collection(db, DOCUMENTS_COLLECTION), orderBy("uploadedAt", "desc"));
        return onSnapshot(q,
            (snapshot) => {
                const docs = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                callback(docs);
            },
            (error) => {
                console.warn("subscribeToAllDocuments error (falling back to empty):", error.message);
                callback([]);
            }
        );
    },

    // Verify/Reject a document
    updateDocumentStatus: async (docId, status) => {
        try {
            const docRef = doc(db, DOCUMENTS_COLLECTION, docId);
            await updateDoc(docRef, {
                status: status,
                verifiedAt: serverTimestamp()
            });
            return true;
        } catch (error) {
            console.error("Error updating document status:", error);
            throw error;
        }
    }
};
