import React from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../styles/theme';
import { CONTACT_INFO } from '../constants/contact';

const ContactScreen = () => {
  const handleCall = () => {
    Linking.openURL(`tel:${CONTACT_INFO.phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${CONTACT_INFO.email}`);
  };

  const handleWhatsApp = () => {
    Linking.openURL(CONTACT_INFO.whatsapp);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="headset" size={64} color={COLORS.primary} />
        <Text style={styles.title}>Centro de Ajuda</Text>
        <Text style={styles.subtitle}>Estamos aqui para ajudar!</Text>
      </View>

      <View style={styles.contactSection}>
        <Text style={styles.sectionTitle}>Entre em Contato</Text>

        {/* Email */}
        <TouchableOpacity style={styles.contactCard} onPress={handleEmail}>
          <Icon name="email" size={24} color={COLORS.primary} />
          <View style={styles.contactContent}>
            <Text style={styles.contactLabel}>Email</Text>
            <Text style={styles.contactValue}>{CONTACT_INFO.email}</Text>
          </View>
          <Icon name="chevron-right" size={24} color={COLORS.gray} />
        </TouchableOpacity>

        {/* Teléfono */}
        <TouchableOpacity style={styles.contactCard} onPress={handleCall}>
          <Icon name="phone" size={24} color={COLORS.primary} />
          <View style={styles.contactContent}>
            <Text style={styles.contactLabel}>Teléfono</Text>
            <Text style={styles.contactValue}>{CONTACT_INFO.phone}</Text>
          </View>
          <Icon name="chevron-right" size={24} color={COLORS.gray} />
        </TouchableOpacity>

        {/* WhatsApp */}
        <TouchableOpacity style={styles.contactCard} onPress={handleWhatsApp}>
          <Icon name="whatsapp" size={24} color="#25D366" />
          <View style={styles.contactContent}>
            <Text style={styles.contactLabel}>WhatsApp</Text>
            <Text style={styles.contactValue}>Chat en Vivo</Text>
          </View>
          <Icon name="chevron-right" size={24} color={COLORS.gray} />
        </TouchableOpacity>

        {/* Instagram */}
        <TouchableOpacity style={styles.contactCard}>
          <Icon name="instagram" size={24} color="#E4405F" />
          <View style={styles.contactContent}>
            <Text style={styles.contactLabel}>Instagram</Text>
            <Text style={styles.contactValue}>{CONTACT_INFO.instagram}</Text>
          </View>
          <Icon name="chevron-right" size={24} color={COLORS.gray} />
        </TouchableOpacity>
      </View>

      <View style={styles.hoursSection}>
        <Text style={styles.sectionTitle}>Horário de Atención</Text>
        <View style={styles.hoursCard}>
          <Icon name="clock" size={24} color={COLORS.primary} />
          <Text style={styles.hoursText}>{CONTACT_INFO.businessHours}</Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Información Legal</Text>
        <TouchableOpacity style={styles.linkCard}>
          <Text style={styles.linkText}>Política de Privacidad</Text>
          <Icon name="open-in-new" size={18} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkCard}>
          <Text style={styles.linkText}>Términos y Condiciones</Text>
          <Icon name="open-in-new" size={18} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: SPACING.md,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
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
  hoursSection: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  hoursCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.md,
    ...SHADOWS.small,
  },
  hoursText: {
    marginLeft: SPACING.md,
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  infoSection: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.xl,
  },
  linkCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
});

export default ContactScreen;
