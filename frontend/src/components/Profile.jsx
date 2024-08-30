import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from './ui/button';
import { Mail, Contact, Pen } from 'lucide-react';
import { Label } from '@radix-ui/react-label';
import AppliedJobtable from './AppliedJobtable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import store from '@/redux/store';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
const isResume = true;
const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);
console.log(user)
  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-4'>
            <Avatar className='h-24 w-24'>
              <AvatarImage
              className='object-cover rounded-full'
                src={user?.profile?.profilePhoto}
                alt='Profile Photo'
              />
            </Avatar>
            <div>
              <h1 className='font-medium text-xl'>{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className='my-5'>
          <div className='flex items-center gap-3 my-3'>
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className='flex items-center gap-3'>
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className='my-5'>
          <h1 className='font-bold'>Skills</h1>
          <div className='flex flex-wrap gap-2 my-3'>
            {user?.profile?.skills?.length > 0 ? user?.profile?.skills.map((item, index) => (
              <span key={index} className='px-3 py-1 bg-red-500 text-white rounded-full text-sm'>
                {item}
              </span>
            )) : <span>NA</span>}
          </div>
        </div>
        
        <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
      </div>


      <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
        <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
        {/* Applied job table */}
        <AppliedJobtable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
