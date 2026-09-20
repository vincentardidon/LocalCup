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




export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
}) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onDecrease}
        disabled={quantity <= 1}
        style={({ pressed }) => [
          styles.button,
          quantity <= 1 && styles.disabled,
          pressed && quantity > 1 && styles.pressed,
        ]}
      >
        <Minus
          size={18}
          color={
            quantity <= 1
              ? COLORS.textMuted
              : COLORS.text
          }
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
          size={18}
          color={COLORS.text}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  button: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  quantity: {
    minWidth: 28,
    textAlign: "center",
    fontFamily: TYPOGRAPHY.button.fontFamily,
    fontSize: 17,
    color: COLORS.text,
  },

  disabled: {
    opacity: 0.45,
  },

  pressed: {
    transform: [{ scale: 0.94 }],
    opacity: 0.75,
  },
});