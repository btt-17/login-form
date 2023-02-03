import { useState } from 'react'

const SignupForm: React.FC = () => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorStatus, setErrorStatus] = useState('') 

    const handleOnSubmit = async () => {
        if (
            userName === '' ||
            email === '' ||
            password === '' ||
            confirmPassword === '' 
        ) {
            alert('Enter your information!')
            return 
        }

        if (password !== confirmPassword) {
            setErrorStatus('Password and Confirm Password do not match!')
            return
        }

        const data = {
            username: userName,
            password: password,
            email: email
        }

        // Send the data to the server in JSON format 
        const JSONdata = JSON.stringify(data)

        // API endpoint where we send form data
        const endpoint = '/api/signup'

        const options = {
            // the method is POST because we are sending data.
            method: 'POST',
            // tell the server we're sending JSON
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }

        // send the form data to our forms API on Vercel and get a response
        const response = await fetch(endpoint, options)
        const result = await response.json()

        console.log(response)

        if (result.data === "signed up") {
            setErrorStatus('Username and email are already used!')
            return
        }

        // Reset
        setUserName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setErrorStatus('')
    }

    return (
        <section className="bg-grey-lighter min-h-screen border-teal-400 flex flex-col">
            <div className="container max-w-sm mx-auto   flex-1 flex flex-col items-center justify-center px-2">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleOnSubmit()
                }}
                className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="username"
                        placeholder="User name" 
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />

                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input 
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}    
                    />
                    <input 
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <p className="mb-4 text-rose-700">{errorStatus}</p>

                    <button
                        type="submit"
                        className="w-full text-center py-3 border-slate-400 rounded bg-lime-500 text-white  focus:outline-none my-1"
                        onSubmit={handleOnSubmit}
                    >
                        Create Account
                    </button>

                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the 
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and 
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </form>

                <div className="text-grey-dark mt-6">
                    Already have an account? 
                    <a className="no-underline border-b border-blue text-blue" href="../login/">
                        Log in
                    </a>.
                </div>
            </div>
        </section>
    )
}

export default SignupForm