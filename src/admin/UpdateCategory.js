import React,{useState,useEffect} from 'react'
import Base from '../core/Base'
import { Link, Redirect } from 'react-router-dom'
import { updateCategory, getCategory } from './helper/adminapicall'
import { cleanup, render } from '@testing-library/react'
import { isAuthenticated } from '../auth/helper'

const UpdateCategory=  ({match}) =>{

    const {user,token} = isAuthenticated()
    const[values,setValues] = useState({
        name:"",
        error:"",
        getaRedirect:false,
        formData:""
    })
    const{name,getaRedirect,formData} = values


    const preload=(categoryId)=>{
        getCategory(categoryId).then(data=>{
            console.log(data)
            if(data.error){
                setValues({...values,error:data.error});
                }
            else{
                
                setValues({...values,
                name:data.name,
                formData :new FormData()
                
            })
           
            }
        })
    }
    

    useEffect(()=>{
        preload(match.params.categoryId)
    },[]);
    //TODO:
    const onSubmit =(event) =>{

            event.preventDefault()

            setValues({...values,error:""})

            updateCategory(match.params.categoryId,user._id,token,formData).then(data=>{
                console.log(data)
                if(data.error){
                    setValues({...values,error:data.error})
                }else{
                    setValues({...values,name:""})
                    setTimeout(() => (
                        setValues({...values,getaRedirect:true})
                    ), 2);
                    
                }
            }).catch()
            
    }
    render(); {
        
        if(getaRedirect){
            return <Redirect to="/admin/dashboard"/>;
        }
      }

    const handleChange= name =>event=>{
        const value = name === "photo" ?event.target.files[0]:event.target.value
        formData.set(name,value)
        setValues({...values,[name]:value})
    }
  


    const createProductForm = () => (
        <form >
          
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success bm-3">
            Update Category
          </button>
        </form>
      );
    return (
        <Base title="Add Product" description="Welcome to product creation section" className="container bg-info p-4">
            <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">Admin Home</Link>
            <div className="row bg-dark text-white rouded">
    <div className="col-md-8 offset-md-2">
        
        {createProductForm()}</div>
            </div>
        </Base>
    )
}

export default UpdateCategory