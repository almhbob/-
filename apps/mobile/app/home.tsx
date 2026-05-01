import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Card } from '../src/components/Card';
import { Button } from '../src/components/Button';
import { colors, zones } from '../src/constants/theme';

export default function Home() {
  const [pickup, setPickup] = useState('Market');
  const [destination, setDestination] = useState('Hospital');
  const fare = pickup === destination ? 1000 : 1200;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Where are you going?</Text>
      <Card style={styles.map}>
        <Text style={styles.mapText}>Rufaa Map</Text>
        <Text style={styles.pin}>{pickup} to {destination}</Text>
      </Card>
      <Text style={styles.label}>Pickup</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {zones.slice(0, 4).map((z) => (
          <Pressable key={z} onPress={() => setPickup(z)} style={[styles.chip, pickup === z && styles.chipActive]}>
            <Text style={[styles.chipText, pickup === z && styles.chipActiveText]}>{z}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <Text style={styles.label}>Destination</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {zones.slice(1, 6).map((z) => (
          <Pressable key={z} onPress={() => setDestination(z)} style={[styles.chip, destination === z && styles.chipActive]}>
            <Text style={[styles.chipText, destination === z && styles.chipActiveText]}>{z}</Text>
          </Pressable>
        ))}
      </ScrollView>
      <Card>
        <Text style={styles.estimate}>Estimated fare</Text>
        <Text style={styles.fare}>{fare} SDG</Text>
        <Text style={styles.note}>Includes base fare and estimated local distance.</Text>
      </Card>
      <Button title='Request rickshaw' onPress={() => router.push({ pathname: '/ride', params: { pickup, destination, fare } })} />
      <Button title='Trip history' variant='ghost' onPress={() => router.push('/trips')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 22, gap: 14, paddingTop: 60 },
  title: { fontSize: 30, fontWeight: '900', color: colors.navy },
  map: { height: 230, justifyContent: 'center', alignItems: 'center', backgroundColor: '#DDF3FA' },
  mapText: { fontSize: 28, fontWeight: '900', color: colors.teal },
  pin: { marginTop: 12, fontSize: 16, color: colors.navy, fontWeight: '800' },
  label: { color: colors.text, fontWeight: '800', fontSize: 16 },
  row: { flexDirection: 'row', gap: 10 },
  chip: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 999, backgroundColor: '#E7EEF5' },
  chipActive: { backgroundColor: colors.navy },
  chipText: { color: colors.navy, fontWeight: '800' },
  chipActiveText: { color: colors.white },
  estimate: { color: colors.muted, fontSize: 15 },
  fare: { color: colors.gold, fontSize: 36, fontWeight: '900' },
  note: { color: colors.muted, lineHeight: 24 }
});
