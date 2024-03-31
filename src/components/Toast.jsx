function Toast({ message, children, className = "text-green-800 bg-green-200" }) {
  return (
    <div className={`absolute top-0 flex gap-2 items-center px-6 py-4 mx-auto my-4 text-xs rounded-md right-3 ${className} `}>
      {children}
      <span>{message}</span>
    </div>
  )
}

export default Toast
