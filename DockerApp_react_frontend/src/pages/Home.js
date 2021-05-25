import React from "react";

import '../assets/css/home.css';
import CarouselImage1 from "../assets/images/carousel_image_1.png";
import DoctorImage from "../assets/images/doctor_image.png";
import DentistImage from "../assets/images/Dentist.png";
import DermaImage from "../assets/images/derma.png";
import GyneImage from "../assets/images/gynecology and obstetrics.png";
import NeurologyImage from "../assets/images/neurology.png";
import NutritionImage from "../assets/images/nutrition.png";
import OrthopedicsImage from "../assets/images/orthopedics.png";

const desc = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s";
const cards = [
  {title: 'Dentistry', img: DentistImage, desc: desc},
  {title: 'Dermatology', img: DermaImage, desc: desc},
  {title: 'Gynecology and obstetrics', img: GyneImage, desc: desc},
  {title: 'Neurology', img: NeurologyImage, desc: desc},
  {title: 'Nutrition', img: NutritionImage, desc: desc},
  {title: 'Orthopedics', img: OrthopedicsImage, desc: desc}
];
function Home(props) {
  return (
    <div>
       <img src={CarouselImage1} className="img"/>
        <div className="container mb-5">
            <h1 className="service-text text-center">Our Services</h1>
            <h6 className="service-desc text-center">Our special services for all of our dedicated patients</h6>
        </div>
        <div className="card-container">
          {
            cards.map((card, index) => (
              <div className="card" key={index}>
                <div className="icon-wrapper">
                  <img style={{width: '100%', height: '100%'}} src={card.img}/>
                </div>
                <h6 className="card-title">{card.title}</h6>
                <p>{card.desc}</p>
              </div>   
            ))
          }
        </div>
        <div className="container">
          <div className="d-flex mb-3">
              <img src={DoctorImage} className="doctor-img"/>
              <div className="time-card">
                  <h4 className="text-center">OPENING TIMES</h4>
                  <div className="border"></div>
                  <h4 className="service-time">
                      MONDAY TO FRIDAY<br/>
                      8:30AM to 5:30 PM<br/>
                      MONDAY TO FRIDAY<br/>
                      9:00AM to 11:30 PM<br/><br/>
                      Closed on public holidays.
                  </h4><br/>
                  <h6 className="service-contact">Our after hour service is provided by the Canberra After Hours Locum Medical Service
                      (CALMS):1300-987-654</h6>
              </div>
          </div>
        </div>
    </div>
  );
}

export default Home;