const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
    vendorId: { type:mongoose.Schema.Types.objectId, ref:'Vendor', required:false },
    invoiceId: { type:mongoose.Schema.Types.objectId, ref:'Invoice', required:true },
},
{
    timestamps: true
})

module.exports = mongoose.model('Transaction', transactionSchema)