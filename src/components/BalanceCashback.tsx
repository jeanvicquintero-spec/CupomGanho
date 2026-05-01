import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../styles/theme';

interface BalanceCashbackProps {
  stats: any;
}

const BalanceCashback: React.FC<BalanceCashbackProps> = ({ stats }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerBalance}>
          <Text style={styles.balanceLabel}>Seu Cashback Disponível</Text>
          <TouchableOpacity>
            <Icon name="information" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        <Text style={styles.balanceAmount}>
          R$ {(stats?.disponivel || 0).toFixed(2)}
        </Text>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Icon name="ticket-percent" size={20} color={COLORS.secondary} />
            <Text style={styles.statValue}>{stats?.cuponsUsados || 0}</Text>
            <Text style={styles.statLabel}>Cupons Usados</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.statItem}>
            <Icon name="cash-multiple" size={20} color={COLORS.primary} />
            <Text style={styles.statValue}>R$ {(stats?.economizado || 0).toFixed(2)}</Text>
            <Text style={styles.statLabel}>Economizado</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.withdrawButton}>
          <Icon name="bank-transfer" size={18} color="#fff" />
          <Text style={styles.withdrawButtonText}>Sacar Agora</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    ...SHADOWS.medium,
  },
  headerBalance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  balanceLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.lg,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.lg,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: SPACING.xs,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  divider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  withdrawButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.medium,
    paddingVertical: SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  withdrawButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: SPACING.sm,
  },
});

export default BalanceCashback;
