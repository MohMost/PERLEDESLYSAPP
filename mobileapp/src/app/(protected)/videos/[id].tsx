import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Screen } from '@/components/ui/Screen';
import { Text } from '@/components/ui/Text';
import { videos, welcomeMessage } from '@/lib/perle-data';
import { HeroImage, perle } from '@/components/perle/PerleUI';
import { Spacing } from '@/constants/theme';
export default function VideoDetail(){const {id}=useLocalSearchParams<{id:string}>();const video=videos.find(v=>v.id===id)??videos[0];return <Screen scroll contentContainerStyle={styles.content}><HeroImage image={video.image} height={240}><View style={styles.play}><Text style={{fontSize:34}}>▶</Text></View></HeroImage><Text variant="hero">{video.title}</Text><Text>{video.category} · {video.duration}</Text>{video.progress?<View style={styles.progress}><View style={[styles.fill,{width:`${video.progress}%`}]}/></View>:null}<Text>{video.description}</Text><View style={styles.note}><Text variant="title">Mot de Lys</Text><Text>{welcomeMessage.body}</Text></View></Screen>}
const styles=StyleSheet.create({content:{gap:Spacing.four,paddingBottom:40},play:{flex:1,alignItems:'center',justifyContent:'center'},progress:{height:8,backgroundColor:'#ead8dc',borderRadius:99},fill:{height:8,backgroundColor:perle.primary,borderRadius:99},note:{backgroundColor:perle.card,borderRadius:24,padding:16,gap:10}})
