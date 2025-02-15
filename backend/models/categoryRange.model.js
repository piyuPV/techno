const mongoose = require("mongoose")

const categoryRangeSchema = new mongoose.Schema({
    category: { type: String, required: true },
    minAmount: { type: Number, required: true },
    maxAmount: { type: Number, required: true },
    avgAmount: { type: Number, required: true },
    totalAnamolies: { type: Number, required: true, default: 0 },
    userId: { type:mongoose.Schema.Types.objectId, ref:'User', required:true },
},
{
    timestamps:true
})

module.exports = mongoose.model('CategoryRange', categoryRangeSchema)