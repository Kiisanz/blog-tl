import { Fragment } from "react"
import { NavLink } from "react-router-dom"

function Form({ children, ...props }) {
  return (
    <div>
      <form {...props}>
        <div className='flex flex-col justify-center w-full gap-4 px-6 sm:px-12 md:px-24'>{children}</div>
      </form>
    </div>
  )
}

function Header({ children }) {
  return (
    <div className='flex flex-col justify-center gap-3 py-4'>
      <h1 className='text-4xl font-bold text-gary-600'>{children}</h1>
      <p className='text-gray-500 text-md sm:text-lg'>Plase enter your detail bellow</p>
    </div>
  )
}

function FormInput({ children, option, className, ...props }) {
  return (
    <div className='relative flex items-center w-full pl-8 bg-white border-2 rounded-full'>
      <div className='absolute text-gray-400 bg-white top-2 left-3'>{children}</div>
      <div className='absolute text-gray-400 top-2 right-3'>{option}</div>
      <input
        {...props}
        className={"bg-white outline-none ring-gray-200 rounded-r-full py-2 px-4 text-md text-gray-600 invalid:border-pink-500 w-full"}
        required
      />
    </div>
  )
}

function Footer({ children }) {
  return (
    <Fragment>
      <Button>{children}</Button>
      <div className='flex justify-center px-2'>
        <span className='flex gap-2 text-gray-400'>
          {children === "Sign Up" ? "Already have an account?" : "Don't have any account?"}
          <NavLink className={"text-gray-600 hover:underline"} to={children === "Sign Up" ? "/signin" : "/signup"}>
            {children === "Sign Up" ? "Sign In" : "Sign Up"}
          </NavLink>
        </span>
      </div>
    </Fragment>
  )
}

function Button({ children }) {
  return (
    <div className='w-full'>
      <button className='w-full px-3 py-2 font-medium text-gray-900 rounded-full bg-primary' type='submit'>
        {children}
      </button>
    </div>
  )
}
Form.Header = Header
Form.Input = FormInput
Form.Footer = Footer

export default Form
