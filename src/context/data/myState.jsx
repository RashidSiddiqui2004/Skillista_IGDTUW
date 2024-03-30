
import React, { useState } from 'react'
import MyContext from './myContext'
import {
    Timestamp, addDoc, collection, deleteDoc, doc, getDocs,
    onSnapshot, orderBy, query, setDoc, getDoc, updateDoc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { where } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';

function myState(props) {

    const [loading, setLoading] = useState(false);

    const searchUsersBySkill = async (skill) => {

        try {
            const usersCollectionRef = collection(fireDB, 'users');
            const usersQuery = query(usersCollectionRef, where('skills', 'array-contains', skill));
            const usersSnapshot = await getDocs(usersQuery);

            if (!usersSnapshot.empty) {
                const matchedUsers = usersSnapshot.docs.map(doc => doc.data());
                return matchedUsers;

            } else {
                console.log(`No users found with skill: ${skill}`);
                return [];
            }
        } catch (error) {
            console.error('Error searching users:', error);
            return [];
        }
    };

    const getUserDetails = async (userid) => {
        setLoading(true)
        try {
            const userProfileRef = doc(fireDB, 'userProfiles', userid);
            const userProfileDoc = await getDoc(userProfileRef);

            if (userProfileDoc.exists()) {
                const userData = userProfileDoc.data();
                return userData;
            } else {
                console.error('User profile not found.');
                return null;
            }
        } catch (error) {
            console.error('Error getting user details:', error);
            return null;
        } finally {
            setLoading(false)
        }
    }

    const createUserJobProfile = async (fullName, uid, email, domain, skills, experience, bio) => {
        try {
            const userProfileRef = doc(fireDB, 'userProfiles', uid);

            const userProfileData = {
                name: fullName,
                email: email,
                domain: domain,
                skills: skills,
                experience: experience,
                bio: bio,
                resume: ''
            };

            await setDoc(userProfileRef, userProfileData);
            return true;
        } catch (error) {
            return false;
        }
    };

    const addResume = async (userid, resumeurl) => {
        setLoading(true);
        try {
            const userProfileRef = doc(fireDB, 'userProfiles', userid);
            const userData = { resume: resumeurl };

            await setDoc(userProfileRef, userData, { merge: true });
            setLoading(false);

            return true;
        } catch (error) {
            setLoading(false);
            return false;
        }
    };

    const createClientProfile = async (fullName, uid, email, gender, industry, experience, bio) => {
        try {
            const userProfileRef = doc(fireDB, 'userProfiles', uid);

            const userProfileData = {
                name: fullName,
                email: email,
                industry: industry,
                experience: experience,
                gender: gender,
                bio: bio
            };

            await setDoc(userProfileRef, userProfileData);

            return true;
        } catch (error) {
            return false;
        }
    };

    const hireUser = async (client, clientName, clientemail, details, skillster) => {
        try {
            const hiringsCollectionRef = collection(fireDB, 'hirings');
            const hiringId = `${client}${skillster}`; // Concatenate client ID and skillster ID for document ID
            const hiringDocRef = doc(hiringsCollectionRef, hiringId);

            const hiringData = {
                client: client,
                skillster: skillster,
                clientEmail: clientemail,
                clientName: clientName,
                jobDetails: details,
                timestamp: Timestamp.now()
            };

            await setDoc(hiringDocRef, hiringData);
            return true;
        } catch (error) {
            console.error('Error hiring user:', error);
            return false;
        }
    };

    const getMyClientsList = async (skillsterId) => {
        try {
            const hiringsCollectionRef = collection(fireDB, 'hirings');
            const usersQuery = query(hiringsCollectionRef, where('skillster', '==', skillsterId),
                orderBy('timestamp', 'asc'));
            const querySnapshot = await getDocs(usersQuery);

            const clientsList = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                clientsList.push({ client: data.client, clientName: data.clientName, clientemail: data.clientEmail, jobDetails: data.jobDetails });
            });

            return clientsList;
        } catch (error) {
            console.error('Error retrieving clients list:', error);
            return null;
        }
    };

    const fetchMyEmployees = async (clientId) => {
        try {
            const hiringsCollectionRef = collection(fireDB, 'acceptedJobs');
            const usersQuery = query(hiringsCollectionRef, where('client', '==', clientId),
                orderBy('timestamp', 'asc'));
            const querySnapshot = await getDocs(usersQuery);

            const clientsList = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                clientsList.push(data);
            });

            return clientsList;
        } catch (error) {
            console.error('Error retrieving clients list:', error);
            return null;
        }
    }

    const sendAcceptMsg = async (skillsterId, skillsterName, skillsterEmail, clientId) => {
        try {
            const hiringsDocRef = doc(fireDB, 'hirings', `${clientId}${skillsterId}`);
            const hiringsDocSnapshot = await getDoc(hiringsDocRef);

            if (hiringsDocSnapshot.exists()) {
                const hiringsData = hiringsDocSnapshot.data();

                hiringsData.employeeId = skillsterId;
                hiringsData.employeeName = skillsterName;
                hiringsData.employeeEmail = skillsterEmail;

                await deleteDoc(hiringsDocRef);

                const acceptedJobsCollectionRef = collection(fireDB, 'acceptedJobs');
                const acceptedJobDocRef = doc(acceptedJobsCollectionRef, `${clientId}${skillsterId}`);

                await setDoc(acceptedJobDocRef, hiringsData);

                console.log('Acceptance message sent successfully.');
                return true;
            } else {
                console.error('Document to be deleted does not exist.');
                return false;
            }
        } catch (error) {
            console.error('Error sending acceptance message:', error);
            return false;
        }
    };

    const createCourse = async (title, cost, selectedDomain, desc, skills) => {
        try {

            const coursesCollectionRef = collection(fireDB, 'courses');

            const newCourse = {
                title: title,
                cost: cost,
                domain: selectedDomain,
                description: desc,
                skills: skills
            };

            const docRef = await addDoc(coursesCollectionRef, newCourse);
            toast.success("Course uploaded", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            setLoading(false)
            return docRef.id;
        } catch (error) {
            setLoading(false)
            return null;
        }
    };

    const [profiles, setProfiles] = useState([]);

    const getallProfiles = async () => {
        setLoading(true)

        try {
            const q = query(
                collection(fireDB, 'users'),
                orderBy('timestamp', 'asc'),
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let profilesArr = [];

                QuerySnapshot.forEach((doc) => {
                    profilesArr.push({ ...doc.data(), id: doc.id });
                });
                setProfiles(profilesArr);
                setLoading(false);

            });

            return true;

        } catch (error) {
            setLoading(false)
            return false;
        }

    }

    const [courses, setCourses] = useState([]);

    const getAllCourses = async () => {

        setLoading(true)

        try {
            const q = query(
                collection(fireDB, 'courses')
            );

            const data = onSnapshot(q, (QuerySnapshot) => {
                let coursesArray = [];

                QuerySnapshot.forEach((doc) => {
                    coursesArray.push({ ...doc.data(), id: doc.id });
                });
                setCourses(coursesArray);
                setLoading(false);
            });

            return true;

        } catch (error) {
            setLoading(false)
            return false;
        }

    }

    const enrollCourse = async (userId, courseId) => {
        try {
            const enrollmentId = `${userId}_${courseId}`; // Concatenate userId and courseId for document ID
            const enrollmentRef = doc(fireDB, 'enrollments', enrollmentId);

            const enrollmentDoc = await getDoc(enrollmentRef);
            if (enrollmentDoc.exists()) {
                toast.info("Course already enrolled", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return enrollmentId;
            }

            const enrollmentData = {
                userId: userId,
                courseId: courseId,
                enrolledAt: new Date()
            };

            await setDoc(enrollmentRef, enrollmentData);
            toast.success("Course enrolled, visit My Courses page", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            return enrollmentId;
        } catch (error) {
            toast.success("Error enrolling course", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return null; // Return null if an error occurs
        }
    };

    const isEnrolledinCourse = async (userId, courseId) => {
        try {
            const enrollmentId = `${userId}_${courseId}`; // Concatenate userId and courseId for document ID
            const enrollmentRef = doc(fireDB, 'enrollments', enrollmentId);

            const enrollmentDoc = await getDoc(enrollmentRef);
            if (enrollmentDoc.exists()) {
                return true;
            }
        } catch {
            return false;
        }
    };

    const getMyCourses = async (userid) => {
        try {
            const enrollmentsCollectionRef = collection(fireDB, 'enrollments');
            const userEnrollmentsQuery = query(enrollmentsCollectionRef, where('userId', '==', userid));
            const querySnapshot = await getDocs(userEnrollmentsQuery);
            const myCourses = [];

            const coursePromises = [];

            querySnapshot.forEach((docum) => {
                const courseData = docum.data();
                const courseId = courseData.courseId;
                const courseRef = doc(fireDB, 'courses', courseId);

                const coursePromise = getDoc(courseRef).then((reportDoc) => {
                    if (reportDoc.exists()) {
                        const data = { id: reportDoc.id, ...reportDoc.data() };
                        myCourses.push(data);
                    }
                }).catch((error) => {
                    console.error(`Error fetching course details for ID '${courseId}':`, error);
                });

                coursePromises.push(coursePromise);
            });

            await Promise.all(coursePromises);
            return myCourses;

        } catch (error) {
            return null;
        }
    };

    const getCourseData = async (courseID) => {
        setLoading(true);

        try {
            const crsRef = doc(fireDB, 'courses', courseID);
            const crsDoc = await getDoc(crsRef);

            if (crsDoc.exists()) {
                const courseData = crsDoc.data();
                setLoading(false);
                return courseData;
            } else {
                setLoading(false);
                return null;
            }
        } catch (error) {
            setLoading(false);
            console.error('Error getting course data:', error);
            return null;
        }
    };


    return (
        <MyContext.Provider value={{
            loading, setLoading,
            getallProfiles,
            addResume,
            searchUsersBySkill,
            hireUser,
            sendAcceptMsg,
            getMyClientsList,
            fetchMyEmployees,
            getAllCourses,
            createUserJobProfile,
            createClientProfile,
            getUserDetails,
            createCourse,
            courses,
            getCourseData,
            enrollCourse,
            getMyCourses,
            isEnrolledinCourse,
        }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default myState


