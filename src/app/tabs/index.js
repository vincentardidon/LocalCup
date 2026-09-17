import {
  Coffee,
  MapPin,
  Search,
} from "lucide-react-native";

import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { PrimaryButton } from "../../components/Button";
import Card from "../../components/Card";
import Screen from "../../components/Screen";
import SearchBar from "../../components/SearchBar";
import SectionHeader from "../../components/SectionHeader";
import StatusBadge from "../../components/StatusBadge";

import {
  COLORS,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
} from "../../constants/theme";

export default function HomeScreen() {
  return (
    <Screen>
      {/* Location */}
      <View style={styles.locationRow}>
        <View style={styles.locationIcon}>
          <MapPin
            size={17}
            color={COLORS.caramel}
          />
        </View>

        <View>
          <Text style={styles.locationLabel}>
            YOUR LOCATION
          </Text>

          <Text style={styles.locationText}>
            Nearby cafes
          </Text>
        </View>
      </View>

      {/* Greeting */}
      <View style={styles.greeting}>
        <Text style={styles.eyebrow}>
          LOCALCUP
        </Text>

        <Text style={styles.title}>
          Your next cup{"\n"}
          is waiting.
        </Text>

        <Text style={styles.description}>
          Discover independent cafes and
          local coffee gems around you.
        </Text>
      </View>

      {/* Search */}
      <SearchBar
        placeholder="Search cafes or coffee..."
        showFilter
      />

      {/* Hero */}
      <Card style={styles.hero}>
        <View style={styles.heroIcon}>
          <Coffee
            size={25}
            color={COLORS.caramelLight}
          />
        </View>

        <Text style={styles.heroEyebrow}>
          ORDER AHEAD
        </Text>

        <Text style={styles.heroTitle}>
          Skip the line.
        </Text>

        <Text style={styles.heroText}>
          Customize your favorite drink
          and have it ready when you arrive.
        </Text>

        <PrimaryButton
          title="Explore cafes"
          icon={
            <Search
              size={17}
              color={COLORS.white}
            />
          }
          style={styles.heroButton}
          onPress={() => {}}
        />
      </Card>

      {/* Nearby */}
      <SectionHeader
        title="Nearby cafes"
        subtitle="Coffee worth discovering"
        actionText="View all"
        onActionPress={() => {}}
      />

      <Card style={styles.cafePreview}>
        <View style={styles.fakeImage}>
          <Coffee
            size={32}
            color={COLORS.caramel}
          />
        </View>

        <View style={styles.cafeInfo}>
          <Text style={styles.cafeName}>
            Local cafe discovery
          </Text>

          <Text style={styles.cafeDescription}>
            Real cafes and visual menus
            will be connected here.
          </Text>

          <StatusBadge status="Open" />
        </View>
      </Card>

      <View style={styles.bottomSpace} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.xxl,
  },

  locationIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.beige,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  locationLabel: {
    fontFamily: TYPOGRAPHY.caption.fontFamily,
    fontSize: 10,
    letterSpacing: 1.3,
    color: COLORS.textMuted,
  },

  locationText: {
    marginTop: 2,
    fontFamily: TYPOGRAPHY.bodyMedium.fontFamily,
    color: COLORS.text,
  },

  greeting: {
    marginBottom: SPACING.xl,
  },

  eyebrow: {
    fontFamily: TYPOGRAPHY.button.fontFamily,
    fontSize: 11,
    letterSpacing: 2.5,
    color: COLORS.caramel,
    marginBottom: 8,
  },

  title: {
    fontFamily: TYPOGRAPHY.hero.fontFamily,
    fontSize: TYPOGRAPHY.hero.fontSize,
    lineHeight: TYPOGRAPHY.hero.lineHeight,
    color: COLORS.text,
  },

  description: {
    marginTop: 12,
    maxWidth: 330,
    fontFamily: TYPOGRAPHY.body.fontFamily,
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.textSecondary,
  },

  hero: {
    marginTop: SPACING.xxl,
    marginBottom: SPACING.xxxl,
    padding: 22,
    backgroundColor: COLORS.espresso,
    overflow: "hidden",
  },

  heroIcon: {
    width: 48,
    height: 48,
    borderRadius: 17,
    backgroundColor: COLORS.espressoLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  heroEyebrow: {
    fontFamily: TYPOGRAPHY.button.fontFamily,
    fontSize: 10,
    letterSpacing: 2,
    color: COLORS.caramelLight,
  },

  heroTitle: {
    marginTop: 5,
    fontFamily: TYPOGRAPHY.sectionTitle.fontFamily,
    fontSize: 25,
    color: COLORS.white,
  },

  heroText: {
    marginTop: 8,
    fontFamily: TYPOGRAPHY.body.fontFamily,
    lineHeight: 21,
    color: COLORS.beige,
  },

  heroButton: {
    marginTop: 20,
    alignSelf: "flex-start",
  },

  cafePreview: {
    flexDirection: "row",
    padding: 12,
  },

  fakeImage: {
    width: 88,
    height: 88,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.beige,
    alignItems: "center",
    justifyContent: "center",
  },

  cafeInfo: {
    flex: 1,
    marginLeft: 14,
    paddingVertical: 3,
  },

  cafeName: {
    fontFamily: TYPOGRAPHY.cafeName.fontFamily,
    color: COLORS.text,
  },

  cafeDescription: {
    flex: 1,
    marginTop: 5,
    fontFamily: TYPOGRAPHY.caption.fontFamily,
    lineHeight: 18,
    color: COLORS.textSecondary,
  },

  bottomSpace: {
    height: 20,
  },
});