import React, { useEffect, useState } from 'react'
import Addeduser from '../components/Addeduser'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../main'

const Home = () => {
  const [userdata, setUserdata] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  //    let result =await axios.post(`${serverUrl}/api/auth/login`,{
  ////  email,password
        //        },{withCredentials:true})

 const getdata = async () => {
  try {   
    setLoading(true)
    const response = await axios.get(`${serverUrl}/users`,
     
      {withCredentials:true}
    )
    
    // Check if response.data exists and is an array
    if (Array.isArray(response.data)) {
      setUserdata(response.data)
    } 
    // Or if response.data has a data property that's an array
    else if (Array.isArray(response.data?.data)) {
      setUserdata(response.data.data)
    }
    // Or if response.data has users array
    else if (Array.isArray(response.data?.users)) {
      setUserdata(response.data.users)
    }
    else {
      setUserdata([])
      console.error("Unexpected response format:", response.data)
    }
  } catch (error) {
    setError(error.response?.data?.message || "Error while fetching user details")
    console.error("Fetch error:", error)
  } finally {
    setLoading(false)
  }
}

  useEffect(() => {
    getdata()
  }, [])

  const filteredUsers = userdata.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white'>
      <div className='container mx-auto px-4 py-10'>
        <div className='text-center mb-10'>
          <h1 className='text-4xl font-bold mb-2'>User Management</h1>
          <p className='text-gray-400 max-w-2xl mx-auto'>
            Welcome to the user management dashboard. View, search, and manage all registered users.
          </p>
        </div>

        <div className='flex flex-col md:flex-row justify-between items-center mb-8 gap-4'>
          <div className='relative w-full md:w-96'>
            <input
              type="text"
              placeholder="Search users..."
              className='w-full p-3 pl-10 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <Link to="/addpeople">
            <button className='bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 whitespace-nowrap w-full justify-center md:w-auto'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Add New User
            </button>
          </Link>
        </div>

        <div className='space-y-4 '>



          {loading ? (
            <div className='flex justify-center  items-center py-20'>
              <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
            </div>
          ) : error ? (
            <div className='bg-red-900/30 border border-red-700 rounded-lg p-4 text-center'>
              <p className="text-red-300">{error}</p>
              <button 
                onClick={getdata}
                className='mt-3 bg-red-700 hover:bg-red-600 px-4 py-2 rounded-md text-sm transition-colors'
              >
                Retry
              </button>
            </div>


           
          ) :    filteredUsers.length > 0 ? ( 
            filteredUsers.map((user) => <Addeduser key={user._id} user={user} />)
           )   : (


            <div className='bg-gray-800/50 rounded-xl p-8 text-center'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>


              <h3 className='text-xl font-medium text-gray-300 mb-2'>No users found</h3>
              <p className='text-gray-500 mb-4'>{searchTerm ? 'Try a different search term' : 'Add your first user to get started'}</p>
              <Link to="/addpeople">
                <button className='bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md font-medium transition-colors'>
                  Add New User
                </button>

              </Link>
            </div>




          )}
        </div>
      </div>
    </div>
  )
}

export default Home