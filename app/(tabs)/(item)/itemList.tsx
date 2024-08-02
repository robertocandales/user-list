import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import {colors} from '@/config/theme/colors';
import {router} from 'expo-router';
import {API_BASE, client} from '@/config/API';

interface User {
  id: number;
  name: string;
  email: string;
}

const UsersListScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get(`${API_BASE}/users`);
        setUsers(response.data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.screenDescription}>
        Below is a list of users fetched from an external API.
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              router.push({pathname: '/itemDetails', params: {id: item.id}})
            }
            style={styles.userCard}
          >
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 10,
    paddingTop: 20
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 10,
    textAlign: 'center'
  },
  screenDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20
  },
  userCard: {
    backgroundColor: colors.cardBackground,
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary
  },
  userEmail: {
    fontSize: 14,
    color: colors.textSecondary
  }
});

export default UsersListScreen;
