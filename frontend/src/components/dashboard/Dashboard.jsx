import React, {useEffect, useState} from 'react'
import axios from "axios"
import axiosInstance from '../../axiosInstance'


const Dashboard = () => {

    const accessToken = localStorage.getItem("accessToken")

    useEffect(() => {

      const fecthData = async () => {

        try {
            const response = await axiosInstance.get("/protected/")

            console.log("Success: ", response.data);
            
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
      }

      fecthData()
    
     
    }, [])
    
  return (
    <>
        <div className="text-light">Dashboard</div>
    </>
  )
}

export default Dashboard