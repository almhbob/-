import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Card } from '../src/components/Card';
import { Button } from '../src/components/Button';
import { colors } from '../src/constants/theme';

export default function Rating() {
  const [value, setValue] = useState(5);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Completed</Text>
      <Card style={styles.card}>
        <Text style={styles.question}>Rate ride</Text>
        <Text style={styles.score}>{value} / 5</Text>
        <View style={styles.row}>
          {[1, 2, 3, 4, 5].map((n) => (
            <Button key={n} title={`${n}`} variant={n === value ? 'gold' : 'ghost'} onPress={() => setValue(n)} />
          ))}
        </View>
      </Card>
      <Button title='Home' onPress={() => router.replace('/home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 22, paddingTop: 80, gap: 16, backgroundColor: colors.bg },
  title: { textAlign: 'center', color: colors.navy, fontSize: 30, fontWeight: '900' },
  card: { alignItems: 'center', gap: 18 },
  question: { color: colors.text, fontSize: 20, fontWeight: '900' },
  score: { color: colors.gold, fontSize: 42, fontWeight: '900' },
  row: { flexDirection: 'row', gap: 8 }
});
