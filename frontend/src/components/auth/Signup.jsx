import React, { useState } from 'react';
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
import store from '@/redux/store';
import { setloading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';


const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phonenumber: "",
        password: "",
        role: "",
        file: ""
    });
     const {loading , user} = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Handle input change
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // Handle file input change
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const SubmitHandler = async (e) => {
        e.preventDefault();
    
        const formData = new FormData(); // Note: FormData should start with uppercase F
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phonenumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }
    
        try {
            dispatch(setloading(true));
            const res = await axios.post(`http://localhost:3000/api/v1/user/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            });
    
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            // Improved error handling
            console.error("Signup error:", error); // Log the full error for debugging
        }
             finally {
                dispatch(setloading(false));

            }
        
    };
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    })
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={SubmitHandler} className='w-1/2 border border-grey-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Signup</h1>

                    <div className='my-2'>
                        <Label htmlFor="fullname">Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            id="fullname" // Added id for accessibility
                            onChange={changeEventHandler}
                            placeholder="Ganesh More"
                        />
                    </div>

                    <div className='my-2'>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            id="email" // Added id for accessibility
                            onChange={changeEventHandler}
                            placeholder="ganesh@gmail.com"
                        />
                    </div>

                    <div className='my-2'>
                        <Label htmlFor="phonenumber">Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phonenumber}
                            name="phonenumber"
                            id="phonenumber" // Added id for accessibility
                            onChange={changeEventHandler}
                            placeholder="9307699110"
                        />
                    </div>

                    <div className='my-2'>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            id="password" // Added id for accessibility
                            onChange={changeEventHandler}
                            placeholder="********"
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
                                    id="r1" // Added id for accessibility
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
                                    id="r2" // Added id for accessibility
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>

                        <div className='flex items-center gap-2'>
                            <Label htmlFor="profile">Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                name="file" // Added name attribute
                                id="profile" // Added id for accessibility
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>

                    {
                        loading ? <Button className ="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin ' />Please wait</Button> : <Button type="submit" className="w-full my-4">SignUp</Button>
                    }
                    <span className='text-sm'>
                        Already Have an Account? <Link to="/login" className='text-blue-600'>Login</Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Signup;
