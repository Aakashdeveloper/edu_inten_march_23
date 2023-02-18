import React,{useEffect, useState} from 'react';
import axios from 'axios';
import './listing.css';
import {useParams} from 'react-router-dom';
import ListingDisplay from './listingDisplay';
import CuisineFilter from '../filters/cuisineFilter';
import CostFilter from '../filters/costFilter';;

const url = "http://3.17.216.66:4000/restaurant?mealtype_id="

const Listing =() => {
    let params = useParams()
    const [restaurantList,setrestaurantList] = useState()
    
    const setDataPerFilter = (data) => {
        setrestaurantList(data)
    }

    useEffect(() => {
        let mealId = params.mealId;
        sessionStorage.setItem('mealId',mealId)
        axios.get(`${url}${mealId}`)
        .then((res) => setrestaurantList(res.data))
    },[])

    return(
        <>
            <div className="row">
                <div id="mainListing">
                    <div id="filter">
                        <center><h2>Filters</h2></center>
                        <CuisineFilter mealId={params.mealId}
                        restPerCuisine={(data)=>{setDataPerFilter(data)}}/>
                        <CostFilter mealId={params.mealId}
                        restPerCost={(data)=>{setDataPerFilter(data)}}/>
                    </div>
                    <ListingDisplay listData={restaurantList}/>
                </div>
            </div>
        </>
    )
}

export default Listing;