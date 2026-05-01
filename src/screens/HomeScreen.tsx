import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SHADOWS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../styles/theme';
import BalanceCashback from '../components/BalanceCashback';
import LojaCard from '../components/LojaCard';
import { getCouponStats, getTopLojas } from '../services/api';

const HomeScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [topLojas, setTopLojas] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const mockStats = {
        disponivel: 125.50,
        cuponsUsados: 23,
        economizado: 456.80,
      };

      const mockLojas = [
        {
          id: 1,
          nome: 'Supermercado XYZ',
          categoria: 'Supermercado',
          logo: 'https://via.placeholder.com/80',
          desconto: 20,
          avaliacao: 4.5,
          distancia: 0.5,
          cashback: 5,
          promocao: 'Aproveite 20% em compras acima de R$ 100',
        },
        {
          id: 2,
          nome: 'Farmácia Central',
          categoria: 'Farmácia',
          logo: 'https://via.placeholder.com/80',
          desconto: 15,
          avaliacao: 4.8,
          distancia: 1.2,
          cashback: 8,
          promocao: 'Cashback de 8% em remédios',
        },
        {
          id: 3,
          nome: 'Restaurante Delicia',
          categoria: 'Alimentação',
          logo: 'https://via.placeholder.com/80',
          desconto: 25,
          avaliacao: 4.6,
          distancia: 0.8,
          cashback: 10,
          promocao: 'Desconto especial no happy hour',
        },
      ];

      setStats(mockStats);
      setTopLojas(mockLojas);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadData().finally(() => setRefreshing(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.headerSection}>
        <Text style={styles.greeting}>Bem-vindo! 👋</Text>
        <Text style={styles.subtitle}>Encontre cupons e ganhe cashback</Text>
      </View>

      {stats && <BalanceCashback stats={stats} />}

      <View style={styles.quickActionsSection}>
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>
        <View style={styles.quickActionsRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Cupons')}
          >
            <Icon name="ticket-multiple" size={28} color={COLORS.primary} />
            <Text style={styles.actionButtonText}>Cupons</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Cashback')}
          >
            <Icon name="cash-multiple" size={28} color={COLORS.secondary} />
            <Text style={styles.actionButtonText}>Cashback</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Icon name="map-marker" size={28} color={COLORS.accent} />
            <Text style={styles.actionButtonText}>Locais</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Icon name="gift" size={28} color="#9333EA" />
            <Text style={styles.actionButtonText}>Referência</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.topLojasSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>🔥 Ofertas em Destaque</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cupons')}>
            <Text style={styles.seeAll}>Ver todas</Text>
          </TouchableOpacity>
        </View>

        {topLojas.map((loja) => (
          <LojaCard
            key={loja.id}
            loja={loja}
            onPress={() => navigation.navigate('LojaDetails', { lojaId: loja.id })}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.promoBanner}>
        <Icon name="gift" size={32} color="#fff" style={{ marginRight: SPACING.md }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.promoBannerTitle}>Convide amigos e ganhe</Text>
          <Text style={styles.promoBannerText}>Ambos recebem R$ 10 de bônus</Text>
        </View>
        <Icon name="chevron-right" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={{ height: SPACING.xl }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    marginTop: SPACING.md,
    color: COLORS.textSecondary,
  },
  headerSection: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  quickActionsSection: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  quickActionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '23%',
    marginBottom: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.medium,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  actionButtonText: {
    marginTop: SPACING.xs,
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.text,
    textAlign: 'center',
  },
  topLojasSection: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  seeAll: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  promoBanner: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.xl,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.medium,
    alignItems: 'center',
  },
  promoBannerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  promoBannerText: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
  },
});

export default HomeScreen;
