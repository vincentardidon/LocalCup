import {
    Minus,
    Plus,
} from "lucide-react-native";

import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import {
    COLORS,
    RADIUS,
    TYPOGRAPHY,
} from "../constants/theme";

export default function QuantitySelector({
  quantity = 1,
  onDecrease,
  onIncrease,
  minimum = 1,
}) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onDecrease}
        disabled={quantity <= minimum}
        style={({ pressed }) => [
          styles.button,
          quantity <= minimum && styles.disabled,
          pressed && styles.pressed,
        ]}
      >
        <Minus
          size={16}
          color={COLORS.espresso}
        />
      </Pressable>

      <Text style={styles.quantity}>
        {quantity}
      </Text>

      <Pressable
        onPress={onIncrease}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed,
        ]}
      >
        <Plus
          size={16}
          color={COLORS.espresso}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.beige,
    borderRadius: RADIUS.round,
    padding: 4,
  },

  button: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.warmWhite,
  },

  quantity: {
    minWidth: 34,
    textAlign: "center",
    fontFamily: TYPOGRAPHY.button.fontFamily,
    color: COLORS.text,
  },

  disabled: {
    opacity: 0.35,
  },

  pressed: {
    opacity: 0.65,
  },
});