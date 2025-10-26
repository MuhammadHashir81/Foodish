import { useEffect, useState } from 'react'
import FoodItem from './FoodItem';
import { useDispatch, useSelector, } from 'react-redux';
import { getAdminFoods } from './slices/adminSlice';
import { FaSearch } from 'react-icons/fa';
import { useMemo } from 'react';
import { Toaster } from 'react-hot-toast';
const AllFood = () => {

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getAdminFoods())
  }, [])


  const { allfoods } = useSelector(state => state.admin)
  console.log(allfoods)


  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('')

  const categories = ['All', 'Pizzas', 'Burgers', 'Fries', 'Drinks', 'Snacks', 'Desserts', 'Sauces', 'Salad', 'Pastas'];

   let filteredFoods;
   filteredFoods = category === 'All' ? allfoods : allfoods.filter((food) => food.category === category);

  // handle search change

    
    filteredFoods = filteredFoods.filter(food => 
      food.category.toLowerCase().includes(search.toLowerCase())
    );



  return (
    <div className='px-10 py-20 '>
      <Toaster />

      {/* search section */}
      <div className='flex items-center justify-between'>
        {/* <ul className="flex items-center justify-around gap-10   h-10">
          <li className='font-primary font-semibold cursor-pointer'>Home</li>
          <li className='font-primary font-semibold cursor-pointer'>About</li>
          <li className='font-primary font-semibold cursor-pointer'>Contact</li>
        </ul> */}
        <input
          value={search}
          onChange={(e)=> setSearch(e.target.value)}
          type='text' placeholder='search your favourite' className='border-2 border-gray-300 rounded-full px-5 py-2 w-[50%] outline-none' />
        <h3 className='text-2xl font-bold'>Get upto 25% off on your first order</h3>
      </div>
      {/* end of search section */}


      <div className='flex items-center justify-between mt-10 gap-5 flex-wrap '>
        {
          categories.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)} className={`px-5 py-3 rounded-full font-primary font-semibold ${category === cat ? 'bg-teal-500 text-white' : 'bg-gray-200 text-black'}`}>{cat}</button>
          ))
        }

      </div>
      <div className="grid grid-cols-3 gap-6 items-start">



        {
          filteredFoods.map((food) => (
            <FoodItem allfoods={food} key={food.id} />
          ))

        }
      </div>
    </div>
  )
}

export default AllFood



