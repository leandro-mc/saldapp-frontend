import { useEffect } from 'react'
import httpClient from '../config/httpClient.js'

function GroupPage() {

    useEffect(() => {
        // Example API call to fetch group data
        httpClient.get('/groups/1')
            .then(data => console.log('Group data:', data))
            .catch(error => console.error('Error fetching group data:', error))
    }, [])

  return (    
      <h1>Group Page</h1>   
  )
}

export default GroupPage
