<template>
    <div>
       <img src="../assets/images/carousel_image_1.png" class="img"/>
        <div class="container mb-5">
            <h1 class="service-text text-center">Our Services</h1>
            <h6 class="service-desc text-center">Our special services for all of our dedicated patients</h6>
        </div>
        <div class="card-container">
            <div class="card" v-for="(card, index) of cards" :key="index">
                <div class="icon-wrapper">
                    <img :src="getImgUrl(card.img)"/>
                </div>
                <h6 class="card-title">{{card.title}}</h6>
                <p>{{card.desc}}</p>
            </div>
        </div>
        <div class="container">
            <div class="d-flex" style="margin-bottom:70px">
                <img src="../assets/images/doctor_image.png" class="doctor-img"/>
                <div class="time-card">
                    <h4 class="text-center">OPENING TIMES</h4>
                    <div class="border"></div>
                    <h4 class="service-time">
                        MONDAY TO FRIDAY<br>
                        8:30AM to 5:30 PM<br>
                        MONDAY TO FRIDAY<br>
                        9:00AM to 11:30 PM<br><br>
                        Closed on public holidays.
                    </h4><br>
                    <h6 class="service-contact">Our after hour service is provided by the Canberra After Hours Locum Medical Service
                        (CALMS):1300-987-654</h6>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .img{
        width: 100%;
        height: 590px;
    }
    .service-text{
        margin-top: 50px;
        margin-bottom: 20px;
    }
    .service-desc{
        font-weight: 400;
        color: rgb(106, 112, 122)
    }
    .service-time{
        line-height: 2;
    }
    .service-contact{
        line-height: 1.6;
    }

    .card-container{
        margin-top: 50px;
        padding: 0 50px 0 50px;
        flex-wrap: wrap;
        display: flex;
        flex-direction: row;
        text-align: left;
    }
    .card{
        flex: 1;
        border:1px solid rgb(80, 186, 137);
        border-radius: 6px;
        padding: 20px;
        margin-right: 30px;
        margin-bottom: 30px;
    }
    .card-title{
        padding-top: 10px;
        padding-bottom: 15px;
    }
    .icon-wrapper{
        width: 80px;
        height: 80px;
        border-radius: 40px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
    .icon-wrapper img{
        width: 100%;
        height: 100%;
    }
    .card-link{
        color: rgb(103, 167, 255)!important;
    }

    .view-service-but{
        background-color: red;
        color: white;
        padding: 12px 24px 12px 24px;
    }

    .doctor-img{
        width: 630px;
        height: 670px;
    }

    .time-border{
        width: 100%;
        height: 3px;
        background-color: white;
    }

    .time-card{
        color: white;
        padding: 30px;
        background-color:rgb(80, 186, 137);
        width: 600px;
    }
</style>
<script>

const desc = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s";
export default {
   data () {
       return {
           cards:[
               {title: 'Dentistry', img: "Dentist", desc: desc},
               {title: 'Dermatology', img: "derma", desc: desc},
               {title: 'Gynecology and obstetrics', img: "gynecology and obstetrics", desc: desc},
               {title: 'Neurology', img: "neurology", desc: desc},
               {title: 'Nutrition', img: "nutrition", desc: desc},
               {title: 'Orthopedics', img: "orthopedics", desc: desc}
           ]
       }
   },
   methods: {
        getImgUrl(name) {
            var images = require.context('../assets/images/', false, /\.png$/)
            return images('./' + name + ".png")
        }
   }
};
</script>