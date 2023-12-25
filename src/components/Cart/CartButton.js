import { useDispatch, useSelector } from "react-redux";
import classes from "./CartButton.module.css";
import uiSlice from "../../store/uislice";

const CartButton = (props) => {
  const itemCount = useSelector((state) => state.cart.itemCount);
  const dispatch = useDispatch();

  function showCartHandler() {
    dispatch(uiSlice.actions.toogleShowCart());
  }

  return (
    <button onClick={showCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{itemCount}</span>
    </button>
  );
};

export default CartButton;
