import { useState } from 'react'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import Link from 'next/link'
import styles from '../../styles/forgot.module.scss'
import { BiLeftArrowAlt } from 'react-icons/bi'
import CircleIconBtn from '@/components/buttons/circleIconBtn/CircleIconBtn'
import LoginInput from '@/components/inputs/LoginInput'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import DotLoaderSpinner from '@/components/loaders/DotLoader'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import { RiArrowLeftLine, RiCheckboxCircleLine, RiInformationLine, RiKeyFill } from 'react-icons/ri'
import HashLoaderSpinner from '@/components/loaders/HashLoader'
import { signIn } from 'next-auth/react'


export default function forgot() {

    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const emailValidation = Yup.object({
        email: Yup.string()
            .required(
                "You need your email account to reset your password"
            )
            .email("Enter a valid email address."),
    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(emailValidation),
        mode: "onTouched"
    });

    const forgotHandler = async (data) => {
        const { email } = data
        try {
            setLoading(true)
            const { data } = await axios.post('/api/auth/forgot', {
                email,
            })
            setError("")
            setSuccess(data.message)
            setLoading(false)
            setEmail("")
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
                        <span className='font-semibold text-xl text-secondary-blue'>Reset your password</span>
                    </div>

                    <p className='text-sm'>
                        Enter the email address associated with your account and we'll send you a link to reset your password
                    </p>

                    <form
                        onSubmit={handleSubmit(forgotHandler)}
                        className='flex flex-col gap-2 mt-6'
                    >
                        <LoginInput
                            register={register}
                            errors={errors}
                            icon='email'
                            name='email'
                            type='text'
                            label='Email Address'
                        />
                        <button type='submit' className='btn_primary w-full h-[3rem]'>Reset Password</button>
                    </form>

                    <div>
                        {
                            success &&
                            <div className='text-success-color grid grid-cols-[.9rem_1fr] justify-start items-start gap-1 mt-2'>
                                <RiCheckboxCircleLine className={`text-base ${success ? 'block' : 'hidden'} `} />
                                <p className='text-sm'>{success}</p>
                            </div>
                        }
                    </div>

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
                            email
                        }}

                        validationSchema={emailValidation}
                        onSubmit={() => {
                            forgotHandler()
                        }}
                    >
                        {
                            (form) => (
                                <Form>
                                    <LoginInput
                                        icon='email'
                                        placeholder='Email Address'
                                        type='text'
                                        name='email'
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {
                                        success && <span className={styles.success}>{success}</span>
                                    }

                                    {
                                        error && <span className={styles.error}>{error}</span>
                                    }

                                    <CircleIconBtn
                                        type='submit'
                                        text='Send Link'
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
