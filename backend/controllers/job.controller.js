import { Job } from "../models/job.model.js";


///admin post krega job
export const postJob = async (req , res) =>{
    try {
        const {title , description , requirements , salary , location , jobType , experience , position , companyId} = req.body;
        const userId = req.id;
        if(!title || !description || !requirements || !salary ||!location || !jobType || !experience ||!position ||!companyId){
            return res.status(400).json({
                message : "Something is misssing !" ,
                success : false
            });
        }
     const Newjob = await Job.create({
    title ,
    description,
    requirements :requirements.split(" , ") ,
    salary : Number(salary),
    location ,
    jobType,
    experienceLevel : experience,
    position,
    company : companyId,
    created_by :userId

     });

     return res.status(201).json({
        message:"New job Created SuccessFully",
        Newjob,
        success:true
     })

    } catch (error) {
        console.log(error);
        
    }
}


//get all job
//student ke lieye
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };
        const jobs = await Job.find(query).populate("company").sort({ createdAt: -1 });

        if (jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};


//stuident ke lieye
export const getJobById = async (req , res) =>{
    try {
        const jobId = req.params.id ;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if(!job){
            return res.status(404).json({
                message:"jobs Not Found !",
                success :false
            })
        };


        return res.status(200).json({
        job,
        success :true
        })
    } catch (error) {
        console.log(error);
        
    }
}


//admin kitne job create kra abhi tak

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        // console.log(adminId)
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

