import { useState } from 'react'
import { useRouter } from 'next/router'

const LoginForm: React.FC = () => {
    const router = useRouter()
    const [userName, setUserName ] = useState('')
    const [password, setPassword ] = useState('')
    const [errorStatus, setErrorStatus] = useState('') 

    const handleOnSubmit = async () => {
      if (userName === '' || password === '' ) {
        alert('Enter your username and password!')
        return
      }
      
      const data = {
        username: userName,
        password: password
      }

      // Send the data to the server in JSON format 
      const JSONdata = JSON.stringify(data)

      // API endpoint where we send form data
      const endpoint = '/api/form'

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

     
      if (result.data === "failed") {
        setErrorStatus('Your username or password is wrong!')
      } else {
        router.push('/home')
        setErrorStatus('')
      }

      setUserName('')
      setPassword('')
      
    }

 
    return (   
        <section className="h-screen gradient-form bg-gray-200 md:h-screen">
          <div className="container py-12 px-6 h-full">
            <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
              <div className="xl:w-10/12">
                <div className="block bg-white shadow-lg rounded-lg">
                  <div className="lg:flex lg:flex-wrap g-0">
                    <div className="lg:w-6/12 px-4 md:px-0">
                      <div className="md:p-12 md:mx-6">
                        <div className="text-center">
                          <img
                            className="mx-auto w-48"
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                            alt="logo"
                          />
                          <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">We are Teku team</h4>
                        </div>
                        <form onSubmit={(e) => {
                          e.preventDefault()
                          handleOnSubmit()
                        }}>
                          <p className="mb-4">Please login to your account</p>
                          <div className="mb-4">
                            <input
                              type="text"
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              id="exampleFormControlInput1"
                              placeholder="Username"
                              value={userName}
                              onChange={(e) => setUserName(e.target.value)}
                            />
                          </div>
                          <div className="mb-4">
                            <input
                              type="password"
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              id="exampleFormControlInput1"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>

                          <p className="mb-4 text-rose-700">{errorStatus}</p>

                          <div className="text-center pt-1 mb-12 pb-1">
                            <button
                              className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                              type="submit"
                              onSubmit={handleOnSubmit}
                              data-mdb-ripple="true"
                              data-mdb-ripple-color="light"
                              style={{
                                background: "linear-gradient(to right,#ee7724,#d8363a,#dd3675,#b44593)"}}
                            >
                              Log in
                            </button>
                            <a className="text-gray-500" href="#!">Forgot password?</a>
                          </div>
                          <div className="flex items-center justify-between pb-6">
                            <p className="mb-0 mr-2">Dont have an account?</p>
                            <button
                              type="button"
                              className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                              data-mdb-ripple="true"
                              data-mdb-ripple-color="light"
                              onClick={() => router.push('/signup')}
                            >
                              Sign up
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div
                      className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
                      style={{
                        background: "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)"
                      }}
                    >
                      <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                        <h4 className="text-xl font-semibold mb-6">We are more than just a company</h4>
                        <p className="text-sm">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                          consequat.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>

 )
}

export default LoginForm