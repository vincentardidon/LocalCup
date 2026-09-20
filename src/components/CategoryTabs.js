import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
} from "react-native";

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from "../constants/theme";

export default function CategoryTabs({
  categories,
  selectedCategory,
  onSelect,
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => {
        const selected = category === selectedCategory;

        return (
          <Pressable
            key={category}
            onPress={() => onSelect(category)}
            style={({ pressed }) => [
              styles.chip,
              selected && styles.selectedChip,
              pressed && styles.pressed,
            ]}
          >
            <Text
              style={[
                styles.text,
                selected && styles.selectedText,
              ]}
            >
              {category}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.screen,
    paddingBottom: SPACING.md,
    gap: 10,
  },

  chip: {
    minHeight: 42,
    paddingHorizontal: 18,
    borderRadius: RADIUS.pill,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.surface,
  },

  selectedChip: {
    backgroundColor: COLORS.primary,
  },

  text: {
    fontFamily: TYPOGRAPHY.body.fontFamily,
    fontSize: 14,
    color: COLORS.text,
  },

  selectedText: {
    color: COLORS.cream,
    fontFamily: TYPOGRAPHY.button.fontFamily,
  },

  pressed: {
    opacity: 0.78,
  },
});