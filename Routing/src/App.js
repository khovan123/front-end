import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Product";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import ProductDetails from "./components/ProductDetails";
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> }, ///index: true = path:'/' or " " when active web in parent
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "products/:productId",
        element: <ProductDetails />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
