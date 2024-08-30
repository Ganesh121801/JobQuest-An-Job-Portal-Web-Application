import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar } from '../ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Companiestable = () => {
  const { companies, searchText } = useSelector(store => store.company);

  const [filterCompany, setFilterCompany] = useState([]);
  const navigate =useNavigate();

  useEffect(() => {
    if (Array.isArray(companies)) {
      const filteredCompany = companies.filter((company) => {
        if (!searchText) {
          return true;
        }
        return company?.name?.toLowerCase().includes(searchText.toLowerCase());
      });

      setFilterCompany(filteredCompany);
    }
  }, [companies, searchText]);

  if (!Array.isArray(companies)) {
    return <span>Error: Companies data is not available</span>;
  }

  return (
    <div>
      <Table>
        <TableCaption>
          A list of your recent companies
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4}>You haven't registered any companies yet</TableCell>
            </TableRow>
          ) : (
            filterCompany.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo} />
                  </Avatar>
                </TableCell>
                <TableCell>
                  {company.name}
                </TableCell>
                <TableCell>
                  {company.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 cursor-pointer'>
                        <Edit2 className='w-4' />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Companiestable;
