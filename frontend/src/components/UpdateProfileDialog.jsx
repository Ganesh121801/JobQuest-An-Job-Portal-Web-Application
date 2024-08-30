import { Dialog, DialogContent, DialogFooter, DialogTitle } from './ui/dialog'
import React, { useState } from 'react'
import { DialogHeader } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { USER_API_ENDPOINT } from '@/utils/constant'

const UpdateProfileDialog = ({ open, setOpen }) => {
    //dialog use krunga
    const [loading, setLoading] = useState(false);
    //user ko lane ke liye user ko curley braces mein dalna hai aur destructuring array mein hotis hai
    const { user } = useSelector(store => store.auth);
    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skill => skill),
        file: user?.profile?.resume
    });
    const dispatch = useDispatch();

    //data get krna pdega
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }
    const onSubmithandler = async (e) => {
        e.preventDefault();
        //api call
        const formdata = new FormData();
        formdata.append("fullname", input.fullname);
        formdata.append("email", input.email);
        formdata.append("phoneNumber", input.phoneNumber);
        formdata.append("bio", input.bio);
        formdata.append("skills", input.skills);
        if (input.file) {
            formdata.append("file", input.file);
         }

         try {
            setLoading(true);
            const res = await axios.post(`${USER_API_ENDPOINT}/profile/update` , formdata,{
                headers:{
                    'Content-Type' :'multipart/form-data'
                },
                withCredentials:true
            });
    
            if(res.data.success){
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false)
        }
        setOpen(false);
        console.log(input);
       
    }

    


    return (
        <div>
            <Dialog open={open} >
                <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={onSubmithandler}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="name" className='text-right'>Name</Label>
                                <Input name="name"
                                    id="name"
                                    type="text"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    className='col-span-3' />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="email" className='text-right'>Email</Label>
                                <Input name="email"
                                    id="email"
                                    type="email"
                                    value={input.email}
                                    className='col-span-3' />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="number" className='text-right'>Number</Label>
                                <Input name="number"
                                    id="number"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className='col-span-3' />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="bio" className='text-right'>Bio</Label>
                                <Input name="bio"
                                    id="bio"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className='col-span-3' />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="skills" className='text-right'>Skills</Label>
                                <Input name="skills"
                                    id="skills"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    className='col-span-3' />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="file" className='text-right'>Resume</Label>
                                <Input name="file"
                                    id="file"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={fileChangeHandler}
                                    className='col-span-3' />
                            </div>

                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin ' />Please wait</Button> : <Button type="submit" className="w-full my-4">Update</Button>
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog