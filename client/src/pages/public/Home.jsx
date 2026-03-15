import { useState } from 'react';
import Search from './SearchBox';



const Home = () => {


  return (

    <div className="relative">
      {/* HERO SECTION */}
      <section
        className="relative min-h-screen flex items-center justify-center px-4 py-20"
        style={{
          // Linear gradient creates the "overlay" so text is readable
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url('https://plus.unsplash.com/premium_photo-1661964146949-a35b9ae06f89?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90JTIwYWlyJTIwYmFsbG9vbnN8ZW58MHx8MHx8fDA%3D')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="w-full max-w-6xl text-center text-white z-10">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4">
            Explore the <span className="text-blue-400">World</span>
          </h1>
          <p className="text-lg md:text-2xl mb-12 opacity-95 max-w-2xl mx-auto drop-shadow-md">
            Book Hotels, Flights, and Adventures at the best prices.
          </p>

          {/* SEARCH BOX */}
          <div className='mt-8'>
          <Search />

          </div>
        </div>
      </section>
        
      <div className="bg-white py-20 px-10 text-center">
          <h2 className="text-3xl font-bold">Popular Destinations</h2>
          {/* Your next section content */}
      </div>
    </div>


  );
};

export default Home;