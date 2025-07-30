import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_ENDPOINT } from '@/utils/constant';
import { toast } from 'sonner'; 
import { useDispatch, useSelector } from 'react-redux';
import { setloading, setUser } from '@/redux/authSlice';
import store from '@/redux/store';
import { Loader2 } from 'lucide-react';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const { loading , user} = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const SubmitHandler = async (e) => {
        e.preventDefault();

        try {
            dispatch(setloading(true));
            const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user))
                navigate("/"); 
                toast.success(res.data.message); 
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred"); 
        } finally {
            dispatch(setloading(false));
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-full px-4 sm:px-8 lg:px-16 my-5'>
                <form onSubmit={SubmitHandler} className='w-full sm:w-4/5 md:w-1/2 lg:w-1/3 xl:w-1/4 border border-grey-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>

                    <div className='my-2'>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            id="email"
                            onChange={changeEventHandler}
                            placeholder="Enter your Mail"
                            className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                        />
                    </div>

                    <div className='my-2'>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            id="password"
                            onChange={changeEventHandler}
                            placeholder="********"
                            className="w-full focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                        />
                    </div>

                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    id="r1"
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="Recruiter"
                                    checked={input.role === 'Recruiter'}
                                    onChange={changeEventHandler}
                                    id="r2"
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {
                        loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin ' />Please wait</Button> : <Button type="submit" className="w-full my-4">Login</Button>
                    }

                    <span className='text-sm'>
                        Don't have an Account? <Link to="/signup" className='text-blue-600'>Sign Up</Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Login;
