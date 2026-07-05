import { StyleSheet, View } from 'react-native';
import { Screen } from '@/components/ui/Screen';
import { Text } from '@/components/ui/Text';
import { events, faqItems, user } from '@/lib/perle-data';
import { ArticleCard, Section, perle } from '@/components/perle/PerleUI';
import { Spacing } from '@/constants/theme';
export default function ProfileScreen(){return <Screen scroll contentContainerStyle={styles.content}><View style={styles.profile}><Text style={styles.avatar}>👩🏻‍🍳</Text><View><Text variant="title">{user.name}</Text><Text>{user.email}</Text></View></View><Section title="Historique récent">{events.slice(0,3).map(e=><ArticleCard key={e.id} article={{id:e.id,title:e.title,excerpt:e.description??'À retrouver dans votre calendrier privé.',category:e.type,readTime:e.time,image:''}} />)}</Section><Section title="FAQ">{faqItems.map(f=><View key={f.q} style={styles.faq}><Text variant="subtitle">{f.q}</Text><Text>{f.a}</Text></View>)}</Section></Screen>}
const styles=StyleSheet.create({content:{gap:Spacing.five,paddingBottom:110},profile:{flexDirection:'row',alignItems:'center',gap:16,backgroundColor:perle.card,padding:16,borderRadius:28},avatar:{fontSize:44},faq:{backgroundColor:perle.card,borderColor:perle.border,borderWidth:1,borderRadius:18,padding:14,gap:6}});
