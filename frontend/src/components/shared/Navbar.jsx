import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_ENDPOINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'

const Navbar = () => {

    const { user } = useSelector(store => store.auth);


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logOuthandler = async () => {
        try {
            const res = await axios.get(`${USER_API_ENDPOINT}/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)

        }
    }

    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Quest</span></h1>
                </div>
                <div className=' flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'Recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li></>
                            )
                        }

                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"> <Button varient="outline">Login</Button> </Link>
                                <Link to="/signup"> <Button className="bg-[#6A38C2] hover:bg-[#4f249a]">Signup</Button> </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage className="w-10 h-10 rounded-full" src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-80 mx-1 border border-black/20  bg-slate-100'>
                                    <div className='p-4'>
                                        <div className='flex gap-4 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div className='text-center'>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>

                                        {/* //2nd div */}
                                        <div className='flex flex-col my-2 text-grey-600 mt-4'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center cursor-pointer'>
                                                        <User2 />
                                                        <Button className="border-none " variant="link"><Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }


                                            <div className='flex w-fit items-center cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logOuthandler} className="border-white" variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }




                </div>
            </div>
        </div>
    )
}

export default Navbar