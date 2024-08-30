import { Company } from "../models/compayn.model.js"
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;

        // Check if companyName is provided
        if (!companyName) {
            return res.status(400).json({
                message: "Company Name is Required!",
                success: false
            });
        }

        // Check if the company already exists
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register the same company twice.",
                success: false
            });
        }

        // Create the new company
        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company Registered Successfully!",
            company,
            success: true
        });
    } catch (error) {
        console.error(error); // Log the error for debugging

        return res.status(500).json({
            message: "An error occurred while registering the company.",
            success: false
        });
    }
}

export const getCompany = async (req, res) => {
    try {
        const userId = req.id; //logged in user id
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "Company Not Found !",
                success: false
            })
        }

        return res.status(200).json({
            companies,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

//get company by id 

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!companyId) {
            return res.status(404).json({
                message: "Company Not Found !",
                success: false
            })
        }

        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

//update company information

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;
        //idhar cloudinary
const fileUri = getDataUri(file);
const cloudresponse = await cloudinary.uploader.upload(fileUri.content);
const logo = cloudresponse.secure_url;


        const updateData = { name, description, website, location , logo };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(400).json({
                message: "Company not Found",
                success: false
            })
        }

        return res.status(200).json({
            message: "Company Information Updated",
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}
