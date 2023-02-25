import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './details.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import MenuDetails from './menuDetails';

const url = "http://3.17.216.66:4000";

const Details=(props) =>{

    let [details,setDetails] = useState([])
    let params = useParams()
    let [mealId] = useState(sessionStorage.getItem('mealId')?sessionStorage.getItem('mealId'):1)
    let [menu,setMenu] = useState()
    let [userInput,setuserInput] = useState([0])

    useEffect(()=>{
        let restId = params.restId;
        axios.get(`${url}/details/${restId}`)
        .then((res) => setDetails(res.data[0]))
        axios.get(`${url}/menu/${restId}`)
        .then((res) => setMenu(res.data))
    },[])



    const proceed = ()  => {
        sessionStorage.setItem('menu',userInput);
        props.history.push(`/placeOrder/${details.restaurant_name}`)
    }

    const addToCart = (data) => {
        console.log(">>>>",data)
        document.getElementById('alertbox').style.display="block"
        setuserInput(data)
    }

    const renderData = (data) => {
        if(data){
            return(
                <>
                    <div className="tileImage">
                        <div className="imageClass">
                            <img src={data.restaurant_thumb} alt=""/>
                        </div>
                    </div>
                    <div className="tileContent">
                        <div className="content">
                            <h1>{data.restaurant_name}</h1>
                            <span id="cfeedback">231 Customers Rating Average</span>
                                <h3>Old Price <del>Rs. 450</del></h3>
                                <h3>Offer Price Rs. {data.cost}</h3>
                                <h3>Best Taste of Fresh Chai with Samosa At your Door or DineIn</h3>
                                <div>
                                    <div className="icons">
                                        <img src="https://i.ibb.co/wJvrhYg/veg.png"/>
                                    </div>
                                    <div className="icons">
                                        <img src="https://i.ibb.co/mD3jpgc/sentizied.png"/>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <Tabs>
                        <TabList>
                            <Tab>About</Tab>
                            <Tab>Contact</Tab>
                        </TabList>

                        <TabPanel>
                            <h2>{data.restaurant_name}</h2>
                            <p>{data.restaurant_name}  is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            </p>
                        </TabPanel>
                        <TabPanel>
                            <h2>{data.address}</h2>
                            <h3>Contact: {data.contact_number}</h3>
                        </TabPanel>
                    </Tabs>

                    <div className="col-md-12">
                       
                        
                     <center><h2>Menu</h2></center>
                     <div className="col-md-6 col-md-offset-3">
                            <div class="alert alert-info alert-dismissible fade in" style={{display:'none'}} id="alertbox">
                                <a href="#" class="close" data-dismiss="alert" aria-label="close" 
                                >&times;</a>
                                <strong>Success!</strong> Item Added to Cart SuccessFully. Please Click on Procced
                            </div>
                    </div>
                     <MenuDetails menudata={menu}
                    finalOrder={(data) => {addToCart(data)}}/>
                    </div>
               </>
            )
        }
    }

    return(
        <>
            <div className="main">
                {renderData(details)}
                <Link to={`/listing/${mealId}`} className="btn btn-danger">
                    Back
                </Link>&nbsp;
                <button className="btn btn-success" onClick={proceed}>Proceed</button>
            </div> 
        </>
    )
   
}

export default Details;