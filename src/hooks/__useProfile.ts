import { useEffect } from 'react';
import useAuthStore from '../store/authStore';

const UseProfile = () => {
    
    const { user, accessToken, fetchUserProfile } = useAuthStore();

    useEffect(() => {
        //* If we have an access token but no user profile, fetch the user profile
        if (accessToken && !user) {
            console.log("Fetching user profile usePr.ts");
            fetchUserProfile();
        }
    }, [accessToken, user, fetchUserProfile]);

    return useAuthStore();
};

export default UseProfile;