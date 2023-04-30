import { RiCheckboxCircleLine, RiInformationLine } from 'react-icons/ri'

import Link from 'next/link'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import Image from 'next/image'
import { useState } from 'react'
import { getCsrfToken, getProviders, getSession, signIn } from 'next-auth/react'
import axios from "axios"
import Router from 'next/router'

import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

import Logo from '../../public/logo.svg'
import Background from '../../public/login-bg.svg'
import LoginInput from '@/components/inputs/LoginInput'
import RegisterInput from '@/components/inputs/RegisterInput'
import HashLoaderSpinner from '@/components/loaders/HashLoader'


const initialvalues = {
    login_email: "",
    login_password: "",
    name: "",
    email: "",
    password: "",
    conf_password: "",
    success: "",
    error: "",
    login_error: "",
};

export default function signin({ providers, callbackUrl, csrfToken }) {

    // console.log(providers)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(initialvalues)
    const {
        login_email,
        login_password,
        name,
        email,
        password,
        conf_password,
        success,
        error,
        login_error,
    } = user;

    const [showPasswordSignIn, setShowPasswordSignIn] = useState(false)
    const [showPasswordSignUp, setShowPasswordSignUp] = useState(false)
    const [showConfPasswordSignUp, setShowConfPasswordSignUp] = useState(false)

    const [login, setLogin] = useState(true)

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const loginValidation = Yup.object({
        login_email: Yup.string()
            .required("Email address is required")
            .email('Please enter a valid email address'),
        login_password: Yup.string()
            .required('Please enter a password')
    })

    const registerValidation = Yup.object({
        name: Yup.string()
            .required("What's your name?")
            .min(2, 'The name must be between 2 and 16 characters.')
            .max(20, 'The name must be between 2 and 16 characters.')
            .matches(/^[aA-zZ]/, 'Numbers and special characters are not allowed.'),
        email: Yup.string()
            .required("You'll need this when you log in and if you ever need to reset your password.")
            .email("Enter a valid email address."),
        password: Yup.string()
            .required('Enter a combination at least 6 numbers, letters, and punctuation marks (such as ! and &).')
            .min(6, "Password must be at least 6 characters.")
            .max(40, "Password can't be more than 40 characters"),
        conf_password: Yup.string()
            .required("Confirm your password.")
            .oneOf([Yup.ref("password")], "Password must match.")

    })

    // Form Login
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset } =
        useForm({
            resolver: yupResolver(loginValidation),
            mode: "onTouched"
        });

    // Form Register
    const {
        register: register2,
        handleSubmit: handleSubmit2,
        formState: { errors: errors2 },
        reset: reset2 } =
        useForm({
            resolver: yupResolver(registerValidation),
            mode: "onTouched"
        });


    const signUpHandler = async (data) => {
        const { name, email, password, conf_password } = data
        try {
            setLoading(true);
            const { data } = await axios.post("/api/auth/signup", {
                name,
                email,
                password,
            })
            setUser({ ...user, error: "", success: data.message })
            setLoading(false)
            setTimeout(async () => {
                let options = {
                    redirect: false,
                    email: email,
                    password: password
                }

                const res = await signIn("credentials", options)
                Router.push("/")
            }, 2000)
        } catch (error) {
            setLoading(false)
            setUser({ ...user, success: "", error: error.response.data.message })
        }
    };

    const signInHandler = async (data) => {
        const { login_email, login_password } = data
        setLoading(true)
        let options = {
            redirect: false,
            email: login_email,
            password: login_password
        }

        const res = await signIn("credentials", options)
        setUser({ ...user, success: "", error: "" })
        setLoading(false)

        if (res?.error) {
            setLoading(false)
            setUser({ ...user, login_error: res?.error })
        } else {
            return Router.push(callbackUrl || "/")
        }
    }

    return (
        <>
            {
                loading && <HashLoaderSpinner loading={loading} />
            }

            <div className='relative min-h-screen overflow-hidden grid place-items-center'>

                <div className='fixed z-[-1]'>
                    <Image
                        src={Background}
                        className='h-[35rem]'
                    />
                </div>

                <div className='flex justify-between items-center flex-col gap-8'>
                    <Link href='/'>
                        <Image
                            src={Logo}
                            className='h-[2.5rem]'
                        />
                    </Link>

                    <div className='bg-white shadow-xl border-[1px] border-background-grey rounded-xl p-8 w-[30%] mx-auto'>
                        <h3 className='text-lg text-center font-semibold'>Welcome back!</h3>
                        <p className='text-sm text-primary-grey text-center'>Get access to one of the best E-commerce services in the world</p>

                        <div className='grid grid-cols-2 bg-background-grey rounded-md text-base font-medium my-4'>
                            <button className={login ? 'toggle_active' : 'toggle_nonactive'} onClick={() => { setLogin(true); reset({ login_email, login_password, name, email, password, conf_password }) }}>Login</button>
                            <button className={login ? 'toggle_nonactive' : 'toggle_active'} onClick={() => { setLogin(false); reset({ login_email, login_password, name, email, password, conf_password }) }}>Register</button>
                        </div>

                        {/* Login */}
                        {
                            login && (
                                <form
                                    className='flex flex-col gap-2'
                                    method='post'
                                    action='/api/auth/signin/email'
                                    onSubmit={handleSubmit(signInHandler)}
                                >
                                    <input
                                        type="hidden"
                                        name='csrfToken'
                                        defaultValue={csrfToken}
                                    />

                                    <LoginInput
                                        register={register}
                                        errors={errors}
                                        icon='email'
                                        name='login_email'
                                        type='text'
                                        label='Email Address'
                                    />

                                    <LoginInput
                                        register={register}
                                        errors={errors}
                                        icon='password'
                                        name='login_password'
                                        type={showPasswordSignIn ? 'text' : 'password'}
                                        showPasswordSignIn={showPasswordSignIn}
                                        setShowPasswordSignIn={setShowPasswordSignIn}
                                        label='Password'
                                    />

                                    <div className='text-sm flex justify-end -mt-1 text-secondary-blue'>
                                        <Link href='/auth/forgot'>
                                            Forgot Password?
                                        </Link>
                                    </div>

                                    <button type='submit' className='btn_primary w-full h-[3.5rem] text-base'>Continue</button>
                                    {
                                        login_error &&
                                        <div className='text-error-color flex justify-start items-center gap-1'>
                                            <RiInformationLine className={`text-base ${login_error ? 'block' : 'hidden'} `} />
                                            <p className='text-sm'>{login_error}</p>
                                        </div>
                                    }
                                </form>
                            )
                        }


                        {/* register */}
                        {
                            !login && (
                                <form
                                    className='flex flex-col gap-2'
                                    onSubmit={handleSubmit2(signUpHandler)}
                                >
                                    <RegisterInput
                                        register2={register2}
                                        errors2={errors2}
                                        icon='user'
                                        name='name'
                                        type='text'
                                        label='Fullname'
                                    />

                                    <RegisterInput
                                        register2={register2}
                                        errors2={errors2}
                                        icon='email'
                                        name='email'
                                        type='text'
                                        label='Email Address'
                                    />

                                    <RegisterInput
                                        register2={register2}
                                        errors2={errors2}
                                        icon='password'
                                        name='password'
                                        type={showPasswordSignUp ? 'text' : 'password'}
                                        showPasswordSignUp={showPasswordSignUp}
                                        setShowPasswordSignUp={setShowPasswordSignUp}
                                        label='Password'
                                    />

                                    <RegisterInput
                                        register2={register2}
                                        errors2={errors2}
                                        icon='password'
                                        name='conf_password'
                                        type={showConfPasswordSignUp ? 'text' : 'password'}
                                        showConfPasswordSignUp={showConfPasswordSignUp}
                                        setShowConfPasswordSignUp={setShowConfPasswordSignUp}
                                        label='Confirm Password'
                                    />

                                    <button type='submit' className='btn_primary w-full h-[3.2rem] text-sm'>Continue</button>

                                    <div>
                                        {
                                            success &&
                                            <div className='text-success-color grid grid-cols-[.9rem_1fr] justify-start items-start gap-1'>
                                                <RiCheckboxCircleLine className={`text-base ${success ? 'block' : 'hidden'} `} />
                                                <p className='text-sm'>{success}</p>
                                            </div>
                                        }
                                    </div>

                                    <div>
                                        {
                                            error &&
                                            <div className='text-error-color grid grid-cols-[.9rem_1fr] justify-start items-start gap-1'>
                                                <RiInformationLine className={`text-base ${error ? 'block' : 'hidden'} `} />
                                                <p className='text-sm'>{error}</p>
                                            </div>
                                        }
                                    </div>
                                </form>
                            )
                        }


                        <div className='flex justify-center items-center gap-5 pt-5 pb-3'>
                            <div className='border-t-[1px] border-primary-grey w-full' />
                            <span className='w-[25rem] text-sm text-center text-primary-grey'>Or continue with</span>
                            <div className='border-t-[1px] border-primary-grey w-full' />
                        </div>

                        <div className='flex justify-center gap-9 items-center pt-2'>
                            {
                                providers.map((provider) => {
                                    if (provider.name == 'Credentials') {
                                        return
                                    }

                                    return (
                                        <div key={provider.name}>
                                            <button
                                                onClick={() => signIn(provider.id)}
                                                className='border-[1px] border-background-grey rounded-full p-2'
                                            >

                                                <img src={`/icons/${provider.name}.png`} alt="logo" className='h-7' />
                                                {/* Sign in with {provider.name} */}
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>

                {/* Sign In */}
                {/* <div className={styles.login__container}>

                    <div className={styles.login__form}>
                        <h1>Sign In</h1>
                        <p>Get access to one of the best E-commerce services in the world</p>

                        <Formik
                            enableReinitialize
                            initialValues={{
                                login_email,
                                login_password,
                            }}

                            validationSchema={loginValidation}
                            onSubmit={() => {
                                signInHandler()
                            }}
                        >
                            {
                                (form) => (
                                    <Form method='post' action='/api/auth/signin/email'>
                                        <input
                                            type="hidden"
                                            name='csrfToken'
                                            defaultValue={csrfToken}
                                        />
                                        <LoginInput
                                            icon='email'
                                            placeholder='Email Address'
                                            type='text'
                                            name='login_email'
                                            onChange={handleChange}
                                        />

                                        <LoginInput
                                            icon='password'
                                            placeholder='Enter your password'
                                            type={showPasswordSignIn ? 'text' : 'password'}
                                            name='login_password'
                                            onChange={handleChange}
                                            showPasswordSignIn={showPasswordSignIn}
                                            setShowPasswordSignIn={setShowPasswordSignIn}
                                        />
                                        <CircleIconBtn
                                            type='submit'
                                            text='Sign In'
                                        />

                                        {
                                            login_error &&
                                            <span className={styles.error}>{login_error}</span>
                                        }

                                        <div className={styles.forgot}>
                                            <Link href='/auth/forgot'>
                                                Forgot Password?
                                            </Link>
                                        </div>
                                    </Form>
                                )
                            }

                        </Formik>

                        <div className={styles.login__socials}>
                            <span className={styles.or}>Or Continue with</span>
                            <div className={styles.login__socials_wrap}>
                                {
                                    providers.map((provider) => {
                                        if (provider.name == 'Credentials') {
                                            return
                                        }

                                        return (
                                            <div key={provider.name}>
                                                <button
                                                    className={styles.social__btn}
                                                    onClick={() => signIn(provider.id)}

                                                >
                                                    <img src={`/icons/${provider.name}.png`} alt="" />
                                                    Sign in with {provider.name}
                                                </button>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div> */}


                {/* Sign Up */}
                {/* <div className={styles.login__container}>
                    <div className={styles.login__form}>
                        <h1>Sign Up</h1>
                        <p>Get access to one of the best E-commerce services in the world</p>

                        <Formik
                            enableReinitialize
                            initialValues={{
                                name,
                                email,
                                password,
                                conf_password
                            }}

                            validationSchema={registerValidation}
                            onSubmit={() => {
                                signUpHandler();
                            }}
                        >
                            {
                                (form) => (
                                    <Form>
                                        <LoginInput
                                            icon='user'
                                            name='name'
                                            placeholder='Fullname'
                                            type='text'
                                            onChange={handleChange}
                                        />

                                        <LoginInput
                                            icon='email'
                                            name='email'
                                            placeholder='Email Address'
                                            type='text'
                                            onChange={handleChange}
                                        />

                                        <LoginInput
                                            icon='password'
                                            name='password'
                                            placeholder='Enter your password'
                                            type={showPasswordSignUp ? 'text' : 'password'}
                                            onChange={handleChange}
                                            showPasswordSignUp={showPasswordSignUp}
                                            setShowPasswordSignUp={setShowPasswordSignUp}
                                        />

                                        <LoginInput
                                            icon='password'
                                            name='conf_password'
                                            placeholder='Retype your password'
                                            type={showConfPasswordSignUp ? 'text' : 'password'}
                                            onChange={handleChange}
                                            showConfPasswordSignUp={showConfPasswordSignUp}
                                            setShowConfPasswordSignUp={setShowConfPasswordSignUp}
                                        />

                                        <CircleIconBtn
                                            type='submit'
                                            text='Sign Up'
                                        />
                                    </Form>
                                )
                            }
                        </Formik>

                        <div>
                            {
                                success &&
                                <span className={styles.success}>{success}</span>
                            }
                        </div>

                        <div>
                            {
                                error &&
                                <span className={styles.error}>{error}</span>
                            }
                        </div>

                    </div>
                </div> */}
            </div>
        </>
    )
}


export async function getServerSideProps(context) {
    const { req, query } = context

    const session = await getSession({ req })
    const { callbackUrl } = query

    if (session) {
        return {
            redirect: {
                destination: callbackUrl,
            }
        }
    }
    const csrfToken = await getCsrfToken(context)
    const providers = Object.values(await getProviders())

    return {
        props: { providers, csrfToken, callbackUrl }
    }
}