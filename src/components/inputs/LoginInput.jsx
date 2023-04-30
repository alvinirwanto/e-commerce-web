import { BiUser } from 'react-icons/bi'
import { RiMailLine, RiShieldKeyholeLine, RiEyeLine, RiEyeOffLine, RiInformationLine } from 'react-icons/ri'

export default function LoginInput({
    register,
    errors,
    icon,
    name,
    type,
    label,
    showPasswordSignIn, setShowPasswordSignIn,
}) {
    return (
        <div className='flex flex-col gap-1'>
            <div className={`group border-2 ${errors[name] ? 'border-error-color bg-error-soft' : 'border-background-grey'} rounded-md grid ${icon === 'password' ? 'grid-cols-[1fr_1fr_9fr_1fr]' : 'grid-cols-[1fr_1fr_10fr]'} place-items-center h-[3.5rem] px-4`}>
                {
                    <div className={errors[name] ? 'text-error-color' : 'text-black'}>
                        {
                            icon == 'user' ? (
                                <BiUser className='text-3xl' />
                            ) : icon == 'email' ? (
                                <RiMailLine className='text-3xl' />
                            ) : icon == 'password' ? (
                                < RiShieldKeyholeLine className='text-3xl' />
                            ) : (
                                ""
                            )
                        }
                    </div>
                }

                <div className={`h-9 border-l-2 ${errors[name] ? 'border-error-color' : 'border-background-grey'}`} />

                <div className="input__container">
                    <input {...register(name)} type={type} className="input__field bg-transparent text-lg font-medium" placeholder=" " />
                    <label className="input__placeholder text-primary-grey">{label}</label>
                </div>

                {
                    name === 'login_password' ?
                        <div className='flex justify-center items-center text-primary-grey text-2xl' onClick={() => setShowPasswordSignIn(!showPasswordSignIn)}>
                            {
                                showPasswordSignIn ?
                                    <RiEyeOffLine />
                                    :
                                    <RiEyeLine />
                            }
                        </div>
                        : ""
                }
            </div>

            <div className='text-error-color flex justify-start items-center gap-1'>
                <RiInformationLine className={`text-sm ${errors[name] ? 'block' : 'hidden'} `} />
                <p className='text-xs'>{errors[name]?.message}</p>
            </div>
        </div>
    )
}
