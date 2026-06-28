import { Tabs } from 'expo-router';
import { Text as RNText } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '@/hooks/use-auth';
import { useTheme } from '@/hooks/use-theme';
export default function TabsLayout() { const { isAuthenticated } = useAuth(); const { colors } = useTheme(); if (!isAuthenticated) return <Redirect href="/(auth)/login" />; return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.primary, tabBarInactiveTintColor: colors.textSecondary, tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border, height: 82, paddingBottom: 12 } }}><Tabs.Screen name="index" options={{ title: 'Accueil', tabBarIcon: ({ color }) => <Icon label="⌂" color={String(color)} /> }} /><Tabs.Screen name="content" options={{ title: 'Explorer', tabBarIcon: ({ color }) => <Icon label="◇" color={String(color)} /> }} /><Tabs.Screen name="favorites" options={{ title: 'Favoris', tabBarIcon: ({ color }) => <Icon label="♡" color={String(color)} /> }} /><Tabs.Screen name="profile" options={{ title: 'Profil', tabBarIcon: ({ color }) => <Icon label="◌" color={String(color)} /> }} /></Tabs>; }
function Icon({ label, color }: { label: string; color: string }) { return <RNText style={{ color, fontSize: 20 }}>{label}</RNText>; }
