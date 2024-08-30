import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-4 my-8'>
                <span className='mx-auto px-3 py-1 rounded-full bg-gray-100 text-[#F83002] font-medium'>#1 Job Hunt Site</span>
                <h1 className='text-4xl font-bold'>Find & Secure Your <span className='text-[#6A3AC2]'>Dream Job</span></h1>
                <p className='text-gray-600'>Browse top job openings and apply with ease.</p>
                <div className='flex w-[40%] shadow-md border border-gray-200 pl-3 rounded-full items-center gap-2 mx-auto'>
                    <input
                        type="text"
                        placeholder='Search Jobs...'
                        onChange={(e) => setQuery(e.target.value)}
                        className='w-full outline-none'
                    />
                    <Button onClick={searchJobHandler} className="bg-[#6A3AC2] rounded-r-full">
                        <Search className='h-5 w-5 text-white' />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
