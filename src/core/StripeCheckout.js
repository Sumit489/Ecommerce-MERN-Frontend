import React,{useState,useEffect} from 'react'
import { isAuthenticated } from '../auth/helper'
import { cartEmpty, loadCart } from './helper/carthelper'
import { Link } from 'react-router-dom'
import StripeCheckoutButton from 'react-stripe-checkout'
import { API } from '../backend'
import createOrder from './helper/orderhelper'

const StripeCheckout= ({products,setReload=f=>f,reload=undefined}) =>{
    const [data, setData] = useState({
        loading:false,
        success:false,
        error:"",
        address:""
    })



     const token = isAuthenticated() && isAuthenticated().token
     const userId = isAuthenticated() && isAuthenticated().user._id

     const getFinalAmount =()=>{
         let amount =0
         products.map(p=>{
             amount =amount +p.price
         })
         return amount
     }
     const makePayment = (token)=>{
        const body={
            token,products
        }
        const headers={
            "Content-Type":"application/json"
        }
        return fetch(`${API}/stripepayment`,{
            method:"POST",
            headers,
            body:JSON.stringify(body)
        }).then(response=>{
            console.log(response)
            const {status} = response
            console.log("STATUS",status)
            
        }).catch(error =>console.log(error))
     }
     const showStripeButton=()=>{
         return isAuthenticated() ?(
             <StripeCheckoutButton
             stripeKey="pk_test_2LkxcRApIbjpt9ANt37eE1H400j39NGvC7"
             token={makePayment}
             amount={getFinalAmount()*100}
             name="Buy Tshirt"
             shippingAddress
             billingAddress
             
             >
             <button className="btn btn-success">Pay with Stripe</button>
             </StripeCheckoutButton>
         ) :(
             <Link to="/signin">
                 <button className="btn btn-warning">signin</button>
             </Link>
         )
     }

    

    return (
        <div>
            <h3 className="text-white">StripeCheckout {getFinalAmount()} 
    {showStripeButton()}</h3>
        </div>
    )
}

export default StripeCheckout