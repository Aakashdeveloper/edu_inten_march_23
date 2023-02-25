import React,{useState} from 'react';

const MenuDisplay = (props) => {

    const [order,setOrder] = useState([])

    const placeOrder= (id) => {
        let output = [...order,id]
        console.log(">>>output",output)
        setOrder(output)
    }

    const removeOrder=(id) => {
        
        let output = order
        if(output.indexOf(id)>-1){
            output.splice(output.indexOf(id),1)
        }
        setOrder(output)
    }

    const renderCart = (orders) => {
        console.log(orders)
        if(orders){
            return orders.map((item,index) => {
                return(
                    <b key={index}>{item} &nbsp;</b>
                )
            })
        }
    }

    const addToOrder = () => {
        props.finalOrder(order)
    }

    const renderMenu = ({menudata}) => {
        if(menudata){
            return menudata.map((item) => {
                return(
                    <div key={item.menu_id}>
                        <div>
                            <div className="col-md-7">
                                <b>{item.menu_id}</b> &nbsp;
                                <img src={item.menu_image} alt={item.menu_name} style={{width:80,height:80}}/> &nbsp; {item.menu_name} - Rs.{item.menu_price}
                            </div>
                            <div className="col-md-4">
                                <button className="btn btn-success" onClick={() => {placeOrder(item.menu_id)}}>
                                    <span className="glyphicon glyphicon-plus"></span>
                                </button> &nbsp;
                                <button className="btn btn-danger" onClick={() => {removeOrder(item.menu_id)}}>
                                    <span className="glyphicon glyphicon-minus"></span>
                                </button> 
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }

    return(
        <div>
            <div className="col-md-12 bg-success">
                <h2>Item Added</h2>
                <h3>Item Number {renderCart(order)} Added</h3>
                <button onClick={() => {addToOrder()}} className="btn btn-success">Add To Cart</button>
            </div>
            <div className="col-md-12 bg-info">
                {renderMenu(props)}
            </div>
        </div>
    )

}

export default MenuDisplay;