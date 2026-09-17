import {
    StyleSheet,
    Text,
} from "react-native";

import {
    COLORS,
    TYPOGRAPHY,
} from "../constants/theme";

export default function PriceText({
  price,
  currency = "₱",
  size = "normal",
}) {
  return (
    <Text
      style={[
        styles.price,
        size === "large" && styles.large,
      ]}
    >
      {currency}
      {Number(price).toFixed(2)}
    </Text>
  );
}

const styles = StyleSheet.create({
  price: {
    fontFamily: TYPOGRAPHY.price.fontFamily,
    fontSize: TYPOGRAPHY.price.fontSize,
    color: COLORS.espresso,
  },

  large: {
    fontSize: 22,
  },
});