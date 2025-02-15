const mongoose = require("mongoose")

const vendorSchema = new mongoose.Schema({
   name: { type:String, required:true },
   email: { type:String, required:true, unique:true },
   phone: { type:String, required:true },
   address: { type:String, required:true },
   country: { type:String, required:true}
})

module.exports = mongoose.model('Vendor', vendorSchema)