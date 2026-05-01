import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Card } from '../src/components/Card';
import { colors } from '../src/constants/theme';

const data = [
  { id: 'one', start: 'Market', end: 'Hospital', price: '1200 SDG' },
  { id: 'two', start: 'Station', end: 'Residential', price: '1500 SDG' }
];

export default function Trips() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Trips</Text>
      {data.map((item) => (
        <Card key={item.id}>
          <Text style={styles.route}>{item.start} - {item.end}</Text>
          <Text style={styles.meta}>{item.price}</Text>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 22, paddingTop: 60, gap: 14 },
  title: { fontSize: 30, fontWeight: '900', color: colors.navy },
  route: { color: colors.text, fontSize: 20, fontWeight: '900' },
  meta: { color: colors.muted, marginTop: 8 }
});
