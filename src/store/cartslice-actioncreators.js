import { cartActions } from "./cartslice";
import { uiActions } from "./uislice";

//una action creator function
export function sendCartData(cart) {
  //non ritorna l'action "{type:..., payload:...}" ma una funzione
  //se fa qualcosa di asincrono possiamo definirla come asincrona

  //l'argomento passato (dispatch) è il nome della funzione che possiamo invocare all'interno
  return async (dispatch) => {
    //qui dispatch è la funzione passata come argomento
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "sending...",
        message: "sending cart data",
      })
    );

    //inseriamo la fetch all'interno di un'altra funzione
    const sendRequest = async () => {
      const response = await fetch(
        "https://lorel-prova-default-rtdb.europe-west1.firebasedatabase.app/advancedReduxCart.json",
        {
          method: "PUT", //aggiorna un solo record (post aggiunge altri record)
          body: JSON.stringify(cart),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("error");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "send cart data successful",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "sending cart data failed",
        })
      );
    }
  };
}

export function fetchCartData(cart) {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://lorel-prova-default-rtdb.europe-west1.firebasedatabase.app/advancedReduxCart.json"
      );

      if (!response.ok) {
        throw new Error("error");
      }

      return await response.json();
    };

    try {
      var results = await fetchData();
      dispatch(cartActions.replaceCart({
        cartItems: results.cartItems || [],
        itemCount: results.itemCount || 0
      }));

    } catch (error) {
        dispatch(
            uiActions.showNotification({
              status: "error",
              title: "Error!",
              message: "loading data failed",
            })
          );
    }
  };
}
