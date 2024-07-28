import useAuthStore from '../store/authStore';

const useAuth = () => {
    // console.log("useAuth.ts");
    return useAuthStore();
};

export default useAuth;