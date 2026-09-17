import {
    Heart,
} from "lucide-react-native";

import {
    Pressable,
    StyleSheet,
} from "react-native";

import {
    COLORS,
    SHADOWS
} from "../constants/theme";

export default function FavoriteButton({
  active = false,
  onPress,
  size = 42,
}) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={({ pressed }) => [
        styles.button,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        pressed && styles.pressed,
      ]}
    >
      <Heart
        size={20}
        color={
          active
            ? COLORS.caramel
            : COLORS.espresso
        }
        fill={
          active
            ? COLORS.caramel
            : "transparent"
        }
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.warmWhite,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.floating,
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.92 }],
  },
});