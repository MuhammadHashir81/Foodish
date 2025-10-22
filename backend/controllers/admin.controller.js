import { Admin } from "../Models/Admin.Schema.js";
export const adminController = async (req, res) => {  
    
    const {description, image, price, rating, category} = req.body; 

    const createAdmin = await Admin.create({description, image, price, rating, category,});
    res.status(201).json({message: 'Admin created successfully', createAdmin});

  try {
  } catch (error) {
      res.status(500).json({message: 'Internal server error'});
  }
}


// get all foods


export const getAdminFoods = async (req, res) => {  
  try {
      const foods = await Admin.find();   

        res.status(200).json({success: "Foods fetched successfully", foods});

    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
}
