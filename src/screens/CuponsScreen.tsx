import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../styles/theme';
import LojaCard from '../components/LojaCard';

const CuponsScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cupons, setCupons] = useState<any[]>([]);
  const [filteredCupons, setFilteredCupons] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  useEffect(() => {
    loadCupons();
  }, []);

  useEffect(() => {
    filterCupons();
  }, [searchQuery, selectedCategory, cupons]);

  const loadCupons = async () => {
    try {
      setLoading(true);
      const mockCupons = [
        {
          id: 1,
          nome: 'Supermercado XYZ',
          categoria: 'Supermercado',
          desconto: 20,
          avaliacao: 4.5,
          distancia: 0.5,
          cashback: 5,
          promocao: 'Aproveite 20% em compras acima de R$ 100',
          logo: 'https://via.placeholder.com/80',
        },
        {
          id: 2,
          nome: 'Farmácia Central',
          categoria: 'Farmácia',
          desconto: 15,
          avaliacao: 4.8,
          distancia: 1.2,
          cashback: 8,
          promocao: 'Cashback de 8% em remédios',
          logo: 'https://via.placeholder.com/80',
        },
        {
          id: 3,
          nome: 'Restaurante Delicia',
          categoria: 'Alimentação',
          desconto: 25,
          avaliacao: 4.6,
          distancia: 0.8,
          cashback: 10,
          promocao: 'Desconto especial no happy hour',
          logo: 'https://via.placeholder.com/80',
        },
        {
          id: 4,
          nome: 'Loja de Roupas Fashion',
          categoria: 'Roupas',
          desconto: 30,
          avaliacao: 4.3,
          distancia: 2.1,
          cashback: 12,
          promocao: 'Black Friday até 30% OFF',
          logo: 'https://via.placeholder.com/80',
        },
      ];

      setCupons(mockCupons);
      setFilteredCupons(mockCupons);
    } catch (error) {
      console.error('Erro ao carregar cupons:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCupons = () => {
    let filtered = cupons;

    if (selectedCategory !== 'Todos') {
      filtered = filtered.filter((c) => c.categoria === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter((c) =>
        c.nome.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCupons(filtered);
  };

  const categories = ['Todos', 'Supermercado', 'Farmácia', 'Alimentação', 'Roupas'];

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon
          name="magnify"
          size={20}
          color={COLORS.textSecondary}
          style={{ marginRight: SPACING.sm }}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar cupons..."
          placeholderTextColor={COLORS.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="close" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={{ paddingHorizontal: SPACING.md }}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.categoryButtonTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : filteredCupons.length > 0 ? (
        <ScrollView
          style={styles.cuponsList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: SPACING.md, paddingBottom: SPACING.xl }}
        >
          {filteredCupons.map((cupom) => (
            <LojaCard
              key={cupom.id}
              loja={cupom}
              onPress={() => navigation.navigate('LojaDetails', { lojaId: cupom.id })}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="magnify" size={48} color={COLORS.gray} />
          <Text style={styles.emptyText}>Nenhum cupom encontrado</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.medium,
    paddingHorizontal: SPACING.md,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.md,
    height: 48,
    ...SHADOWS.small,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: SPACING.sm,
    color: COLORS.text,
    fontSize: 16,
  },
  categoriesContainer: {
    height: 50,
    marginBottom: SPACING.md,
  },
  categoryButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginRight: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.large,
    ...SHADOWS.small,
  },
  categoryButtonActive: {
    backgroundColor: COLORS.primary,
  },
  categoryButtonText: {
    color: COLORS.text,
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  cuponsList: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: SPACING.md,
    color: COLORS.textSecondary,
    fontSize: 16,
  },
});

export default CuponsScreen;
