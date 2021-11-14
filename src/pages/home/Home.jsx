import React,{useState,useEffect, useMemo} from 'react'
import Chart from '../../components/chart/Chart'
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import "./home.css";
//import { userData } from "../../dummyData";
import WidgetSm from '../../components/widgetSm/WidgetSm';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import axios from "axios";

const Home = () => {
    const MONTHS=useMemo(()=>[
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],[]);
      const [userStats,setUserStats]=useState([]);
    
      useEffect(()=>{
        const getStats=async ()=>{
            try{
                const res=await axios.get("/users/stats",{
                    headers:{
                        token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODA5NmQyMmNkMTBmMDMwMTk5NDZiMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNjg1OTYyMiwiZXhwIjoxNjM3MjkxNjIyfQ.UP1495eFJG8qm21a_JO6aSfrlxnSUdm0XNvlQ0CJXxU"
                    }
                })
                const statsList = res.data.sort(function (a, b) {
                    return a._id - b._id;
                  });
                  statsList.map((item) =>
                    setUserStats((prev) => [
                      ...prev,
                      { name: MONTHS[item._id - 1], "New User": item.total },
                    ])
                  );
            }catch(err){
                console.log(err)
            }
            
        }
        getStats()
      },[MONTHS])
      //console.log(userStats)
    return (
        <div className="home">
            <FeaturedInfo/>
            <Chart data={userStats} title="User Analytics" grid dataKey="New User"/>
            <div className="homeWidgets">
                <WidgetSm/>
                <WidgetLg/>
            </div>
        </div>
    )
}

export default Home
