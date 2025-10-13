import { useState } from 'react'
import FoodItem from './FoodItem';
import allfoods from '../../public/data.json'
const AllFood = () => {
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Burgers', 'Fries', 'Drinks', 'Snacks', 'Desserts', 'Sauces', 'Salad', 'Pasta', 'Chinese'];


  const filteredFoods = category === 'All' ? allfoods : allfoods.filter((food) => food.category === category);



  return (
    <div className='px-10 py-20 '>
      <div className='flex items-center justify-between'>
        <ul className="flex items-center justify-around gap-10   h-10">
          <li className='font-primary font-semibold cursor-pointer'>Home</li>
          <li className='font-primary font-semibold cursor-pointer'>About</li>
          <li className='font-primary font-semibold cursor-pointer'>Contact</li>
        </ul>
        <input type='text' placeholder='search your favourite' className='border-2 border-gray-300 rounded-full px-5 py-2 w-1/3 outline-none' />
        <h3 className='text-2xl font-bold'>Get upto 25% off on your first order</h3>
      </div>

      <div className='flex items-center justify-between mt-10 gap-5 '>
        {
          categories.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)} className={`px-5 py-3 rounded-full font-primary font-semibold ${category === cat ? 'bg-teal-500 text-white' : 'bg-gray-200 text-black'}`}>{cat}</button>
          ))
        }

      </div>
      <div className='grid grid-cols-4 gap-10 mt-10'>

        {
          filteredFoods.map((food) => (
            <FoodItem allfoods={food} />
          ))

        }
      </div>
    </div>
  )
}

export default AllFood