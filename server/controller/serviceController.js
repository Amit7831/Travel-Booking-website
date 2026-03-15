const Service = require('../model/Service')

const AddService = async (req, res) => {
    try {
        const service = await Service.create(req.body);
        return res.json({
            message: "Service created ",
            status: true
        });
    } catch (err) {
        return res.json({
            message: " Error while create service",
            status: false,
        });
    }
};


const GetService = async (req, res) => {
    try {
        const service = await Service.find()

        return res.json({
            message: "Service get success",
            service: service,
            status: true
        });
        
    } catch (err) {
        console.log(err);

        return res.json({
            message: "Error while Fetch"
        });
    }
}



const UpdateService = async (req, res) => {
    try { 
        const updateservice = await Service.findByIdAndUpdate(req.params.id, req.body);
        return res.json({
            message: "Updated Successfully",
            status: true,
            updateservice
        });
    } catch (err) {
        return res.json({
            message: "Error while update",
            status: false,
        });
        
    }
}


const DeleteService = async (req, res) => {
    try {
        const deleteservice = await Service.findByIdAndDelete(req.params.id);
        return req.json({
            message: "Deleted successfull",
            status: true,
            deleteservice,
        });
    } catch (err) {
        console.log(err);
        return res.json({
            message: "Error while delete",
            status: false,
        });
     }
}


module.exports = {
    AddService,
    GetService,
    UpdateService,
    DeleteService
};