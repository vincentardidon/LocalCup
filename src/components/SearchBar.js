import {
    Pressable,
    StyleSheet,
    TextInput,
    View,
} from "react-native";

import {
    Search,
    SlidersHorizontal,
} from "lucide-react-native";

import {
    COLORS,
    RADIUS,
    SPACING,
} from "../constants/theme";

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search cafes or coffee...",
  onFilterPress,
  showFilter = false,
}) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.searchContainer}>
        <Search
          size={20}
          color={COLORS.textMuted}
        />

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textMuted}
          style={styles.input}
          returnKeyType="search"
        />

        {showFilter && (
          <Pressable
            onPress={onFilterPress}
            style={({ pressed }) => [
              styles.filterButton,
              pressed && styles.pressed,
            ]}
            hitSlop={8}
          >
            <SlidersHorizontal
              size={19}
              color={COLORS.espresso}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },

  searchContainer: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.warmWhite,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    gap: 10,
  },

  input: {
    flex: 1,
    height: "100%",
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    color: COLORS.text,
  },

  filterButton: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.beige,
    alignItems: "center",
    justifyContent: "center",
  },

  pressed: {
    opacity: 0.65,
  },
});