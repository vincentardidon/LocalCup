import { Tabs } from "expo-router";

import {
  ClipboardList,
  Compass,
  Heart,
  Home,
  User,
} from "lucide-react-native";

import {
  COLORS,
  TYPOGRAPHY,
} from "../../constants/theme";

function TabIcon({
  Icon,
  color,
  focused,
}) {
  return (
    <Icon
      size={focused ? 22 : 21}
      color={color}
      strokeWidth={focused ? 2.5 : 2}
    />
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor:
          COLORS.espresso,

        tabBarInactiveTintColor:
          COLORS.textMuted,

        tabBarStyle: {
          height: 76,
          paddingTop: 8,
          paddingBottom: 10,
          paddingHorizontal: 8,

          backgroundColor:
            COLORS.warmWhite,

          borderTopWidth: 0,

          elevation: 0,

          shadowColor: COLORS.espresso,
          shadowOffset: {
            width: 0,
            height: -3,
          },
          shadowOpacity: 0.06,
          shadowRadius: 10,
        },

        tabBarLabelStyle: {
          fontFamily:
            TYPOGRAPHY.navigation.fontFamily,

          fontSize:
            TYPOGRAPHY.navigation.fontSize,

          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",

          tabBarIcon: ({
            color,
            focused,
          }) => (
            <TabIcon
              Icon={Home}
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",

          tabBarIcon: ({
            color,
            focused,
          }) => (
            <TabIcon
              Icon={Compass}
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",

          tabBarIcon: ({
            color,
            focused,
          }) => (
            <TabIcon
              Icon={ClipboardList}
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",

          tabBarIcon: ({
            color,
            focused,
          }) => (
            <TabIcon
              Icon={Heart}
              color={color}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",

          tabBarIcon: ({
            color,
            focused,
          }) => (
            <TabIcon
              Icon={User}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}