import nc from 'next-connect'
import db from '@/utils/db'
import bcrypt from "bcrypt";
import { validateEmail } from '@/utils/validation'
import User from '@/models/User'
import { createResetToken } from '@/utils/tokens';
import { sendEmail } from '@/utils/sendEmails';
import { resetEmailTemplate } from '@/emails/resetEmailTemplate';

const handler = nc()

handler.put(async (req, res) => {
    try {
        await db.connectDb()
        const { user_id, password } = req.body
        const user = await User.findById(user_id)
        if (!user) {
            return res.status(400).json({ message: "This account does not exist." })
        }

        const cryptedPassword = await bcrypt.hash(password, 12)

        await user.updateOne({
            password: cryptedPassword
        })

        res.json({ email: user.email })

        await db.disconnectDb()

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default handler