import {useState} from 'react'


const AllFood = () => {
  const [category,setCategory] = useState('All');

  const categories = ['All', 'Burgers', 'Fries', 'Drinks', 'Snacks', 'Dessert', 'Sauces', 'Salad'];
  return (
    <div className='px-10 py-20 '>
      <div className='flex items-center justify-between'>
      <input type="text" placeholder='search your favourite food' className='bg-gray-100 w-[500px] px-7 py-5 outline-none rounded-full font-primary' />
      <h3 className='text-2xl font-bold'>Get upto 25% off on your first order</h3>
      </div>

      <div className='flex items-center justify-between mt-10 gap-5 '>
       {
        categories.map((cat)=>(
          <button key={cat} onClick={()=>setCategory(cat)} className={`px-5 py-3 rounded-full font-primary font-semibold ${category===cat?'bg-teal-500 text-white':'bg-gray-200 text-black'}`}>{cat}</button>
        ))
       }
      </div>
    </div>
  )
}

export default AllFood










