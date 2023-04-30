import mongoose, { mongo } from "mongoose";

const userShema = new mongoose.Schema({
    name: {
        type: String,
        required: "Please enter your full name",
    },

    email: {
        type: String,
        required: "Please enter your email address",
        trim: true,
        unique: true,
    },

    password: {
        type: String,
        required: "Please enter a password."
    },

    role: {
        type: String,
        default: 'user'
    },

    image: {
        type: String,
        default: "https://i.postimg.cc/2SVh3hvK/profile-icon-01.png"
    },

    emailVerified: {
        type: Boolean,
        default: false,
    },

    defaultPaymentMethod: {
        type: String,
        default: ""
    },

    address: [
        {
            firstName: {
                type: String
            },
            lastName: {
                type: String
            },
            phoneNumber: {
                type: String
            },
            address1: {
                type: String
            },
            address2: {
                type: String
            },
            city: {
                type: String
            },
            zipCode: {
                type: String
            },
            state: {
                type: String
            },
            country: {
                type: String
            },
            active: {
                type: Boolean,
                default: false
            },
        }
    ]
},
    {
        // This is use for create the time of create and update
        timestamps: true,
    }
)

const User = mongoose.models.User || mongoose.model('User', userShema)

export default User