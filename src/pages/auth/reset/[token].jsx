import { useState } from 'react'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import Link from 'next/link'
import styles from '../../../styles/forgot.module.scss'
import { BiLeftArrowAlt } from 'react-icons/bi'
import CircleIconBtn from '@/components/buttons/circleIconBtn/CircleIconBtn'
import LoginInput from '@/components/inputs/LoginInput'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import DotLoaderSpinner from '@/components/loaders/DotLoader'
import { getSession, signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import HashLoaderSpinner from '@/components/loaders/HashLoader'
import { RiArrowLeftLine, RiInformationLine, RiKeyFill } from 'react-icons/ri'


export default function reset({ user_id }) {

    // console.log("user_id : ", user_id)
    const [password, setPassword] = useState("")
    const [conf_password, setConf_Password] = useState("")
    const [loading, setLoading] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const passwordValidation = Yup.object({
        password: Yup.string()
            .required('Enter a combination at least 6 numbers, letters, and punctuation marks (such as ! and &).')
            .min(6, "Password must be at least 6 characters.")
            .max(40, "Password can't be more than 40 characters"),
        conf_password: Yup.string()
            .required("Confirm your password.")
            .oneOf([Yup.ref("password")], "Password must match."),
    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(passwordValidation),
        mode: "onTouched"
    });

    const resetHandler = async (data) => {
        const { password, conf_password } = data
        try {
            setLoading(true)
            const { data } = await axios.put('/api/auth/reset', {
                user_id,
                password
            })

            let options = {
                redirect: false,
                email: data.email,
                password: password
            }

            await signIn('credentials', options)
            window.location.reload(true)
        } catch (error) {
            setLoading(false)
            setSuccess("")
            setError(error.response.data.message)
        }
    }

    return (
        <>
            {
                loading && <HashLoaderSpinner loading={loading} />
            }
            <div className='grid place-items-center h-screen -mt-[3rem]'>
                <div className='p-8 w-[30%]'>
                    <div className='grid place-items-center gap-4 mb-[3rem]'>
                        <div className='bg-[#4949e409] rounded-full p-2'>
                            <div className='bg-[#4949e40f] rounded-full p-3'>
                                <RiKeyFill className='text-secondary-blue text-3xl' />
                            </div>
                        </div>
                        <span className='font-semibold text-xl text-secondary-blue'>New password</span>
                    </div>

                    {/* <p className='text-sm'>
                        Enter the email address associated with your account and we'll send you a link to reset your password
                    </p> */}

                    <form
                        onSubmit={handleSubmit(resetHandler)}
                        className='flex flex-col gap-2 mt-6'
                    >
                        <LoginInput
                            register={register}
                            errors={errors}
                            icon='password'
                            name='password'
                            type='password'
                            label='Password'
                        />

                        <LoginInput
                            register={register}
                            errors={errors}
                            icon='password'
                            name='conf_password'
                            type='password'
                            label='Confirm Password'
                        />
                        <button type='submit' className='btn_primary w-full h-[3rem]'>Reset Password</button>
                    </form>
                    <div>
                        {
                            error &&
                            <div className='text-error-color grid grid-cols-[.9rem_1fr] justify-start items-start gap-1 mt-2'>
                                <RiInformationLine className={`text-base ${error ? 'block' : 'hidden'} `} />
                                <p className='text-sm'>{error}</p>
                            </div>
                        }
                    </div>

                    <button
                        className='w-full flex justify-center items-center gap-2 text-sm text-secondary-blue mt-[5rem]'
                        onClick={() => signIn()}
                    >
                        <RiArrowLeftLine />
                        <span>Back to login</span>
                    </button>

                    {/* <Formik
                        enableReinitialize
                        initialValues={{
                            password, conf_password
                        }}

                        validationSchema={passwordValidation}
                        onSubmit={() => {
                            resetHandler()
                        }}
                    >
                        {
                            (form) => (
                                <Form>
                                    <LoginInput
                                        icon='password'
                                        placeholder='Please input your password'
                                        type='password'
                                        name='password'
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                    <LoginInput
                                        icon='password'
                                        placeholder='Please input your password'
                                        type='password'
                                        name='conf_password'
                                        onChange={(e) => setConf_Password(e.target.value)}
                                    />
                                    {
                                        error && <span className={styles.error}>{error}</span>
                                    }

                                    <CircleIconBtn
                                        type='submit'
                                        text='Change Password'
                                    />
                                </Form>
                            )
                        }

                    </Formik> */}
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const { query, req } = context
    const session = await getSession({ req })
    if (session) {
        return {
            redirect: {
                destination: "/"
            }
        }
    }
    const token = query.token
    const user_id = jwt.verify(token, process.env.RESET_TOKEN_SECRET)

    return {
        props: {
            user_id: user_id.id
        }
    }
}