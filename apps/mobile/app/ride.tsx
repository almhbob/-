import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Card } from '../src/components/Card';
import { Button } from '../src/components/Button';
import { colors } from '../src/constants/theme';
import { drivers } from '../src/data/mock';

const rideStates = ['Searching for driver', 'Driver accepted', 'Driver is arriving', 'Trip started'];

export default function Ride() {
  const params = useLocalSearchParams<{ pickup: string; destination: string; fare: string }>();
  const [step, setStep] = useState(0);
  const driver = drivers[0];

  useEffect(() => {
    const timer = setInterval(() => setStep((value) => Math.min(value + 1, rideStates.length - 1)), 1600);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{rideStates[step]}</Text>
      <Card style={styles.map}>
        <Text style={styles.icon}>{step < 1 ? '...' : 'J'}</Text>
        <Text style={styles.route}>{params.pickup} to {params.destination}</Text>
      </Card>
      {step >= 1 && (
        <Card>
          <Text style={styles.section}>Driver</Text>
          <Text style={styles.driver}>{driver.name}</Text>
          <Text style={styles.muted}>{driver.vehicle} - rating {driver.rating} - arrival {driver.eta}</Text>
        </Card>
      )}
      <Card>
        <Text style={styles.section}>Fare</Text>
        <Text style={styles.fare}>{params.fare} SDG</Text>
      </Card>
      {step < 3 ? (
        <Button title='Cancel ride' variant='ghost' onPress={() => router.back()} />
      ) : (
        <Button title='Complete and rate' variant='gold' onPress={() => router.push('/rating')} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 22, paddingTop: 60, gap: 16, backgroundColor: colors.bg },
  title: { fontSize: 28, fontWeight: '900', color: colors.navy },
  map: { height: 260, alignItems: 'center', justifyContent: 'center', backgroundColor: '#DDF3FA' },
  icon: { fontSize: 76, color: colors.gold, fontWeight: '900' },
  route: { color: colors.navy, marginTop: 12, fontWeight: '900', fontSize: 18 },
  section: { color: colors.muted, fontSize: 14, fontWeight: '800' },
  driver: { color: colors.text, fontSize: 24, fontWeight: '900' },
  muted: { color: colors.muted, marginTop: 6 },
  fare: { color: colors.gold, fontSize: 32, fontWeight: '900' }
});
