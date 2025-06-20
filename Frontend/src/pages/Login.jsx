import React, { useEffect, useRef } from 'react'
import { useContext } from 'react';
import { Toaster, toast } from 'sonner'
import Navbar from '../components/Navbar'
import brandLogo from '../assets/your-board-logo.png'
import { userAuthContext } from '../../store/UserAuthStore';
import { NavLink, useNavigate } from 'react-router-dom';


const Login = () => {
    document.title = 'Login'

    const navigate = useNavigate()
    const emailInputRef = useRef(null)
    const passwordInputRef = useRef(null)

    const { authenticated, loginViaGoogle, loginViaEmail } = useContext(userAuthContext)

    const socialLogin = [
        {
            name: 'google',
            content: 'Continue with Google',
            icon: <svg className='min-w-7 w-[10%]' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg>,
            handleFunction: loginViaGoogle,
        },
    ]

    useEffect(() => {
        if (authenticated) {
            navigate('/')
        }
    }, [authenticated])

    const handleLoginBtnClick = (event) => {
        event.preventDefault()
        loginViaEmail(emailInputRef.current.value, passwordInputRef.current.value, (res, badRes, error) => {
            if (res) {
                toast.success(res.message)
                setTimeout(() => {
                    navigate(res.redirect)
                }, 1000);
            } else if (badRes) {
                toast.info(badRes.message)
            } else if (error) {
                toast.error(error.message)
            }
        })
    }

    return (
        <section className='min-h-screen text-white overflow-hidden relative bg-background flex flex-col '>
            <Navbar />

            <div className='min-w-[350px] min-h-[400px] h-3/5 mx-auto my-auto bg-glass rounded-lg border-glassBorder flex flex-col items-center'>
                {/* branding */}
                <div className='mb-7 text-center'>
                    <img src={brandLogo} alt="" className='max-w-20 w-2/4 mx-auto' />
                    <h3 className='text-xl'>Login to {getComputedStyle(root).getPropertyValue('--brand-name')}</h3>
                </div>
                {/* social buttons */}
                <div className='w-[60%] '>
                    {socialLogin.map((item) => (
                        <button
                            className='px-2.5 mb-2.5 w-full h-14 flex justify-center items-center gap-2 text-sm border-2 border-glassBorder rounded-lg cursor-pointer'
                            key={item.name}
                            onClick={item.handleFunction}
                        >
                            {item.icon}

                            {item.content}
                        </button>
                    ))}
                </div>
                {/* credentials input */}
                <form className='w-[60%] flex flex-col justify-center items-center' onSubmit={handleLoginBtnClick}>
                    <input ref={emailInputRef} required minLength={10} type="email" name="email" id="emailInput" placeholder='Email' className='px-2.5 mt-1.5 w-full h-10 rounded-lg border-2 border-glassBorder' />

                    <input ref={passwordInputRef} required minLength={5} type="password" name="password" id="passwordInput" placeholder='Password' className='px-2.5 mt-1.5 w-full h-10 rounded-lg border-2 border-glassBorder' />

                    {/* <NavLink>Forget password</NavLink> */}

                    <button type='submit' className='mt-3.5 px-2.5 py-1.5 bg-accentLight rounded-lg text-center cursor-pointer'>Login</button>
                </form>

                <p className='mt-5 text-[12px]'>Don't have account? <NavLink to={'/auth/signup'} className={'text-blue-400 cursor-pointer'}>Go to sign-up</NavLink></p>

            </div>
            <Toaster richColors theme='dark' />
        </section>
    )
}

export default Login
