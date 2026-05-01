import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../styles/theme';

const CashbackScreen = () => {
  const [cashbackHistory, setCashbackHistory] = useState<any[]>([]);
  const [totalCashback, setTotalCashback] = useState(0);

  useEffect(() => {
    loadCashbackHistory();
  }, []);

  const loadCashbackHistory = () => {
    const mockHistory = [
      {
        id: 1,
        loja: 'Supermercado XYZ',
        valor: 25.50,
        data: '2024-05-01',
        status: 'Aprovado',
      },
      {
        id: 2,
        loja: 'Farmácia Central',
        valor: 12.75,
        data: '2024-04-28',
        status: 'Aprovado',
      },
      {
        id: 3,
        loja: 'Restaurante Delicia',
        valor: 45.00,
        data: '2024-04-25',
        status: 'Pendente',
      },
      {
        id: 4,
        loja: 'Loja Fashion',
        valor: 82.30,
        data: '2024-04-20',
        status: 'Aprovado',
      },
    ];

    setCashbackHistory(mockHistory);
    const total = mockHistory.reduce((acc, item) => acc + item.valor, 0);
    setTotalCashback(total);
  };

  const renderCashbackItem = ({ item }: any) => (
    <View style={styles.cashbackItem}>
      <View style={styles.cashbackItemLeft}>
        <View
          style={[
            styles.cashbackIcon,
            { backgroundColor: item.status === 'Aprovado' ? COLORS.lightGreen : '#FEF3C7' },
          ]}
        >
          <Icon
            name={item.status === 'Aprovado' ? 'check-circle' : 'clock-outline'}
            size={24}
            color={item.status === 'Aprovado' ? COLORS.success : COLORS.warning}
          />
        </View>
        <View style={styles.cashbackInfo}>
          <Text style={styles.cashbackLoja}>{item.loja}</Text>
          <Text style={styles.cashbackData}>{item.data}</Text>
        </View>
      </View>
      <View style={styles.cashbackItemRight}>
        <Text style={styles.cashbackValue}>+ R$ {item.valor.toFixed(2)}</Text>
        <Text
          style={[
            styles.cashbackStatus,
            { color: item.status === 'Aprovado' ? COLORS.success : COLORS.warning },
          ]}
        >
          {item.status}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerCard}>
          <View>
            <Text style={styles.headerLabel}>Cashback Total</Text>
            <Text style={styles.headerValue}>R$ {totalCashback.toFixed(2)}</Text>
            <Text style={styles.headerSubtitle}>Acumulado neste mês</Text>
          </View>
          <View style={styles.headerIcon}>
            <Icon name="cash-multiple" size={48} color={COLORS.primary} />
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Icon name="check-circle" size={24} color={COLORS.success} />
          <Text style={styles.statValue}>Aprovado</Text>
          <Text style={styles.statAmount}>
            R$ {(totalCashback * 0.8).toFixed(2)}
          </Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="clock-outline" size={24} color={COLORS.warning} />
          <Text style={styles.statValue}>Pendente</Text>
          <Text style={styles.statAmount}>
            R$ {(totalCashback * 0.2).toFixed(2)}
          </Text>
        </View>
      </View>

      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Histórico de Cashback</Text>
        <FlatList
          data={cashbackHistory}
          renderItem={renderCashbackItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          contentContainerStyle={{ paddingHorizontal: SPACING.md }}
        />
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.withdrawButton}>
          <Icon name="bank-transfer" size={20} color="#fff" />
          <Text style={styles.withdrawButtonText}>Sacar Agora</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
  },
  headerCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    justifyContent: 'space-between',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  headerLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  headerValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  headerIcon: {
    opacity: 0.3,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.md,
    marginRight: SPACING.md,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  statValue: {
    marginTop: SPACING.sm,
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  statAmount: {
    marginTop: SPACING.xs,
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  historyContainer: {
    flex: 1,
    paddingVertical: SPACING.md,
  },
  historyTitle: {
    paddingHorizontal: SPACING.md,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  cashbackItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    justifyContent: 'space-between',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  cashbackItemLeft: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  cashbackIcon: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.medium,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  cashbackInfo: {
    flex: 1,
  },
  cashbackLoja: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  cashbackData: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  cashbackItemRight: {
    alignItems: 'flex-end',
  },
  cashbackValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  cashbackStatus: {
    fontSize: 11,
    marginTop: SPACING.xs,
    fontWeight: '500',
  },
  footerContainer: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.lg,
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
    fontSize: 16,
  },
});

export default CashbackScreen;
