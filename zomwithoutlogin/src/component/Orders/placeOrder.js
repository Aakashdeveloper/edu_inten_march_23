import React,{useState} from 'react';
import './placeOrder.css';
import {useParams} from 'react-router-dom';

const PlaceOder = (props) =>  {
    const placeUrl = "http://localhost:7600/orders"
    let params = useParams()
    const [id] = useState(Math.floor(Math.random()*100000));
    const [hotel_name] = useState(params.restName)
    const [inputs,setInputs] = useState({})
    const [cost] = useState(712)


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
        .then(props.history.push('/viewBooking'))
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
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Total Price is Rs.{cost}</h2>
                        </div>
                    </div>
                    <button className="btn btn-success" onClick={placeOrder}>
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PlaceOder