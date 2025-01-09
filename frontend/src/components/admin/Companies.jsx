import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Companiestable from './Companiestable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { SearchCompanyByText } from '@/redux/CompanySlice';

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(SearchCompanyByText(input));
    }, [input, dispatch]);

    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto my-10 px-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 my-5">
                    <Input
                        className="w-full sm:w-auto"
                        placeholder="Filter By Name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate('/admin/companies/create')} className="w-full sm:w-auto">
                        New Company
                    </Button>
                </div>
                <Companiestable />
            </div>
        </div>
    );
};

export default Companies;
