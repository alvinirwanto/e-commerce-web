import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema

const subSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [2, "Must be at least 2 characters"],
        maxlength: [32, 'Maximum character is 32 characters']
    },

    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },

    parent: {
        type: ObjectId,
        ref: "Category",
        required: true
    }
})

const SubCategory = mongoose.models.SubCategory || mongoose.model("SubCategory", subSchema)

export default SubCategory