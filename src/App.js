import { Routes, Route } from "react-router-dom";
import HomePage from "./components/Home/HomePage/HomePage";
import NavBar from "./components/NavBar/NavBar";
import WishList from "./components/WishList/WishList";

function App() {
  //get wishlist from local storage. return [] if not exist
  // const [wishList, setWishList] = useState(
  //   JSON.parse(localStorage.getItem("wishlist") || "[]")
  // );

  // //set new wishList to local storage whenever wishList changes
  // useEffect(() => {
  //   localStorage.setItem("wishlist", JSON.stringify(wishList));
  // }, [wishList]);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wishlist" element={<WishList />} />
      </Routes>
    </div>
  );
}

export default App;
