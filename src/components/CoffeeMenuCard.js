import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  Heart,
  Plus,
  Star,
} from "lucide-react-native";

import {
  COLORS,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
} from "../constants/theme";

export default function CoffeeMenuCard({
  item,
  onPress,
  onFavorite,
  isFavorite = false,
}) {
  const soldOut = !item.available;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
        soldOut && styles.soldOutCard,
      ]}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={item.image}
          style={styles.image}
          resizeMode="cover"
        />

        <Pressable
          onPress={(event) => {
            event.stopPropagation();
            onFavorite?.(item.id);
          }}
          style={styles.favoriteButton}
        >
          <Heart
            size={18}
            color={
              isFavorite
                ? COLORS.accent
                : COLORS.text
            }
            fill={
              isFavorite
                ? COLORS.accent
                : "transparent"
            }
          />
        </Pressable>

        {soldOut && (
          <View style={styles.soldOutBadge}>
            <Text style={styles.soldOutText}>
              Sold Out
            </Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.nameRow}>
          <Text
            style={styles.name}
            numberOfLines={1}
          >
            {item.name}
          </Text>

          <View style={styles.rating}>
            <Star
              size={13}
              color={COLORS.caramel}
              fill={COLORS.caramel}
            />

            <Text style={styles.ratingText}>
              {item.rating}
            </Text>
          </View>
        </View>

        <Text
          style={styles.description}
          numberOfLines={2}
        >
          {item.description}
        </Text>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>
            ₱{item.price}
          </Text>

          <Pressable
            disabled={soldOut}
            onPress={(event) => {
              event.stopPropagation();
              onPress?.();
            }}
            style={({ pressed }) => [
              styles.addButton,
              soldOut && styles.addDisabled,
              pressed && !soldOut && styles.addPressed,
            ]}
          >
            <Plus
              size={19}
              color={
                soldOut
                  ? COLORS.textMuted
                  : COLORS.cream
              }
            />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    overflow: "hidden",
    marginBottom: SPACING.md,
  },

  soldOutCard: {
    opacity: 0.68,
  },

  pressed: {
    transform: [{ scale: 0.985 }],
  },

  imageWrapper: {
    height: 190,
    position: "relative",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.92)",
    alignItems: "center",
    justifyContent: "center",
  },

  soldOutBadge: {
    position: "absolute",
    left: 12,
    bottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.espresso,
  },

  soldOutText: {
    color: COLORS.cream,
    fontFamily: TYPOGRAPHY.button.fontFamily,
    fontSize: 12,
  },

  content: {
    padding: SPACING.md,
  },

  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },

  name: {
    flex: 1,
    fontFamily: TYPOGRAPHY.productName.fontFamily,
    fontSize: 18,
    color: COLORS.text,
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  ratingText: {
    fontFamily: TYPOGRAPHY.caption.fontFamily,
    fontSize: 13,
    color: COLORS.text,
  },

  description: {
    marginTop: 7,
    lineHeight: 20,
    fontFamily: TYPOGRAPHY.body.fontFamily,
    fontSize: 13,
    color: COLORS.textMuted,
  },

  bottomRow: {
    marginTop: SPACING.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  price: {
    fontFamily: TYPOGRAPHY.price.fontFamily,
    fontSize: 20,
    color: COLORS.primary,
  },

  addButton: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  addDisabled: {
    backgroundColor: COLORS.beige,
  },

  addPressed: {
    transform: [{ scale: 0.92 }],
  },
});