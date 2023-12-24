import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const myProducts = [
  { description: "Ferrari", title: "Macchina", price: 6, id: 0 },
  { description: "Harley", title: "Moto", price: 2, id: 1 },
  { description: "Grande", title: "Camion", price: 10, id: 2 },
];
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {myProducts.map((x) => (
          <ProductItem
            title={x.title}
            price={x.price}
            desctiption={x.description}
            id={x.id}
            key={x.id}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
