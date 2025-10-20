import { BrowserRouter, Routes, Route } from 'react-router-dom'; //for handling navigation
import Home from './pages/Home';
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';
import MortgageCalculator from './pages/MortgageCalculator';
import UpdateProfile from './pages/UpdateProfile';
import MyListings from './pages/MyListings';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<Signin />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/mortgage-calculator' element={<MortgageCalculator />} />
        <Route path='/search' element={<Search />} />
        <Route path='/listing/:listingId' element={<Listing />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/my-listings" element={<MyListings />} />


        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route
            path='/update-listing/:listingId'
            element={<UpdateListing />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Signin from './pages/Signin';
// import SignUp from './pages/SignUp';
// import About from './pages/About';
// import Profile from './pages/Profile';
// import Header from './components/Header';
// import PrivateRoute from './components/PrivateRoute';
// import PrivateAdminRoute from './components/PrivateAdminRoute';
// import CreateListing from './pages/CreateListing';
// import UpdateListing from './pages/UpdateListing';
// import Listing from './pages/Listing';
// import Search from './pages/Search';
// import MortgageCalculator from './pages/MortgageCalculator';
// // Import Admin-related components
// import AdminSignin from './pages/admin/AdminSignin';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import AdminUsers from './pages/admin/AdminUsers';
// // import AdminListings from './pages/admin/AdminListings';

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Header />
//       <Routes>
//         {/* Public Routes */}
//         <Route path='/' element={<Home />} />
//         <Route path='/sign-in' element={<Signin />} />
//         <Route path='/sign-up' element={<SignUp />} />
//         <Route path='/about' element={<About />} />
//         <Route path='/mortgage-calculator' element={<MortgageCalculator />} />
//         <Route path='/search' element={<Search />} />
//         <Route path='/listing/:listingId' element={<Listing />} />

//         {/* Admin Authentication Route */}
//         <Route path='/admin/signin' element={<AdminSignin />} />

//         {/* Protected User Routes */}
//         <Route element={<PrivateRoute />}>
//           <Route path='/profile' element={<Profile />} />
//           <Route path='/create-listing' element={<CreateListing />} />
//           <Route
//             path='/update-listing/:listingId'
//             element={<UpdateListing />}
//           />
//         </Route>

//         {/* Protected Admin Routes */}
//         <Route element={<PrivateAdminRoute />}>
//           <Route path='/admin/dashboard' element={<AdminDashboard />} />
//           <Route path='/admin/users' element={<AdminUsers />} />
//           {/* <Route path='/admin/listings' element={<AdminListings />} /> */}
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }
