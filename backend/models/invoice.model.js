const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
    invoiceFile: { type: String, required: true },
    invoiceNumber: { type: String, required: true },
    invoiceDate: { type: Date, required: true },
    invoiceDueDate: { type: Date, required: false },
    invoiceAmount: { type: Number, required: true },
    vendorId: {type: mongoose.Schema.Types.objectId, ref:"Vendor", required: false},
    category: { type: String, required: false },
    invoiceType: { type: String, required: false },
    subCategory: { type: String, required: false },
    companyId: { type: mongoose.Schema.Types.objectId, ref: "Company", required: true },
    userId: { type: mongoose.Schema.Types.objectId, ref: "User", required: true },
},
{
    timestamps: true,
})

module.exports = mongoose.model('Invoice', invoiceSchema);