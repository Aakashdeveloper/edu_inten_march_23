import React,{useState,useEffect} from 'react';
import './placeOrder.css';
import {useParams} from 'react-router-dom';

const PlaceOder = (props) =>  {
    const placeUrl = "http://localhost:7600/orders";
    const url = "http://3.17.216.66:4000/menuItem";
    let params = useParams()
    const [id] = useState(Math.floor(Math.random()*100000));
    const [hotel_name] = useState(params.restName)
    const [inputs,setInputs] = useState({})
    const [cost,setCost] = useState()
    const [menu,setMenu] = useState()

    useEffect(()=>{
        let menuItem = sessionStorage.getItem('menu');
        let orderId = [];
        console.log(orderId)
        menuItem.split(',').map((item) => {
            orderId.push(parseInt(item))
            return 'ok'
        })
        fetch(url,{
            method: 'POST',
            headers:{
                'accept':'application/json',
                'content-type':'application/json'
            },
           
            body:JSON.stringify(orderId)
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(">>>",data)
            let totalPrice = 0;
            data.map((item) => {
                totalPrice = totalPrice+Number(item.menu_price)
                return 'ok'
            })
            setCost(totalPrice)
            setMenu(data)
        })
    },[])

    const renderItem=(data) => {
        if(data){
            return data.map((item) => {
                return(
                    <div className="orderItem" key={item.menu_id}>
                        <img src={item.menu_image} alt={item.menu_name}/>
                        <h3>{item.menu_name}</h3>
                        <h4>Rs. {item.menu_price}</h4>
                    </div>
                )
            })
        }
    }

    const placeOrder = () => {
       
        let obj = {id,hotel_name,inputs,cost}
        fetch(placeUrl,{
            method:'POST',
            headers:{
                'accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(obj)
        })
        .then(console.log('order added'))
        // .then(props.history.push('/viewBooking'))
    }

    const handleChange = e => setInputs(prevState => (
        { 
            ...prevState, [e.target.name]: e.target.value 
        } 
    ));


   
    return(
        <div className="container">
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h3>Your Order From Restaurants {hotel_name} </h3>
                </div>
                <div className="panel-body">
                    <form action="http://localhost:4100/paynow" method="POST">
                        <div className="row">
                            <input type="hidden" name="cost" value={cost}/>
                            <input type="hidden" name="id" value={id}/>
                            <input type="hidden" name="hotel_name" value={hotel_name}/>
                            <div className="form-group col-md-6">
                                <label>Name</label>
                                <input className="form-control" name='name'
                                value={inputs.name || 'Ankita'} onChange={handleChange}/>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Email</label>
                                <input className="form-control" name='email'
                                value={inputs.email || 'ankita@gmail.com'} onChange={handleChange}/>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Phone</label>
                                <input className="form-control" name='phone'
                                value={inputs.phone || '9876543211'} onChange={handleChange}/>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Address</label>
                                <input className="form-control" name='address'
                                value={inputs.address || 'Hno 211 Nagpur'} onChange={handleChange}/>
                            </div>
                        </div>
                        {renderItem(menu)}
                        <div className="row">
                            <div className="col-md-12">
                                <h2>Total Price is Rs.{cost}</h2>
                            </div>
                        </div>
                        <button className="btn btn-success" onClick={placeOrder}
                        type="submit">
                            Checkout
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PlaceOder