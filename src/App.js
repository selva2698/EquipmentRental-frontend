import { useEffect, useState } from 'react';
import './App.css';
import { useCart } from 'react-use-cart';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Switch,Route,Redirect, Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
function App() {
  const [data,setdata]=useState([]);
  useEffect(()=>{
      fetch("https://hackathon2-guvi.herokuapp.com/cart")
      .then(data=>data.json())
      .then(data=>setdata(data))
  },[])
  return (
    <div className="App">
        <Switch>
          <Route path="/Home">
            <Home />
          </Route>
          <Route path="/products">
            <ProductsTop />
            {data.map((data,index)=><Products name={data.title} pic={data.img} price={data.price} spec={data.desc} data={data} key={index}/>)}
          </Route>
          <Route path="/cart">
            <Cart />
          </Route >
          <Route path="/*">
              <Redirect to="/Home" />
          </Route>
        </Switch>
    </div>
  );
}
function Home(){
  return(
    <>
  <AppBar position="static">
  <Toolbar>
  <Link to="/Products" className="btn1"><button>Products</button></Link>
    <input type="Text" placeholder="Search...." onChange={(event)=>{productsearch(event.target.value)}}></input>
  <Link to="/Cart" className="btn1" title="icons">
        <span className="icon1">
          <FontAwesomeIcon icon={faShoppingCart} key="msv" />
        </span>
        Cart
      </Link>
  </Toolbar>
</AppBar>    
</>
  )
}
function Products(props) {
  const { addItem } = useCart();
  return (
    <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4 ">
      <div className="card p-0 overflow-hidden h-100 shadow">
        <img src={props.pic} className="card-img-top img-fluid" alt="img_" />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.spec}</p>
          <h5 className="card-title">₹{props.price}/day</h5>
          <button className="btn btn-primary" onClick={() => {addItem(props.data)}}>Add to cart</button>
        </div>
      </div>
    </div>
  );

}
function Cart(){
  const {isEmpty,items,totalItems,cartTotal,updateItemQuantity,removeItem,emptyCart}=useCart();
  if(isEmpty) return(<div>
    <Link to ="/products">
      <button className="btn btn-primary m-2">Products</button></Link>
      <h1 className="text-center">Your cart is empty</h1>
      </div>)
  return(
    <section className="py-4 container">
    <div className="row justify-content-center">
      <div className="col12">
        <ProductsTop total={totalItems}/>
        <table className="table table-light table-hover m-0">
           <tbody>
            {items.map((data,index)=>{return(
              <tr key={index}>
                <td>
                  <img src={data.img} style={{height:'6rem'}}alt="img_"/>
                </td>
                <td>
                  {data.title}
                </td>
                <td>{data.desc}</td>
                <td>{data.price}</td>
                <td>
                    <button className="btn btn-info ms-2" onClick={()=>{updateItemQuantity(data.id,data.quantity+1)}}>+</button>
                    <button className="btn btn-info ms-2" onClick={()=>{updateItemQuantity(data.id,data.quantity-1)}}>-</button>
                    <button className="btn btn-danger ms-2" onClick={()=>{removeItem(data.id)}}>remove item</button>
                </td>
              </tr>
            )})}
            </tbody>
        </table>
    </div>
    <div className="col-auto ms-auto">
              <h2>Total:{cartTotal}</h2>
    </div>
    <div  className="col-auto"><button className="btn btn-danger m2" onClick={()=>emptyCart()}>Clear cart</button></div>
    </div>
    </section>
    )
}
function ProductsTop(props){
    return(
      <>
    <AppBar position="static">
  <Toolbar>
    <input type="Text" placeholder="Search...." onChange={(event)=>{productsearch(event.target.value)}}></input>
  <Link to="/Cart" className="btn1" title="icons">
        <span className="icon1">
          <FontAwesomeIcon icon={faShoppingCart} key="msv" />
        </span>
        Cart
        {props.total?<span className="cartcount">
          {props.total}
        </span>:<span></span>}
      </Link>
  </Toolbar>
</AppBar>
      </>
    )
}
function productsearch(){
}
export default App;
