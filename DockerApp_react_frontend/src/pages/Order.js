import React, {useState, useEffect} from "react";
import bookService from "../service/book";
import { ToastContainer } from "react-toastr";
import "../assets/css/order.css";
import "toastr/build/toastr.css";
import "animate.css/animate.css";
import { useAuth } from "../context/auth";

let container;
function Order (props) {
  const { authTokens } = useAuth();
  const [appointmentList, setAppointmentList] = useState([]);
  useEffect(() => {
    bookService.getAppointmentList(authTokens).then((res) => {
      setAppointmentList(res);
    }).catch(error => {
      container.error(error, 'Error', {
        showAnimation: "animated slideInRight",
        hideAnimation: "animated slideOutRight",
        closeButton: true
      })
    });
  }, []);
  return (
    <>
    <ToastContainer
        className="toast-top-right"
        ref={ref => {
          container = ref;
        }}
      />
      <div class="wrapper">
          <div class="container">
              <h2 class="title">Appointment</h2>
              <div class="custom-card">
                  <table class="table">
                      <thead>
                      <tr>
                          <th>Patient Name</th>
                          <th>Booked Time</th>
                      </tr>
                      </thead>
                      <tbody>
                        {
                          appointmentList.map((item, index) => <tr key={index}>
                            <td>{item.patientName}</td>
                            <td>{item.bookTime}</td>
                          </tr>)
                        }
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
    </>
  );
}

export default Order;