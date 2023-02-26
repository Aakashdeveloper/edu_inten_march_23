import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Display from './displayOrder';

const placeOrder = "http://localhost:7600/orders";
const ViewOder = (props) => {
    const [orders,setOrders] = useState()

    useEffect(()=> {
        console.log(props.location.search)
        if(props.location.search){
            let query = props.location.search.split('&');
            if(query){
                let data={
                    "status":query[0].split('=')[1],
                    "date":query[2].split('=')[1],
                    "bank_name":query[3].split('=')[1]
                }
                let id = query[1].split('=')[1].split('_')[1];
                fetch(`${placeOrder}/${id}`,{
                    method:'PATCH',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(data)
                })
            }

        }
        axios.get(placeOrder).then((res) => {setOrders(res.data)})
    },[])


    return(
        <>
         <Display orderData={orders}/>
        </>
     )
}

export default ViewOder