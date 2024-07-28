import useAuth from "../hooks/useAuth";

export interface User{
    user_id:number;
    email:string;
    username:string;
    type:string;
    first_name:string;
    last_name:string;
    is_active:boolean;
}

export interface RegisterData {
    email:string;
    username:string;
    type:string;
    password:string;
    re_password:string;
    first_name:string;
    last_name:string;
}

export interface AuthState {
    user : User | null;
    accessToken : string | null;
    lastFetchTime: number | null;
    isLoading : boolean;
    error : string | null;
    login:(email:string,password:string)=>Promise<void>;
    register: (userData: RegisterData) => Promise<void>;
    logout:()=>void;
    logoutBlacklisToken:()=>void;
    fetchUserProfile:()=>Promise<void>;
    // refreshToken:()=>Promise<string | undefined>;
}

export type AuthContext = ReturnType<typeof useAuth>;
