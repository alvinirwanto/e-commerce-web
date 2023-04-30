import nc from 'next-connect'
import db from '@/utils/db'
import bcrypt from "bcrypt";
import { validateEmail } from '@/utils/validation'
import User from '@/models/User'
import { createActivationToken } from '@/utils/tokens';
import { sendEmail } from '@/utils/sendEmails';
import { activateEmailTemplate } from '@/emails/activateEmailTemplate';

const handler = nc()

handler.post(async (req, res) => {
    try {
        await db.connectDb()
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            res.status(400).json({ message: "Please fill in all fields" })
        }

        // Validate email using regex validation
        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Invalid email." })
        }

        // Check the email already exist or not
        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ message: "This email already exsits." })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters." })
        }

        // Encrypt the password
        const cryptedPassword = await bcrypt.hash(password, 12) // 12 is the number how strong your password, bigger the nummber, it will be harder to encrypt and need longer time to decrypt

        const newUser = new User({
            name,
            email,
            password: cryptedPassword
        })

        const addedUser = await newUser.save()

        // To make verified email
        const activation_token = createActivationToken({
            id: addedUser._id.toString(),
        })

        const url = `${process.env.BASE_URL}/activate/${activation_token}`
        sendEmail(email, url, "", "Activate your Account", activateEmailTemplate)

        await db.disconnectDb()
        res.json({
            message: "Register Success! Please activated your email to start!."
        })

        // console.log(activation_token)
        // res.send(url)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default handler