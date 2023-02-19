import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Display from './displayOrder';

const placeOrder = "http://localhost:7600/orders";
const ViewOder = () => {
    const [orders,setOrders] = useState()

    useEffect(()=> {
        axios.get(placeOrder).then((res) => {setOrders(res.data)})
    },[])


    return(
        <>
         <Display orderData={orders}/>
        </>
     )
}

export default ViewOder