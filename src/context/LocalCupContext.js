import { createContext, useContext, useState } from "react";

const LocalCupContext = createContext();

export function LocalCupProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const addToCart = (item) => {
    setCart((currentCart) => {
      const existingIndex = currentCart.findIndex(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.cafeId === item.cafeId
      );

      if (existingIndex !== -1) {
        return currentCart.map((cartItem, index) =>
          index === existingIndex
            ? {
                ...cartItem,
                quantity:
                  (cartItem.quantity || 1) + (item.quantity || 1),
              }
            : cartItem
        );
      }

      return [
        ...currentCart,
        {
          ...item,
          quantity: item.quantity || 1,
        },
      ];
    });
  };

  const increaseQuantity = (index) => {
    setCart((currentCart) =>
      currentCart.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              quantity: (item.quantity || 1) + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (index) => {
    setCart((currentCart) =>
      currentCart
        .map((item, itemIndex) =>
          itemIndex === index
            ? {
                ...item,
                quantity: Math.max((item.quantity || 1) - 1, 0),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (index) => {
    setCart((currentCart) =>
      currentCart.filter(
        (_, itemIndex) => itemIndex !== index
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleFavorite = (cafeId) => {
    setFavorites((currentFavorites) => {
      if (currentFavorites.includes(cafeId)) {
        return currentFavorites.filter(
          (id) => id !== cafeId
        );
      }

      return [...currentFavorites, cafeId];
    });
  };

  return (
    <LocalCupContext.Provider
      value={{
        cart,
        favorites,
        currentUser,
        setCurrentUser,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        toggleFavorite,
      }}
    >
      {children}
    </LocalCupContext.Provider>
  );
}

export function useLocalCup() {
  return useContext(LocalCupContext);
}