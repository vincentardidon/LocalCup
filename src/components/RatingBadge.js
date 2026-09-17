import {
    MapPin,
    Star,
} from "lucide-react-native";

import {
    StyleSheet,
    Text,
    View,
} from "react-native";

import {
    COLORS,
    RADIUS,
    TYPOGRAPHY,
} from "../constants/theme";

export default function RatingBadge({
  rating,
  reviews,
  distance,
}) {
  return (
    <View style={styles.row}>
      {rating !== undefined && (
        <View style={styles.rating}>
          <Star
            size={13}
            color={COLORS.caramel}
            fill={COLORS.caramel}
          />

          <Text style={styles.ratingText}>
            {rating}
          </Text>

          {reviews && (
            <Text style={styles.reviews}>
              ({reviews})
            </Text>
          )}
        </View>
      )}

      {distance && (
        <View style={styles.distance}>
          <MapPin
            size={13}
            color={COLORS.sage}
          />

          <Text style={styles.distanceText}>
            {distance}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.beige,
    borderRadius: RADIUS.round,
    paddingHorizontal: 8,
    paddingVertical: 5,
    gap: 4,
  },

  ratingText: {
    fontFamily: TYPOGRAPHY.button.fontFamily,
    fontSize: 12,
    color: COLORS.text,
  },

  reviews: {
    fontFamily: TYPOGRAPHY.caption.fontFamily,
    fontSize: 11,
    color: COLORS.textSecondary,
  },

  distance: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  distanceText: {
    fontFamily: TYPOGRAPHY.caption.fontFamily,
    color: COLORS.textSecondary,
  },
});