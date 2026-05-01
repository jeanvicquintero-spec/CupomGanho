import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../styles/theme';

const LojaDetailsScreen = ({ route }: any) => {
  const { lojaId } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  const lojaDetails = {
    id: lojaId,
    nome: 'Supermercado XYZ',
    categoria: 'Supermercado',
    logo: 'https://via.placeholder.com/200',
    desconto: 20,
    avaliacao: 4.5,
    reviews: 234,
    distancia: 0.5,
    cashback: 5,
    promocao: 'Aproveite 20% em compras acima de R$ 100',
    endereco: 'Rua Principal, 123 - São Paulo, SP',
    horario: 'Seg-Dom: 08:00 - 22:00',
    telefone: '+55 85986380362',
    descricao:
      'Maior rede de supermercados da região com produtos de qualidade e preços competitivos.',
    cupons: [
      { id: 1, title: '20% OFF em compras acima de R$ 100', validade: '2024-12-31' },
      { id: 2, title: 'Cashback de 5%', validade: '2024-12-31' },
      { id: 3, title: 'Compre 2 e pague 1 em produtos selecionados', validade: '2024-11-30' },
    ],
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerImage}>
        <Image
          source={{ uri: lojaDetails.logo }}
          style={styles.logo}
        />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <Icon
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? COLORS.error : '#fff'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.headerInfo}>
          <View>
            <Text style={styles.lojaName}>{lojaDetails.nome}</Text>
            <Text style={styles.categoria}>{lojaDetails.categoria}</Text>
          </View>
          <View style={styles.ratingBadge}>
            <Icon name="star" size={16} color={COLORS.secondary} />
            <Text style={styles.rating}>{lojaDetails.avaliacao}</Text>
            <Text style={styles.reviews}>({lojaDetails.reviews})</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Icon name="percent" size={24} color={COLORS.primary} />
            <Text style={styles.statValue}>{lojaDetails.desconto}%</Text>
            <Text style={styles.statLabel}>Desconto</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="cash-multiple" size={24} color={COLORS.secondary} />
            <Text style={styles.statValue}>{lojaDetails.cashback}%</Text>
            <Text style={styles.statLabel}>Cashback</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="map-marker" size={24} color={COLORS.accent} />
            <Text style={styles.statValue}>{lojaDetails.distancia}</Text>
            <Text style={styles.statLabel}>km</Text>
          </View>
        </View>

        <Text style={styles.descricao}>{lojaDetails.descricao}</Text>
      </View>

      <View style={styles.contactSection}>
        <Text style={styles.sectionTitle}>Informações de Contato</Text>

        <TouchableOpacity style={styles.contactCard}>
          <Icon name="map-marker" size={24} color={COLORS.primary} />
          <View style={styles.contactContent}>
            <Text style={styles.contactLabel}>Endereço</Text>
            <Text style={styles.contactValue}>{lojaDetails.endereco}</Text>
          </View>
          <Icon name="chevron-right" size={20} color={COLORS.gray} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactCard}>
          <Icon name="clock" size={24} color={COLORS.primary} />
          <View style={styles.contactContent}>
            <Text style={styles.contactLabel}>Horário</Text>
            <Text style={styles.contactValue}>{lojaDetails.horario}</Text>
          </View>
          <Icon name="chevron-right" size={20} color={COLORS.gray} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactCard}>
          <Icon name="phone" size={24} color={COLORS.primary} />
          <View style={styles.contactContent}>
            <Text style={styles.contactLabel}>Telefone</Text>
            <Text style={styles.contactValue}>{lojaDetails.telefone}</Text>
          </View>
          <Icon name="chevron-right" size={20} color={COLORS.gray} />
        </TouchableOpacity>
      </View>

      <View style={styles.couponsSection}>
        <Text style={styles.sectionTitle}>Cupons Disponíveis</Text>

        {lojaDetails.cupons.map((cupom) => (
          <View key={cupom.id} style={styles.couponCard}>
            <View style={styles.couponContent}>
              <Icon name="ticket" size={24} color={COLORS.primary} />
              <View style={styles.couponText}>
                <Text style={styles.couponTitle}>{cupom.title}</Text>
                <Text style={styles.couponValidade}>Válido até {cupom.validade}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.activateButton}>
              <Text style={styles.activateButtonText}>Ativar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.actionButtonContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Icon name="map-marker" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Ver no Mapa</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: SPACING.xl }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerImage: {
    height: 200,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: BORDER_RADIUS.medium,
  },
  favoriteButton: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.circle,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoSection: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
  },
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  lojaName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  categoria: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.medium,
  },
  rating: {
    marginLeft: SPACING.xs,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  reviews: {
    marginLeft: SPACING.xs,
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    marginTop: SPACING.xs,
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.text,
  },
  statLabel: {
    marginTop: SPACING.xs,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  descricao: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  contactSection: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  contactContent: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  contactLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  contactValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  couponsSection: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  couponCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  couponContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  couponText: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  couponTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  couponValidade: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  activateButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.medium,
  },
  activateButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  actionButtonContainer: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.medium,
    paddingVertical: SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: SPACING.sm,
    fontSize: 16,
  },
});

export default LojaDetailsScreen;
