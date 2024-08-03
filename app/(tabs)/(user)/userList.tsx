import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '@/state/ThemeContext';
import {colorsPalette} from '@/config/theme/colors';
import {router} from 'expo-router';
import {API_BASE, client} from '@/config/API';
import Loading from '@/components/Loading';

interface User {
  id: number;
  name: string;
  email: string;
}

const UsersListScreen: React.FC = () => {
  const {theme} = useTheme();
  const currentColors = colorsPalette[theme];

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
    return <Loading />;
  }

  return (
    <View
      style={[styles.container, {backgroundColor: currentColors.background}]}
    >
      <Text
        style={[styles.screenDescription, {color: currentColors.textSecondary}]}
      >
        Below is a list of users fetched from an external API.
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              router.push({pathname: '/userDetails', params: {id: item.id}})
            }
            style={[
              styles.userCard,
              {backgroundColor: currentColors.cardBackground}
            ]}
          >
            <Text style={[styles.userName, {color: currentColors.textPrimary}]}>
              {item.name}
            </Text>
            <Text
              style={[styles.userEmail, {color: currentColors.textSecondary}]}
            >
              {item.email}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 10,
    textAlign: 'center'
  },
  screenDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20
  },
  userCard: {
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
    fontWeight: 'bold'
  },
  userEmail: {
    fontSize: 14
  }
});

export default UsersListScreen;
