import { createContext, useContext, useState } from "react";

const LocalCupContext = createContext();

export function LocalCupProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const addToCart = (item) => {
    setCart((currentCart) => {
      return [...currentCart, item];
    });
  };

  const removeFromCart = (index) => {
    setCart((currentCart) => {
      return currentCart.filter(
        (_, itemIndex) => itemIndex !== index
      );
    });
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
        removeFromCart,
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