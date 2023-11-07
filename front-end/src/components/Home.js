import React,{useEffect} from 'react'
import { getRestaurants, sortByRatings, 
  sortByReviews, toggleVegOnly } from "../actions/restaurantAction.js";
import Restaurant from './Restaurant.js';
import Loader from "../components/Layout/Loader.js";
import Message from "../components/Message.js";
import { useDispatch, useSelector }  from "react-redux";
import CountRestaurant from './CountRestaurant.js';
import "../App.css";
import { useParams } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const {keyword} = useParams();
  const {loading: restaurantsLoading, 
         error: restaurantsError,
         restaurants, showVegOnly,
         } = useSelector((state) => state.restaurants);

  useEffect(()=>{
    if(restaurantsError){
      return alert.error(restaurantsError);
    }
    dispatch(getRestaurants(keyword));
  }, [dispatch, restaurantsError, keyword]);

  const handleSortByRatings = () => {
    dispatch(sortByRatings());
  };

  const handleSortByReviews = () => {
    dispatch(sortByReviews());
  };

  const handleToggleVegOnly = () => {
    dispatch(toggleVegOnly());
  };

  return (
    <>
    <CountRestaurant />
      {restaurantsLoading ? <Loader/> : 
      (restaurantsError ? <Message variant = "danger">{restaurantsError}</Message> : (<></>))
      }
      <>
        <section>
          <div className='sort'>
            <button className='sort_veg p-3' onClick={handleToggleVegOnly}>
              {showVegOnly ? "Show All" : "Pure Veg"}
            </button>
            <button className='sort_rev p-3' onClick={handleSortByReviews}>
              Sort By Reviews
            </button>
            <button className='sort_rate p-3' onClick={handleSortByRatings}>
              Sort By Ratings
            </button>
          </div>
          <div className='row mt-4'>
            {restaurants && restaurants.restaurants ? (
              restaurants.restaurants.map((restaurant) => (
                !showVegOnly || (showVegOnly && restaurant.isVeg) ? (
                <Restaurant key={restaurant._id} restaurant = {restaurant}/>) : null
              ))): (
                <Message variant="info">No restaurants found</Message>
              )
            }
          </div>
        </section>
      </>
    </>
  )
}

export default Home