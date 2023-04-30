import { BiUser } from 'react-icons/bi'
import { RiMailLine, RiShieldKeyholeLine, RiEyeLine, RiEyeOffLine, RiInformationLine } from 'react-icons/ri'

export default function RegisterInput({
    register2,
    errors2,
    icon,
    name,
    type,
    label,
    showPasswordSignUp, setShowPasswordSignUp,
    showConfPasswordSignUp, setShowConfPasswordSignUp,
}) {
    return (
        <div className='flex flex-col gap-1'>
            <div className={`group border-2 ${errors2[name] ? 'border-error-color bg-error-soft' : 'border-background-grey'} rounded-md grid ${icon === 'password' ? 'grid-cols-[1fr_1fr_9fr_1fr]' : 'grid-cols-[1fr_1fr_10fr]'} place-items-center h-[3.3rem] px-4`}>
                {
                    <div className={`text-2xl ${errors2[name] ? 'text-error-color' : 'text-black'}`}>
                        {
                            icon == 'user' ? (
                                <BiUser />
                            ) : icon == 'email' ? (
                                <RiMailLine />
                            ) : icon == 'password' ? (
                                < RiShieldKeyholeLine />
                            ) : (
                                ""
                            )
                        }
                    </div>
                }

                <div className={`h-7 border-l-2 ${errors2[name] ? 'border-error-color' : 'border-background-grey'}`} />

                <div className="input__container">
                    <input {...register2(name)} type={type} className="input__field bg-transparent text-base font-medium" placeholder=" " />
                    <label className="input__placeholder text-primary-grey text-sm">{label}</label>
                </div>

                {
                    name === 'password' ?
                        <div className='flex justify-center items-center text-primary-grey text-2xl' onClick={() => setShowPasswordSignUp(!showPasswordSignUp)}>
                            {
                                showPasswordSignUp ?
                                    <RiEyeOffLine />
                                    :
                                    <RiEyeLine />
                            }
                        </div>
                        : ""
                }

                {
                    name === 'conf_password' ?
                        <div className='flex justify-center items-center text-primary-grey text-2xl' onClick={() => setShowConfPasswordSignUp(!showConfPasswordSignUp)}>
                            {
                                showConfPasswordSignUp ?
                                    <RiEyeOffLine />
                                    :
                                    <RiEyeLine />
                            }
                        </div>
                        : ""
                }
            </div>

            <div className='text-error-color grid grid-cols-[.9rem_1fr] justify-start items-start gap-1'>
                <RiInformationLine className={`text-sm ${errors2[name] ? 'block' : 'hidden'} `} />
                <p className='text-xs'>{errors2[name]?.message}</p>
            </div>
        </div>
    )
}
