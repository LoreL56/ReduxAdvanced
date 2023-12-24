import { useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  var items = useSelector((state) => state.cart.cartItems);

  const itemList = items.map((x) => <CartItem key={x.id} item={x} />);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>{itemList}</ul>
    </Card>
  );
};

export default Cart;
