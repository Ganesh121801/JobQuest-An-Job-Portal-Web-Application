import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: 'job',
    initialState: {
        allJobs: [],
        singleJob: null,
        allAdminJobs: [],  // This should be your admin jobs state
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery:""
    },
    reducers: {
        setAlljobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {  // Make sure this reducer exists
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs:(state,action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery:(state , action)=>{
            state.searchedQuery = action.payload;
        }
    },
});
export const { 
    setAlljobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery, } = jobSlice.actions;
export default jobSlice.reducer;