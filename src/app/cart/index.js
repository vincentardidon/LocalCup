import { router } from "expo-router";
import {
  ArrowLeft,
  Clock3,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react-native";
import { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  COLORS,
  RADIUS,
  SCREEN,
  TYPOGRAPHY
} from "../../constants/theme";
import { useLocalCup } from "../../context/LocalCupContext";

const SERVICE_FEE = 15;

const PICKUP_OPTIONS = [
  {
    id: "asap",
    label: "ASAP",
    subtitle: "Ready as soon as possible",
  },
  {
    id: "15",
    label: "15 min",
    subtitle: "Quick pickup",
  },
  {
    id: "20",
    label: "20 min",
    subtitle: "Recommended",
  },
  {
    id: "30",
    label: "30 min",
    subtitle: "Take your time",
  },
  {
    id: "45",
    label: "45 min",
    subtitle: "Later pickup",
  },
];

const FALLBACK_CAFE = {
  id: "hearth-brew",
  name: "Hearth & Brew",
  address: "Downtown neighborhood",
};

function getCafeName(item) {
  return (
    item.cafeName ||
    item.cafe?.name ||
    item.cafe?.cafeName ||
    "Local Cafe"
  );
}

function getCafeId(item) {
  return (
    item.cafeId ||
    item.cafe?.id ||
    "hearth-brew"
  );
}

function getItemPrice(item) {
  return Number(item.price) || 0;
}

function getItemImage(item) {
  return (
    item.image ||
    item.imageUrl ||
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
  );
}

function getCustomizationSummary(item) {
  if (item.customizationSummary) {
    return item.customizationSummary;
  }

  const customization = item.customization || {};

  const parts = [
    customization.milk,
    customization.sweetness,
    customization.size,
  ].filter(Boolean);

  if (parts.length > 0) {
    return parts.join(" • ");
  }

  return item.description || "Standard preparation";
}

function formatPrice(value) {
  return `₱${value.toFixed(2)}`;
}

export default function CartScreen() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useLocalCup();

  const [orderType, setOrderType] = useState("pickup");
  const [pickupTime, setPickupTime] = useState("asap");

  const selectedCafe = useMemo(() => {
    if (!cart.length) {
      return FALLBACK_CAFE;
    }

    const firstItem = cart[0];

    return {
      id: getCafeId(firstItem),
      name: getCafeName(firstItem),
      address:
        firstItem.cafeAddress ||
        firstItem.cafe?.address ||
        "Local neighborhood cafe",
    };
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const quantity = item.quantity || 1;
      return total + getItemPrice(item) * quantity;
    }, 0);
  }, [cart]);

  const estimatedTotal = subtotal + SERVICE_FEE;

  const handleCheckout = () => {
    router.push("/checkout");
  };

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyTopBar}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.iconButton,
              pressed && styles.pressed,
            ]}
          >
            <ArrowLeft
              size={22}
              color={COLORS.espresso}
              strokeWidth={2.2}
            />
          </Pressable>

          <Text style={styles.emptyHeaderTitle}>
            My Cart
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.emptyContent}>
          <View style={styles.emptyIcon}>
            <ShoppingBag
              size={42}
              color={COLORS.caramel}
              strokeWidth={1.8}
            />
          </View>

          <Text style={styles.emptyTitle}>
            Your cup is waiting.
          </Text>

          <Text style={styles.emptyDescription}>
            Discover a local cafe and add your first drink.
          </Text>

          <Pressable
            onPress={() => router.push("/discover")}
            style={({ pressed }) => [
              styles.exploreButton,
              pressed && styles.pressedButton,
            ]}
          >
            <Text style={styles.exploreButtonText}>
              Explore Cafes
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.iconButton,
              pressed && styles.pressed,
            ]}
          >
            <ArrowLeft
              size={22}
              color={COLORS.espresso}
              strokeWidth={2.2}
            />
          </Pressable>

          <View style={styles.headerText}>
            <Text style={styles.title}>My Cart</Text>
            <Text style={styles.cafeLabel}>
              {selectedCafe.name}
            </Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        {/* ONE CAFE NOTICE */}
        <View style={styles.cafeNotice}>
          <View style={styles.noticeIcon}>
            <ShoppingBag
              size={18}
              color={COLORS.espresso}
              strokeWidth={2}
            />
          </View>

          <View style={styles.noticeContent}>
            <Text style={styles.noticeTitle}>
              One cafe per order
            </Text>

            <Text style={styles.noticeText}>
              Your cart is currently from {selectedCafe.name}.
            </Text>
          </View>
        </View>

        {/* CART ITEMS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Your items
          </Text>

          {cart.map((item, index) => {
            const quantity = item.quantity || 1;
            const price = getItemPrice(item);
            const itemTotal = price * quantity;

            return (
              <View
                key={`${item.id || item.name}-${index}`}
                style={styles.cartCard}
              >
                <Image
                  source={{ uri: getItemImage(item) }}
                  style={styles.productImage}
                />

                <View style={styles.productContent}>
                  <View style={styles.productTopRow}>
                    <View style={styles.productInfo}>
                      <Text
                        style={styles.productName}
                        numberOfLines={2}
                      >
                        {item.name || "Coffee"}
                      </Text>

                      <Text style={styles.customization}>
                        {getCustomizationSummary(item)}
                      </Text>
                    </View>

                    <Pressable
                      onPress={() => removeFromCart(index)}
                      hitSlop={8}
                      style={({ pressed }) => [
                        styles.deleteButton,
                        pressed && styles.pressed,
                      ]}
                    >
                      <Trash2
                        size={18}
                        color={COLORS.textMuted}
                        strokeWidth={2}
                      />
                    </Pressable>
                  </View>

                  <View style={styles.productBottomRow}>
                    <Text style={styles.itemPrice}>
                      {formatPrice(price)}
                    </Text>

                    <View style={styles.quantityControl}>
                      <Pressable
                        onPress={() => decreaseQuantity(index)}
                        style={({ pressed }) => [
                          styles.quantityButton,
                          pressed && styles.quantityPressed,
                        ]}
                      >
                        <Minus
                          size={16}
                          color={COLORS.espresso}
                          strokeWidth={2.4}
                        />
                      </Pressable>

                      <Text style={styles.quantityText}>
                        {quantity}
                      </Text>

                      <Pressable
                        onPress={() => increaseQuantity(index)}
                        style={({ pressed }) => [
                          styles.quantityButton,
                          pressed && styles.quantityPressed,
                        ]}
                      >
                        <Plus
                          size={16}
                          color={COLORS.espresso}
                          strokeWidth={2.4}
                        />
                      </Pressable>
                    </View>

                    <Text style={styles.itemTotal}>
                      {formatPrice(itemTotal)}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* ORDER TYPE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Order type
          </Text>

          <View style={styles.orderTypeContainer}>
            <Pressable
              onPress={() => setOrderType("pickup")}
              style={[
                styles.orderTypeOption,
                orderType === "pickup" &&
                  styles.orderTypeSelected,
              ]}
            >
              <View
                style={[
                  styles.radio,
                  orderType === "pickup" &&
                    styles.radioSelected,
                ]}
              >
                {orderType === "pickup" && (
                  <View style={styles.radioDot} />
                )}
              </View>

              <View style={styles.orderTypeText}>
                <Text style={styles.orderTypeTitle}>
                  Pickup
                </Text>
                <Text style={styles.orderTypeSubtitle}>
                  Pick up when your order is ready
                </Text>
              </View>
            </Pressable>

            <Pressable
              onPress={() => setOrderType("ahead")}
              style={[
                styles.orderTypeOption,
                orderType === "ahead" &&
                  styles.orderTypeSelected,
              ]}
            >
              <View
                style={[
                  styles.radio,
                  orderType === "ahead" &&
                    styles.radioSelected,
                ]}
              >
                {orderType === "ahead" && (
                  <View style={styles.radioDot} />
                )}
              </View>

              <View style={styles.orderTypeText}>
                <Text style={styles.orderTypeTitle}>
                  Order Ahead
                </Text>
                <Text style={styles.orderTypeSubtitle}>
                  Choose a pickup time
                </Text>
              </View>
            </Pressable>
          </View>
        </View>

        {/* PICKUP TIME */}
        {orderType === "ahead" && (
          <View style={styles.section}>
            <View style={styles.pickupHeader}>
              <View>
                <Text style={styles.sectionTitle}>
                  Pickup time
                </Text>

                <Text style={styles.pickupSubtitle}>
                  When would you like your order?
                </Text>
              </View>

              <Clock3
                size={20}
                color={COLORS.caramel}
                strokeWidth={2}
              />
            </View>

            <View style={styles.timeGrid}>
              {PICKUP_OPTIONS.map((option) => {
                const selected =
                  pickupTime === option.id;

                return (
                  <Pressable
                    key={option.id}
                    onPress={() =>
                      setPickupTime(option.id)
                    }
                    style={[
                      styles.timeOption,
                      selected && styles.timeSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.timeLabel,
                        selected &&
                          styles.timeLabelSelected,
                      ]}
                    >
                      {option.label}
                    </Text>

                    <Text
                      style={[
                        styles.timeSubtitle,
                        selected &&
                          styles.timeSubtitleSelected,
                      ]}
                    >
                      {option.subtitle}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        {/* ORDER SUMMARY */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>
            Order summary
          </Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Subtotal
            </Text>

            <Text style={styles.summaryValue}>
              {formatPrice(subtotal)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Service fee
            </Text>

            <Text style={styles.summaryValue}>
              {formatPrice(SERVICE_FEE)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <View>
              <Text style={styles.totalLabel}>
                Estimated total
              </Text>

              <Text style={styles.totalNote}>
                Final amount shown before payment
              </Text>
            </View>

            <Text style={styles.totalValue}>
              {formatPrice(estimatedTotal)}
            </Text>
          </View>
        </View>

        {/* CHECKOUT */}
        <Pressable
          onPress={handleCheckout}
          style={({ pressed }) => [
            styles.checkoutButton,
            pressed && styles.pressedButton,
          ]}
        >
          <Text style={styles.checkoutText}>
            Continue to Checkout
          </Text>

          <Text style={styles.checkoutPrice}>
            {formatPrice(estimatedTotal)}
          </Text>
        </Pressable>

        <Text style={styles.bottomNote}>
          No payment is processed yet. You will review your
          order before checkout.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },

  scrollContent: {
    paddingHorizontal: SCREEN.horizontalPadding,
    paddingTop: 18,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  headerText: {
    flex: 1,
    marginLeft: 14,
  },

  title: {
    ...TYPOGRAPHY.screenTitle,
    color: COLORS.text,
  },

  cafeLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.caramel,
    marginTop: 2,
  },

  headerSpacer: {
    width: 42,
  },

  iconButton: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.warmWhite,
    alignItems: "center",
    justifyContent: "center",
  },

  pressed: {
    opacity: 0.65,
  },

  pressedButton: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },

  cafeNotice: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.beige,
    borderRadius: RADIUS.lg,
    padding: 14,
    marginBottom: 28,
  },

  noticeIcon: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.warmWhite,
    alignItems: "center",
    justifyContent: "center",
  },

  noticeContent: {
    flex: 1,
    marginLeft: 12,
  },

  noticeTitle: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.espresso,
  },

  noticeText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  section: {
    marginBottom: 28,
  },

  sectionTitle: {
    ...TYPOGRAPHY.sectionTitle,
    color: COLORS.text,
    marginBottom: 14,
  },

  cartCard: {
    flexDirection: "row",
    backgroundColor: COLORS.warmWhite,
    borderRadius: RADIUS.xl,
    padding: 12,
    marginBottom: 12,
  },

  productImage: {
    width: 88,
    height: 108,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.beige,
  },

  productContent: {
    flex: 1,
    marginLeft: 13,
    justifyContent: "space-between",
  },

  productTopRow: {
    flexDirection: "row",
  },

  productInfo: {
    flex: 1,
    paddingRight: 8,
  },

  productName: {
    ...TYPOGRAPHY.productName,
    color: COLORS.text,
  },

  customization: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 5,
    lineHeight: 17,
  },

  deleteButton: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  productBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
  },

  itemPrice: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    flex: 1,
  },

  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cream,
    borderRadius: RADIUS.round,
    padding: 3,
  },

  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.warmWhite,
    alignItems: "center",
    justifyContent: "center",
  },

  quantityPressed: {
    backgroundColor: COLORS.beige,
  },

  quantityText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.text,
    minWidth: 28,
    textAlign: "center",
  },

  itemTotal: {
    ...TYPOGRAPHY.price,
    color: COLORS.espresso,
    marginLeft: 10,
  },

  orderTypeContainer: {
    backgroundColor: COLORS.warmWhite,
    borderRadius: RADIUS.xl,
    padding: 8,
  },

  orderTypeOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: RADIUS.lg,
  },

  orderTypeSelected: {
    backgroundColor: COLORS.beige,
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: RADIUS.round,
    borderWidth: 1.5,
    borderColor: COLORS.beigeDark,
    alignItems: "center",
    justifyContent: "center",
  },

  radioSelected: {
    borderColor: COLORS.espresso,
  },

  radioDot: {
    width: 10,
    height: 10,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.espresso,
  },

  orderTypeText: {
    flex: 1,
    marginLeft: 12,
  },

  orderTypeTitle: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.text,
  },

  orderTypeSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  pickupHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  pickupSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: -8,
  },

  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  timeOption: {
    width: "31.8%",
    minHeight: 72,
    backgroundColor: COLORS.warmWhite,
    borderRadius: RADIUS.lg,
    padding: 10,
    justifyContent: "center",
  },

  timeSelected: {
    backgroundColor: COLORS.espresso,
  },

  timeLabel: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.text,
  },

  timeLabelSelected: {
    color: COLORS.warmWhite,
  },

  timeSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
    marginTop: 3,
  },

  timeSubtitleSelected: {
    color: COLORS.beige,
  },

  summaryCard: {
    backgroundColor: COLORS.warmWhite,
    borderRadius: RADIUS.xl,
    padding: 20,
    marginBottom: 18,
  },

  summaryTitle: {
    ...TYPOGRAPHY.sectionTitle,
    color: COLORS.text,
    marginBottom: 18,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  summaryLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },

  summaryValue: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.text,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 6,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  totalLabel: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.text,
  },

  totalNote: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
    marginTop: 2,
  },

  totalValue: {
    ...TYPOGRAPHY.price,
    fontSize: 20,
    color: COLORS.espresso,
  },

  checkoutButton: {
    minHeight: 58,
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.espresso,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  checkoutText: {
    ...TYPOGRAPHY.button,
    color: COLORS.warmWhite,
  },

  checkoutPrice: {
    ...TYPOGRAPHY.price,
    color: COLORS.warmWhite,
  },

  bottomNote: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
    textAlign: "center",
    marginTop: 12,
    paddingHorizontal: 20,
  },

  emptyContainer: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },

  emptyTopBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SCREEN.horizontalPadding,
    paddingTop: 18,
  },

  emptyHeaderTitle: {
    ...TYPOGRAPHY.sectionTitle,
    color: COLORS.text,
  },

  emptyContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 36,
    paddingBottom: 80,
  },

  emptyIcon: {
    width: 94,
    height: 94,
    borderRadius: 34,
    backgroundColor: COLORS.beige,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },

  emptyTitle: {
    ...TYPOGRAPHY.screenTitle,
    color: COLORS.text,
    textAlign: "center",
    fontSize: 25,
  },

  emptyDescription: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 22,
    maxWidth: 290,
  },

  exploreButton: {
    minHeight: 54,
    backgroundColor: COLORS.espresso,
    borderRadius: RADIUS.xl,
    paddingHorizontal: 28,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 26,
  },

  exploreButtonText: {
    ...TYPOGRAPHY.button,
    color: COLORS.warmWhite,
  },
});