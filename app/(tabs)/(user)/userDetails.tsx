import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {useLocalSearchParams} from 'expo-router';
import {useTheme} from '@/state/ThemeContext';
import {colorsPalette} from '@/config/theme/colors';
import {API_BASE, client} from '@/config/API';
import Loading from '@/components/Loading';

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

const UserDetails = () => {
  const {id} = useLocalSearchParams();
  const {theme} = useTheme();
  const currentColors = colorsPalette[theme];

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
    return <Loading />;
  }

  if (!user) {
    return (
      <View
        style={[styles.container, {backgroundColor: currentColors.background}]}
      >
        <Text style={[styles.errorText, {color: 'red'}]}>User not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: currentColors.background}]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.title, {color: currentColors.textPrimary}]}>
          {user.name}
        </Text>
        <Text style={[styles.subtitle, {color: currentColors.textSecondary}]}>
          @{user.username}
        </Text>
        <Text style={[styles.email, {color: currentColors.textPrimary}]}>
          {user.email}
        </Text>
        <View
          style={[
            styles.section,
            {backgroundColor: currentColors.cardBackground}
          ]}
        >
          <Text
            style={[styles.sectionTitle, {color: currentColors.textPrimary}]}
          >
            Address
          </Text>
          <Text
            style={[styles.detail, {color: currentColors.textSecondary}]}
          >{`${user.address.street}, ${user.address.suite}`}</Text>
          <Text
            style={[styles.detail, {color: currentColors.textSecondary}]}
          >{`${user.address.city}, ${user.address.zipcode}`}</Text>
          <Text style={[styles.detail, {color: currentColors.textSecondary}]}>
            Lat: {user.address.geo.lat}
          </Text>
          <Text style={[styles.detail, {color: currentColors.textSecondary}]}>
            Lng: {user.address.geo.lng}
          </Text>
        </View>
        <View
          style={[
            styles.section,
            {backgroundColor: currentColors.cardBackground}
          ]}
        >
          <Text
            style={[styles.sectionTitle, {color: currentColors.textPrimary}]}
          >
            Phone
          </Text>
          <Text style={[styles.detail, {color: currentColors.textSecondary}]}>
            {user.phone}
          </Text>
        </View>
        <View
          style={[
            styles.section,
            {backgroundColor: currentColors.cardBackground}
          ]}
        >
          <Text
            style={[styles.sectionTitle, {color: currentColors.textPrimary}]}
          >
            Website
          </Text>
          <Text style={[styles.detail, {color: currentColors.textSecondary}]}>
            {user.website}
          </Text>
        </View>
        <View
          style={[
            styles.section,
            {backgroundColor: currentColors.cardBackground}
          ]}
        >
          <Text
            style={[styles.sectionTitle, {color: currentColors.textPrimary}]}
          >
            Company
          </Text>
          <Text style={[styles.detail, {color: currentColors.textSecondary}]}>
            {user.company.name}
          </Text>
          <Text style={[styles.detail, {color: currentColors.textSecondary}]}>
            {user.company.catchPhrase}
          </Text>
          <Text style={[styles.detail, {color: currentColors.textSecondary}]}>
            {user.company.bs}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 10,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 5
  },
  email: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20
  },
  section: {
    marginBottom: 20,
    padding: 15,
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
    marginBottom: 10
  },
  detail: {
    fontSize: 16,
    marginBottom: 5
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20
  }
});
export default UserDetails;
