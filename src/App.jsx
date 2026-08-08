import React from 'react';

const Navbar = React.lazy(() => import('./components/layout/Navbar'));
const Footer = React.lazy(() => import('./components/layout/Footer'));
const Home = React.lazy(() => import('./pages/Home/Home'));

const App = () => {
  return (
    <div className="bg-white p-4">
      <Navbar />
      <main className="py-8 max-w-6xl mx-auto mx-sm:mx-0">
        <Home />
      </main>
      <Footer />
    </div>
  );
};

export default App;