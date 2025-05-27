import React from 'react'
import defaultImage from "../assets/react.svg"

const Addeduser = ({ user }) => {

  const roleColors = {
    admin: 'bg-purple-600',
    user: 'bg-blue-600',
    manager: 'bg-amber-600',
    default: 'bg-green-600'
  };

  const roleColor = roleColors[user.role?.toLowerCase()] || roleColors.default;

  return (
    <div className='bg-gray-800 p-4 rounded-xl shadow-lg flex flex-col md:flex-row justify-between items-center text-white my-3 transition-all hover:shadow-xl hover:bg-gray-750'>
      {/* user detail */}
      <div className='flex items-center gap-4 w-full md:w-auto mb-4 md:mb-0'>
        <div className='relative'>
          <img 
            src={user.image || defaultImage} 
            alt="User Avatar" 
            className='w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-gray-500 object-cover'
          />
          <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-800'></div>
        </div>
        <div className='text-left'>
          <p className='text-lg font-semibold text-white'>{user.name}</p>
          <p className='text-sm text-gray-300 truncate max-w-[180px] md:max-w-none'>{user.email}</p>
        </div>
      </div>

      {/* occupation and department */}
      <div className='text-center mb-4 md:mb-0 w-full md:w-auto'>
        <p className='font-medium text-white'>{user.occupation || 'Not specified'}</p>
        <p className='text-gray-400 text-sm'>{user.department || 'General'}</p>
      </div>

      {/* role */}
      <div className='text-center w-full md:w-auto'>
        <p className={`${roleColor} text-white px-4 py-1 rounded-full text-sm font-medium shadow-md`}>
          {user.role || 'user'}
        </p>
      </div>
    </div>
  )
}

export default Addeduser