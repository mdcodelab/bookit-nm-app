"use client";
import React from 'react';
import { FaSignOutAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'; 
import { useAuthContext } from '../userContext';
import { logout } from '../actions/userActions';

function SignOutButton({}) {
    const {signOut, setUserId, userId}=useAuthContext();
    const router = useRouter();
    console.log(userId);

    const handleLogout = async () => {
        const response = await logout();
        toast.success("Signed out successful.");
        setUserId("");
        router.push("/login");
    }

    return (
        <button 
            onClick={handleLogout} 
            className='mx-3 text-gray-800 hover:text-gray-600'>
            <FaSignOutAlt className='inline mr-1' /> Sign Out
        </button>
    );
}

export default SignOutButton;
