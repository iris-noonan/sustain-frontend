// src/components/Products.jsx

const Products = ({ user }) => {
  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        This is the products page where you, and only you, can see a list
        of all the products.
      </p>
    </main>
  );
};

export default Products;
