import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Login" }} />
      <Stack.Screen name="login.tsx" options={{ title: "LoginPage" }} />
      {/* ❌ Do NOT put tabs/dashboard here */}
    </Stack>
  );
}