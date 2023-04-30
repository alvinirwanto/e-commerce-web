import { BiUser } from 'react-icons/bi'
import { RiMailLine } from 'react-icons/ri'
import { RiShieldKeyholeLine } from 'react-icons/ri'
import { RiEyeLine } from 'react-icons/ri'
import { RiEyeOffLine } from 'react-icons/ri'


import styles from './loginInput.module.scss'
import { ErrorMessage, useField } from 'formik'

export default function LoginInputOld({
    icon,
    placeholder,
    showPasswordSignIn,
    setShowPasswordSignIn,
    showPasswordSignUp,
    setShowPasswordSignUp,
    showConfPasswordSignUp,
    setShowConfPasswordSignUp,
    ...props }) {

    // This is from Formik
    const [field, meta] = useField(props) //meta for track few thing, e.g click, touch

    return (

        <div>
            <div className={`${styles.input} 
        ${meta.touched && meta.error ? styles.error : ""}`}>
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

                <input
                    type={field.type}
                    name={field.name}
                    placeholder={placeholder}
                    {...field}
                    {...props}
                />

                {
                    field.name === 'login_password' ?
                        <div className={styles.input__pass} onClick={() => setShowPasswordSignIn(!showPasswordSignIn)}>
                            {
                                showPasswordSignIn ?
                                    <RiEyeOffLine />
                                    :
                                    <RiEyeLine />
                            }
                        </div>
                        : ""
                }

                {
                    field.name === 'password' ?
                        <div className={styles.input__pass} onClick={() => setShowPasswordSignUp(!showPasswordSignUp)}>
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
                    field.name === 'conf_password' ?
                        <div className={styles.input__pass} onClick={() => setShowConfPasswordSignUp(!showConfPasswordSignUp)}>
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

            {
                meta.touched && meta.error &&
                <div className={styles.error__popup}>
                    <span>
                        <ErrorMessage name={field.name} />
                    </span>
                </div>
            }
        </div>
    )
}
