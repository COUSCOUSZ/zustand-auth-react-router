import { LoaderFunctionArgs, useNavigate } from 'react-router-dom';
import { protectedLoader } from '../../loaders/protectedLoader';
import useAuth from '../../hooks/useAuth';

export async function profileLoader(args: LoaderFunctionArgs) {
    //* if i had some business logic i would put it here
    console.log("profileLoader UserProfile.tsx");
    return protectedLoader(args);
}


const Profile = () => {
    console.log("useProfile UserProfile.tsx");
    //! take into consideration lastFetchTime
    const { user, fetchUserProfile, lastFetchTime, isLoading } = useAuth();
    const navigate = useNavigate();

    //? idea-->data might be invalidated if the user changes their profile?
    return (
        <div>
            <h2>User Profile</h2>
            {user && (
                <>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Type: {user.type}</p>
                    <p>Name: {user.first_name} {user.last_name}</p>
                </>
            )}
            <button onClick={() => fetchUserProfile()}
                className='block my-1 bg-slate-800 text-white rounded px-3 py-1'>
                {isLoading ? 'Refetching...' : 'Refetch'}
            </button>
            <button className='block my-1 bg-red-800 text-white rounded px-3 py-1' onClick={()=>navigate("/logout")}>
                {isLoading ? 'Ok...' : 'Logout'}
            </button>
        </div>
    );
};

export default Profile;