import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../src/components/Button';
import { colors } from '../src/constants/theme';

export default function Welcome() {
  return (
    <LinearGradient colors={[colors.navy, colors.teal]} style={styles.screen}>
      <View style={styles.logo}>
        <Text style={styles.icon}>J</Text>
      </View>
      <Text style={styles.title}>JUMBAK</Text>
      <Text style={styles.tagline}>Rickshaw near you</Text>
      <Text style={styles.copy}>Fast local rides in Rufaa with clear fares and trusted drivers.</Text>
      <Button title='Start ride' variant='gold' onPress={() => router.push('/home')} />
      <Button title='Driver mode' variant='ghost' onPress={() => router.push('/driver')} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, justifyContent: 'center', gap: 18 },
  logo: { width: 120, height: 120, borderRadius: 36, backgroundColor: 'rgba(255,255,255,.14)', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 62, color: colors.gold, fontWeight: '900' },
  title: { color: colors.white, fontSize: 44, fontWeight: '900', letterSpacing: 3, textAlign: 'center' },
  tagline: { color: colors.gold, fontSize: 17, fontWeight: '800', textAlign: 'center', textTransform: 'uppercase' },
  copy: { color: 'rgba(255,255,255,.88)', fontSize: 18, lineHeight: 30, textAlign: 'center', marginBottom: 16 }
});
