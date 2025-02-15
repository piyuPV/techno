const mongoose = require("mongoose")

const companySchema = new mongoose.Schema({
    name: { type:String, required:true },
    gstNumber: { type:String, required:true },
    owner: { type:mongoose.Schema.Types.objectId, ref:'User', required:true },
    address: { type:String, required:true },
    country: { type:String, required:true }
},
{
    timestamps:true
})

module.exports = mongoose.model('Company', companySchema)