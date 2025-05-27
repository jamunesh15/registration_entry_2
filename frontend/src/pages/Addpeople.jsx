import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../main'

const Addpeople = ({ refreshUserList }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    occupation: '',
    department: '',
    role: ''
  })

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(`${serverUrl}/createuser`, formData, { withCredentials: true }) // ✅ FIXED
      setFormData({ name: '', email: '', occupation: '', department: '', role: '' })
      if (refreshUserList) refreshUserList()
      navigate('/')
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className='max-w-md mx-auto bg-gray-800 text-white p-6 rounded-xl shadow-xl'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold text-white'>Add New User</h2>
        <Link to="/">
          <button className='bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-1'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
        </Link>
      </div>

      <form className='space-y-5' onSubmit={handleSubmit}>
        {['name', 'email', 'occupation', 'department', 'role'].map((field) => (
          <div key={field}>
            <label className='block text-gray-300 mb-2 text-sm font-medium'>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className='w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
              required
              placeholder={`Enter ${field}`}
            />
          </div>
        ))}

        <button 
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
            loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          } flex justify-center items-center gap-2`}
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Add User'
          )}
        </button>
      </form>
    </div>
  )
}

export default Addpeople
