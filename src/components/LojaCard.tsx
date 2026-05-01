import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../styles/theme';

interface LojaCardProps {
  loja: any;
  onPress: () => void;
}

const LojaCard: React.FC<LojaCardProps> = ({ loja, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: loja.logo || 'https://via.placeholder.com/80' }}
          style={styles.logo}
        />
        {loja.desconto && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{loja.desconto}%</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.lojaName}>{loja.nome}</Text>
        <Text style={styles.lojaCategory}>{loja.categoria}</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Icon name="star" size={14} color={COLORS.secondary} />
            <Text style={styles.infoText}>{loja.avaliacao || 4.5}</Text>
          </View>

          <View style={styles.infoItem}>
            <Icon name="map-marker" size={14} color={COLORS.text} />
            <Text style={styles.infoText}>{loja.distancia || '0.5'} km</Text>
          </View>

          {loja.cashback && (
            <View style={styles.infoItem}>
              <Icon name="cash-multiple" size={14} color={COLORS.primary} />
              <Text style={[styles.infoText, { color: COLORS.primary, fontWeight: '600' }]}>
                +{loja.cashback}%
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.promoText}>{loja.promocao}</Text>
      </View>

      <Icon name="chevron-right" size={24} color={COLORS.gray} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  imageContainer: {
    position: 'relative',
    marginRight: SPACING.md,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: BORDER_RADIUS.medium,
    backgroundColor: COLORS.background,
  },
  discountBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: COLORS.accent,
    borderRadius: BORDER_RADIUS.circle,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    minWidth: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  lojaName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  lojaCategory: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  infoText: {
    fontSize: 12,
    color: COLORS.text,
    marginLeft: 4,
    fontWeight: '500',
  },
  promoText: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default LojaCard;
