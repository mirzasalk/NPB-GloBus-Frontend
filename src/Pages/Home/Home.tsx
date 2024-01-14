import "./home.css";
import axiosInstance from "../../api/axios-config";
import React, { useEffect } from "react";
import { useState } from "react";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  password: string;
  city: string;
  address: string;
  phoneNumber: string;
  gender: string | null;
  isApproved: boolean;
  role: string;
  credit: number;
}

const Home: React.FC = () => {
  const [view, setView] = useState<boolean>(false);
  const [user, setUser] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    password: "",
    city: "",
    address: "",
    phoneNumber: "",
    gender: "",
    isApproved: false,
    role: "",
    credit: 0,
  });
  const getUserById = async () => {
    const jwtToken = localStorage.getItem("token");

    try {
      const response = await axiosInstance.get("Users/getUserById", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (response) {
        console.log(response.data);
        setUser(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserById();
  }, []);
  return (
    <div id="homeMain">
      {user.role}
      <div className="viewForPassenger">
        <img
          className="logoForPassengerView"
          src="./globusLogo.png"
          alt="logo"
        />
        <div className="buttonsDiv">
          <div className="DivForchagePassengersView">By Ticket</div>
          <div className="DivForchagePassengersView">My Ticket</div>
        </div>
        <div className="mainForPassengerView">
          <div className="byTicketInputDiv">
             
          </div>
          <div className="MyTicketDiv">

          </div>
        
        </div>
      </div>
    </div>
  );
};

export default Home;
