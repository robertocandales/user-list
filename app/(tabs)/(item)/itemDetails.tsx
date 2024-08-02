import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  ScrollView
} from 'react-native';
import {useLocalSearchParams} from 'expo-router';
import {colors} from '@/config/theme/colors';
import {API_BASE, client} from '@/config/API';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const ItemDetails = () => {
  const {id} = useLocalSearchParams();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get(`${API_BASE}/users/${id}`);
        setUser(response.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{user.name}</Text>
        <Text style={styles.subtitle}>@{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address</Text>
          <Text
            style={styles.detail}
          >{`${user.address.street}, ${user.address.suite}`}</Text>
          <Text
            style={styles.detail}
          >{`${user.address.city}, ${user.address.zipcode}`}</Text>
          <Text style={styles.detail}>Lat: {user.address.geo.lat}</Text>
          <Text style={styles.detail}>Lng: {user.address.geo.lng}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Phone</Text>
          <Text style={styles.detail}>{user.phone}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Website</Text>
          <Text style={styles.detail}>{user.website}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Company</Text>
          <Text style={styles.detail}>{user.company.name}</Text>
          <Text style={styles.detail}>{user.company.catchPhrase}</Text>
          <Text style={styles.detail}>{user.company.bs}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 20,
    paddingHorizontal: 10
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 10,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 5
  },
  email: {
    fontSize: 16,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 20
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 10
  },
  detail: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 5
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20
  }
});
export default ItemDetails;
