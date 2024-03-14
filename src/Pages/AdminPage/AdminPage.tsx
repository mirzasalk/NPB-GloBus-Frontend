import "./adminPage.css"
import React from "react";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios-config";
import toast from "react-hot-toast";

interface TicketIdDTO {
  Id: number;
}

interface IdDTO
{
  Id: number;
}
interface User {
  id: number;
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

interface Ticket {
  id: number;
  userId: number;
  line: string;
  start: string;
  destination: string;
  fromDate: Date | undefined;
  toDate: Date | undefined;
  ticketType: number;
  isApproved: boolean;
  Status: string;
}

interface Line {
  id: number;
  name: string;
  stations: string[];
  distance: string[];
}

const AdminPage: React.FC = () => {

  const [unapprovedTickets, setUnapprovedTickets] = useState<Ticket[]>();
  const [unapprovedUsers, setUnapprovedUsers] = useState<User[]>();
  const [inspectors, setInspectors] = useState<User[]>();
  const [lines, setLines] = useState<Line[]>();
 
 const [changeAdminView, setChangeAdminView] =
    useState<string>("Approve Tickets");

  
  //get unapproved tickets
 const getUnapprovedTickets = async () => {
      const jwtToken = localStorage.getItem("token");
  
      try {
        const response = await axiosInstance.get("Tickets/getUnapprovedTickets", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        if (response) {
          console.log(response.data, "ovo gledas");
          setUnapprovedTickets(response.data.reverse());
        }
      } catch (error) {
        console.log(error);
      }
    };

  //get unapproved users
 const getUnapprovedUsers = async () => {
  const jwtToken = localStorage.getItem("token");

  try {
    const response = await axiosInstance.get("Users/getUnapprovedUsers", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    if (response) {
      console.log(response.data);
      setUnapprovedUsers(response.data.reverse());
    }
  } catch (error) {
    console.log(error);
  }
};

//get all inspectors
const getAllInspectors = async () => {
  const jwtToken = localStorage.getItem("token");

  try {
    const response = await axiosInstance.get("Users/getAllInspectors", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    if (response) {
      console.log(response.data);
      setInspectors(response.data.reverse());
    }
  } catch (error) {
    console.log(error);
  }
};

//get all lines
const getAllLines = async () => {
  const jwtToken = localStorage.getItem("token");

  try {
    const response = await axiosInstance.get("Admins/getAllLines", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    if (response) {
      console.log(response.data);
      setLines(response.data.reverse());
    }
  } catch (error) {
    console.log(error);
  }
};

//approve ticket
const approveTicket = async (id: number) => {
  const jwtToken = localStorage.getItem("token");

  try {
    const response = await axiosInstance.put("Tickets/approveTicket",  { Id : id } as TicketIdDTO,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    if (response) {
      console.log(response.data);
      toast.success("Ticket is approved")
      getUnapprovedTickets();
     
    }
  } catch (error) {
    console.log(error);
  }
};
 
//reject ticket
const rejectTicket = async (id: number) => {
  const jwtToken = localStorage.getItem("token");

  try {
    const response = await axiosInstance.put("Tickets/rejectTicket",  { Id : id } as TicketIdDTO,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    if (response) {
      console.log(response.data);
      toast.success("Ticket is rejected")
      getUnapprovedTickets();
     
    }
  } catch (error) {
    console.log(error);
  }
};
const deleteUser = async (id: number) => {
  const jwtToken = localStorage.getItem("token");

  try {
    const response = await axiosInstance.delete("Users/delete", {
      data: { Id: id } as IdDTO,  // Promenjeno sa { Id: id } as IdDTO
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    
    if (response) {
      console.log(response.data);
      toast.success("User is deleted")
      getUnapprovedUsers();
      
    }
  } catch (error) {
    console.log(error);
  }
};
  useEffect(() => {
    getUnapprovedTickets();
    getUnapprovedUsers();
    getAllInspectors();
    getAllLines();
  }, []);

  return (
    <div id="adminPageMain">
      <div className="adminPageMainCenterDiv">
        <img src="globusLogo.png" alt="Globus" className="logoAdminPage" />

        <div className="buttonsLine">
          <div
            className="buttonOnLine"
            onClick={() => {
              setChangeAdminView("Approve Tickets");
            }}
          >
            Approve Tickets
          </div>
          <div
            className="buttonOnLine"
            onClick={() => {
              setChangeAdminView("Manage Users");
            }}
          >
            Manage Users
          </div>
          <div
            className="buttonOnLine"
            onClick={() => {
              setChangeAdminView("Manage Inspectors");
            }}
          >
            Manage Inspectors
          </div>
          <div
            className="buttonOnLine"
            onClick={() => {
              setChangeAdminView("Manage Lines");
            }}
          >
            Manage Lines
          </div>
        </div>
        {changeAdminView == "Approve Tickets" ? (
         <div className="ApproveTicketsDiv">
         <div className="ApproveTicketsDivScroll">
           {
         
           unapprovedTickets?.map((t) => {
             
             return (
              <div className="TicketDiv">
               <div className="TicketInfo">
                 <h3>{t.id}</h3>
                 <h3>{t.userId}</h3>
                 <h3>{t.ticketType}</h3>
                 <h3>{t.line}</h3>
                 <h3>{t.start}</h3>
                 <h3>{t.destination}</h3>
                 <h3>{t.fromDate?.toString()}</h3>
                 <h3>{t.toDate?.toString()}</h3>
               </div>
               <div className="TicketBtnsDiv">
                  <button className="approveBtn" onClick={()=>{approveTicket(t.id)}}>Approve</button>
                  <button className="RejectBtn" onClick={()=>{rejectTicket(t.id)}}>Reject</button>
               </div>
               </div>
             );
           })}
         </div>
       </div>
        ):changeAdminView == "Manage Users" ? (
          <div className="ApproveTicketsDiv">
            <div className="ApproveTicketsDivScroll">
            {unapprovedUsers?.map((u) => {
              return (
                <div className="TicketDiv">
                 <div className="TicketInfo">
                 
                 <h3>{u.id}</h3>
                 <h3>{u.firstName}</h3>
                 <h3>{u.lastName}</h3>
                 <h3>{u.email}</h3>
                 <h3>{u.address}</h3>
                 <h3>{u.city}</h3>
                 <h3>{u.dateOfBirth?.toString()}</h3>
                 <h3>{u.phoneNumber}</h3>
                 <h3>{u.gender}</h3>
                 <h3>{u.isApproved}</h3>
                 </div>
                 <div className="TicketBtnsDiv">
                    <button className="approveBtn" >Edit</button>
                    <button className="RejectBtn" onClick={()=>{deleteUser(u.id)}}>Delete</button>
                 </div>
                 </div>
               );
           })}
            </div>
          </div>
        ): changeAdminView == "Manage Lines" ? (
          <div className="ApproveTicketsDiv">
            <div className="ApproveTicketsDivScroll">
            {lines?.map((l) => {
             return (
               <div className="AdminField">
                 <h3>{l.id}</h3>
                 <h3>{l.name}</h3>
                
                 <div className="distanceDiv">
                 {
                  l.stations.map((d)=>{return  <h3>{d},</h3>})
                 }
                 </div>
                 <div className="distanceDiv">
                 {
                  l.distance.map((d)=>{return <h3>{ d  }, </h3> })
                 }
                 </div>
                
               </div>
             );
           })}
            </div>
          </div>
        ): (
          <div className="ApproveTicketsDiv">
            <div className="ApproveTicketsDivScroll">
            {inspectors?.map((i) => {
             return (
               <div className="AdminField">
                 <h3>{i.id}</h3>
                 <h3>{i.firstName}</h3>
                 <h3>{i.lastName}</h3>
                 <h3>{i.email}</h3>
                 <h3>{i.address}</h3>
                 <h3>{i.city}</h3>
                 <h3>{i.dateOfBirth?.toString()}</h3>
                 <h3>{i.phoneNumber}</h3>
                 <h3>{i.gender}</h3>
               </div>
             );
           })}
            </div>
          </div>
        )}        {/*
           
        )   */}
      </div>
    </div>
  );

  
};
export default AdminPage;