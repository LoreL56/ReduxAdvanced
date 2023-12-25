import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { Fragment, useEffect } from "react";
import { fetchCartData, sendCartData } from "./store/cartslice-actioncreators";

let isInitial = true;

function App() {
  const totalItems = useSelector((state) => state.cart.itemCount);
  const showCart = useSelector((state) => state.ui.showCart);
  const notification = useSelector((state) => state.ui.notification);

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  //useeffect per la fetch
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);
  //use effect con action creator. Tutta la logica sta nell'action creator
  //che è definito nel file con lo slice.
  useEffect(() => {
    if(isInitial) {
      isInitial = false;
      return;
    }

    if(cart.changed)
    {
      dispatch(sendCartData({cartItems: cart.cartItems, itemCount: cart.itemCount}));
    }
  }, [cart, dispatch]);

  //use effect puro (niente action creators) tutta la logica sta nel componente
  // useEffect(() => {
  //   const sendCartData = async () => {
      
  //     dispatch(
  //       uiActions.showNotification({
  //         status: "pending",
  //         title: "sending...",
  //         message: "sending cart data",
  //       })
  //     );

  //     const response = await fetch(
  //       "https://lorel-prova-default-rtdb.europe-west1.firebasedatabase.app/advancedReduxCart.json",
  //       {
  //         method: "PUT", //aggiorna un solo record (post aggiunge altri record)
  //         body: JSON.stringify(cart),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       dispatch(
  //         uiActions.showNotification({
  //           status: "error",
  //           title: "Error!",
  //           message: "sending cart data failed",
  //         })
  //       );
  //     }

  //     //const responseData = await response.json();
      
  //     dispatch(
  //       uiActions.showNotification({
  //         status: "success",
  //         title: "Success!",
  //         message: "send cart data successful",
  //       })
  //     );
  //   };

  //   if(isInitial) {
  //     isInitial = false;
  //     return;
  //   }

  //   sendCartData().catch((error) => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: "error",
  //         title: "Error!",
  //         message: "sending cart data failed",
  //       })
  //     );
  //   });

    
  // }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {totalItems > 0 && showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
