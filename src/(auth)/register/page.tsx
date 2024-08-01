
"use client";
import { useAuthStore } from '@/store/Auth'
import React from 'react'

function RegisterPage() {

    const {createAccount,login } =useAuthStore();
    const [isLoading,setIsLoading] = React.useState(false)
    const [error,setError] = React.useState("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
       //collect data
       const formData =new FormData(e.currentTarget)
       const firstName =formData.get("firstname")
       const lastName =formData.get("lastname")
       const email = formData.get("email")
       const password = formData.get("password")

       //validate
       if(!firstName || !lastName || !email || !password){
        setError(() => "Please fill out all the fields")
        return 
       }
       //call the store
       setIsLoading(true)
       setError("")

       const response = await createAccount(
        `${firstName} ${lastName}`,
        email?.toString(),
        password?.toString()

       )
       if(response.error){
        setError(response.error?.message)
       }else{
        const loginResponse = await login(email.toString(),password.toString())
        if(loginResponse.error){
            setError(() => loginResponse.error!.message)
        }
       }
       setIsLoading(false)
    }
  return (
    <div>
      {error && (
        <p>{error}</p>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstname" required />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastname" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
