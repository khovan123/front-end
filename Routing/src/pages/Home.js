import { Link, useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/products");
  }
  return (
    <>
      <h1>Home Page</h1>
      <p>
        Go to products <Link to="/products">here</Link>.
      </p>
      <button onClick={handleClick}>Products</button> {/* same use <Link/> */}
    </>
  );
}
