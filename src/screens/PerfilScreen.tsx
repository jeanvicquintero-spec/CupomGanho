import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SHADOWS, SPACING, BORDER_RADIUS } from '../styles/theme';

const PerfilScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [userData] = useState({
    name: 'João Silva',
    email: 'joao@example.com',
    phone: '(11) 98765-4321',
    memberSince: '2024-01-15',
  });

  const handleLogout = () => {
    Alert.alert(
      'Confirmar',
      'Deseja realmente sair?',
      [
        { text: 'Cancelar', onPress: () => {} },
        { text: 'Sair', onPress: () => console.log('Logout') },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Icon name="account-circle" size={100} color={COLORS.primary} />
        </View>
        <Text style={styles.userName}>{userData.name}</Text>
        <Text style={styles.userEmail}>{userData.email}</Text>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Icon name="phone" size={20} color={COLORS.primary} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Telefone</Text>
            <Text style={styles.infoValue}>{userData.phone}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Icon name="calendar" size={20} color={COLORS.primary} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Membro desde</Text>
            <Text style={styles.infoValue}>{userData.memberSince}</Text>
          </View>
        </View>
      </View>

      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Configurações</Text>

        <View style={styles.settingCard}>
          <View style={styles.settingLeft}>
            <Icon name="bell" size={24} color={COLORS.primary} />
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Notificações</Text>
              <Text style={styles.settingDescription}>Receber alertas de cupons</Text>
            </View>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: COLORS.gray, true: COLORS.primary }}
          />
        </View>

        <View style={styles.settingCard}>
          <View style={styles.settingLeft}>
            <Icon name="email" size={24} color={COLORS.primary} />
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Email Notifications</Text>
              <Text style={styles.settingDescription}>Atualizações por email</Text>
            </View>
          </View>
          <Switch
            value={emailNotifications}
            onValueChange={setEmailNotifications}
            trackColor={{ false: COLORS.gray, true: COLORS.primary }}
          />
        </View>
      </View>

      <View style={styles.helpSection}>
        <Text style={styles.sectionTitle}>Ajuda & Suporte</Text>

        <TouchableOpacity style={styles.helpCard}>
          <Icon name="help-circle" size={24} color={COLORS.primary} />
          <Text style={styles.helpText}>Centro de Ajuda</Text>
          <Icon name="chevron-right" size={24} color={COLORS.gray} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.helpCard}>
          <Icon name="file-document" size={24} color={COLORS.primary} />
          <Text style={styles.helpText}>Termos e Condições</Text>
          <Icon name="chevron-right" size={24} color={COLORS.gray} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.helpCard}>
          <Icon name="shield-lock" size={24} color={COLORS.primary} />
          <Text style={styles.helpText}>Política de Privacidade</Text>
          <Icon name="chevron-right" size={24} color={COLORS.gray} />
        </TouchableOpacity>
      </View>

      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={20} color="#fff" />
          <Text style={styles.logoutButtonText}>Sair da Conta</Text>
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
  profileHeader: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
  },
  avatarContainer: {
    marginBottom: SPACING.md,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  infoCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    ...SHADOWS.small,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContent: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: SPACING.xs,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  settingsSection: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingContent: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  settingDescription: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  helpSection: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  helpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.medium,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  helpText: {
    flex: 1,
    marginLeft: SPACING.md,
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  logoutContainer: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.error,
    borderRadius: BORDER_RADIUS.medium,
    paddingVertical: SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: SPACING.sm,
    fontSize: 16,
  },
});

export default PerfilScreen;
