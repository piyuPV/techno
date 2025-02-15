const mongoose = require("mongoose")

const anamolySchema = new mongoose.Schema({
    invoiceId: { type:mongoose.Schema.Types.objectId, ref:'Invoice', required:true },
    vendorId: { type:mongoose.Schema.Types.objectId, ref:'Vendor', required:true },
    severity: { enum: 'low' || 'medium' || 'high', required:true },
    status: { enum: 'notified' || 'addressed' || 'normalize', required:true },
    description: { type: String, required:true },
})

module.exports = mongoose.model("Anamoly", anamolySchema)
