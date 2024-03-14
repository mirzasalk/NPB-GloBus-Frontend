import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../api/axios-config";
import {
  UserData,
  Penalty,
} from '../Pages/inspectorPage/InspectorPage'; 

const QRCodeScanner = (props) => {

  const navigate = useNavigate();
  const [showWritePenaltyDiv, setShowWritePenaltyDiv] =
    useState<boolean>(false);

  const [penalty, setPenalty] = useState<Penalty>({
    inspectorId: 0,
    passengerID: 0,
    dateOfPenalty: undefined,
    price: 2000,
  });
  const [user, setUser] = useState<UserData>({
    id: 0,
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

  const checkTicketWithScanner = async (ticketId: number) => {
    const jwtToken = localStorage.getItem("token");
  
    try {
      console.log("Before API request");
  
      const response = await axiosInstance.post(
        `/Tickets/CheckTicketWithScanner?ticketId=${ticketId}`,
        { ticketId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
  

      console.log("After API request");
  
      if (response) {
        console.log("Response received");
  
        const datumZaUporedivanje = new Date(response.data.ticket.toDate);
        const danasnjiDatum = new Date();
  
        if (
          datumZaUporedivanje > danasnjiDatum &&
          response.data.ticket.isApproved === true
        ) {
          toast.success("Ticket is valid");
        } else {
          toast.error("Ticket is not valid");
          console.log(response.data.user.id, user.id);
  
          setPenalty({
            ...penalty,
            passengerID: response.data.user.id,
            inspectorId: user.id,
            dateOfPenalty: new Date(),
          });
  
          setShowWritePenaltyDiv(true);
        }
      }
    } catch (error) {
      console.error("Error in checkTicketWithScanner:", error);
    }
  };
  

  const [data, setData] = useState('No result');

  const handleScan = (result, error) => {
    if (result) {
      setData(result?.text);

      // Parse the URL to extract ticketId
      // const url = new URL(result.text);
      // const ticketId = parseInt(url.searchParams.get('ticketId'), 10); //if result has params
      
      const scannedTicketId = parseInt(result.text, 10);


      // Call checkTicketWithScanner with the extracted ticketId
      if (!isNaN(scannedTicketId)) {
        
        checkTicketWithScanner(scannedTicketId);
      } else {
        console.error('Invalid or missing ticketId in the QR code URL');
      }
    }

    // if (error) {
    //   console.info(error);
    // }
  };

  const WriteAPenalty = async () => {
    const jwtToken = localStorage.getItem("token");
    console.log(penalty, "befor Recording");
    try {
      const response = await axiosInstance.post(
        "/Users/WritePenalty",
        penalty,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (response.data) {
        toast.success("The penalty has been recorded");
        console.log(response.data, "after recording");
        getMyWrittenPenalties();
        setShowWritePenaltyDiv(false);
        navigate("/inspectorPage");
      }
    } catch (error) {
      console.log(error);
      navigate("/inspectorPage");
    }
  };
  

  const getMyWrittenPenalties = async () => {
    const jwtToken = localStorage.getItem("token");

    try {
      const response = await axiosInstance.get("Users/getMyWrittenPenalties", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (response) {
        setMyWrittenPenalties(response.data.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <QrReader
        onResult={handleScan}
        style={{ width: '100%' }}
        // scanDelay={100}
      />
      <p>{data}</p>
      {showWritePenaltyDiv ? (
        <div className="writePenaltyMainDiv">
          <div className="writePenaltyCenterDiv">
            <div
              className="xdiv"
              onClick={() => {
                setShowWritePenaltyDiv(false);
              }}
            >
              X
            </div>
            <h1>Ticket is not valid</h1>
            <h4>
              Passenger:
              <strong>
                {user.firstName} {user.lastName}
              </strong>
            </h4>
            <button onClick={WriteAPenalty}>Write a penalty</button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default QRCodeScanner;