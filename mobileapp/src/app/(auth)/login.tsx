import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginForm } from '@/components/forms/LoginForm';
import { Text } from '@/components/ui/Text';

export default function LoginScreen() {
  const [mode, setMode] = useState<'password' | 'code'>('password');

  return <SafeAreaView className="flex-1 bg-[#fbf3f1]">
    <View className="min-h-full px-6 pb-10 pt-6">
      <Link href="/" asChild><Pressable className="-ml-2 self-start rounded-full p-2"><Text className="text-xl text-stone-800">←</Text></Pressable></Link>

      <View className="mt-4 flex-row items-center gap-2.5">
        <View className="h-11 w-11 items-center justify-center rounded-full bg-rose-400 shadow-lg"><Text className="text-xl font-semibold text-white">P</Text></View>
        <View><Text className="text-base font-semibold tracking-[3px] text-stone-900">PERLEDESLYS</Text><Text className="text-[9px] uppercase tracking-[2.5px] text-rose-500">Espace privé</Text></View>
      </View>

      <View className="mt-8">
        <Text className="text-[42px] leading-[48px] text-stone-900">Bon retour{`\n`}<Text className="italic text-rose-500">parmi nous.</Text></Text>
        <Text className="mt-3 text-sm text-stone-500">Retrouvez vos recettes, lives et tutoriels TM7 exclusifs.</Text>
      </View>

      <LoginForm mode={mode} onModeChange={setMode} />

      <View className="mt-auto pt-8"><Text className="text-center text-xs text-stone-500">Vous êtes cliente Thermomix et n'avez pas encore d'accès ?</Text><Pressable><Text className="mt-1 text-center text-xs font-semibold text-rose-500">Demander une invitation à Lys</Text></Pressable></View>
    </View>
  </SafeAreaView>;
}
