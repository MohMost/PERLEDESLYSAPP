import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, Switch, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Text } from '@/components/ui/Text';
import { accessCodeSchema, loginSchema, type AccessCodeFormValues, type LoginFormValues } from '@/schemas/auth.schema';
import { authStore } from '@/store/auth.store';
import { getErrorMessage } from '@/utils/api-error';

type LoginMode = 'password' | 'code';

type Props = { mode: LoginMode; onModeChange: (mode: LoginMode) => void };

function Field({ label, error, icon, children }: { label: string; error?: string; icon: string; children: React.ReactNode }) {
  return <View className="gap-1.5"><Text className="text-[10px] font-bold uppercase tracking-[2px] text-stone-500">{label}</Text><View className="relative"><Text className="absolute left-4 top-3.5 z-10 text-base text-stone-400">{icon}</Text>{children}</View>{error ? <Text className="text-xs text-red-700">{error}</Text> : null}</View>;
}

export function LoginForm({ mode, onModeChange }: Props) {
  const passwordForm = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema), defaultValues: { email: 'premium@perledelys.app', password: 'password', remember: true } });
  const codeForm = useForm<AccessCodeFormValues>({ resolver: zodResolver(accessCodeSchema), defaultValues: { email: 'premium@perledelys.app', accessCode: 'LYS-PRIVE-2026', remember: true } });
  const activeForm = mode === 'password' ? passwordForm : codeForm;
  const apiError = activeForm.formState.errors.root?.message;

  const onPasswordSubmit = passwordForm.handleSubmit(async (values) => {
    try { await authStore.login(values); router.replace('/(tabs)'); } catch (error) { passwordForm.setError('root', { message: getErrorMessage(error) }); }
  });
  const onCodeSubmit = codeForm.handleSubmit(async (values) => {
    try { await authStore.loginWithAccessCode(values); router.replace('/(tabs)'); } catch (error) { codeForm.setError('root', { message: getErrorMessage(error) }); }
  });

  return <View className="mt-6 gap-4">
    <View className="grid grid-cols-2 flex-row gap-2 rounded-2xl bg-rose-100/70 p-1">
      <Pressable onPress={() => onModeChange('password')} className={`flex-1 rounded-xl py-3 ${mode === 'password' ? 'bg-white shadow' : ''}`}><Text className={`text-center text-xs font-semibold ${mode === 'password' ? 'text-stone-900' : 'text-stone-500'}`}>Identifiants</Text></Pressable>
      <Pressable onPress={() => onModeChange('code')} className={`flex-1 rounded-xl py-3 ${mode === 'code' ? 'bg-white shadow' : ''}`}><Text className={`text-center text-xs font-semibold ${mode === 'code' ? 'text-stone-900' : 'text-stone-500'}`}>Code d'invitation</Text></Pressable>
    </View>

    <Controller control={activeForm.control as never} name="email" render={({ field: { onChange, value } }) => <Field label="Email" icon="✉️" error={activeForm.formState.errors.email?.message}><TextInput value={value} onChangeText={onChange} autoCapitalize="none" keyboardType="email-address" className="rounded-2xl border border-rose-100 bg-white py-3.5 pl-11 pr-4 text-sm text-stone-900" /></Field>} />
    {mode === 'password' ? <Controller control={passwordForm.control} name="password" render={({ field: { onChange, value } }) => <Field label="Mot de passe" icon="🔒" error={passwordForm.formState.errors.password?.message}><TextInput value={value} onChangeText={onChange} secureTextEntry className="rounded-2xl border border-rose-100 bg-white py-3.5 pl-11 pr-4 text-sm text-stone-900" /></Field>} /> : <Controller control={codeForm.control} name="accessCode" render={({ field: { onChange, value } }) => <Field label="Code d'invitation privée" icon="🗝️" error={codeForm.formState.errors.accessCode?.message}><TextInput value={value} onChangeText={onChange} autoCapitalize="characters" className="rounded-2xl border border-rose-100 bg-white py-3.5 pl-11 pr-4 text-sm font-semibold tracking-widest text-stone-900" /></Field>} />}
    {mode === 'password' ? <View className="items-end"><Pressable onPress={() => router.push('/(auth)/forgot-password')}><Text className="text-xs font-semibold text-rose-500">Mot de passe oublié ?</Text></Pressable></View> : <Text className="text-[11px] text-stone-500">Le code unique que Lys vous a transmis personnellement.</Text>}
    <Controller control={activeForm.control as never} name="remember" render={({ field: { onChange, value } }) => <View className="flex-row items-center justify-between"><Text className="text-sm text-stone-700">Se souvenir de moi</Text><Switch value={value} onValueChange={onChange} /></View>} />
    {apiError ? <Text className="text-sm text-red-700">{apiError}</Text> : null}
    <Pressable disabled={activeForm.formState.isSubmitting} onPress={mode === 'password' ? onPasswordSubmit : onCodeSubmit} className="mt-1 flex-row items-center justify-center gap-2 rounded-2xl bg-rose-400 py-4 shadow-lg"><Text className="font-semibold text-white">Entrer dans mon espace</Text><Text className="text-white">→</Text></Pressable>
  </View>;
}
