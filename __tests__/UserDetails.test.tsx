import React from 'react';
import {render, screen, waitFor} from '@testing-library/react-native';
import {client} from '@/config/API';
import {useLocalSearchParams} from 'expo-router';
import {ThemeProvider} from '@/state/ThemeContext';
import UserDetails from '@/app/(tabs)/(user)/userDetails';

// Mock the API client
jest.mock('@/config/API', () => ({
  client: {
    get: jest.fn()
  }
}));

// Mock useLocalSearchParams hook
jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn()
}));

const mockUser = {
  id: 1,
  name: 'John Doe',
  username: 'johndoe',
  email: 'john.doe@example.com',
  address: {
    street: '123 Main St',
    suite: 'Apt 4B',
    city: 'Somewhere',
    zipcode: '12345',
    geo: {
      lat: '40.7128',
      lng: '-74.0060'
    }
  },
  phone: '123-456-7890',
  website: 'www.johndoe.com',
  company: {
    name: 'John Doe Inc.',
    catchPhrase: 'Innovating the Future',
    bs: 'Business Solutions'
  }
};

describe('UserDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays a loading indicator while data is being fetched', async () => {
    (client.get as jest.Mock).mockImplementation(() => new Promise(() => {}));
    (useLocalSearchParams as jest.Mock).mockReturnValue({id: 1});

    render(
      <ThemeProvider>
        <UserDetails />
      </ThemeProvider>
    );

    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders user details when data is fetched successfully', async () => {
    (client.get as jest.Mock).mockResolvedValue({data: mockUser});
    (useLocalSearchParams as jest.Mock).mockReturnValue({id: 1});

    render(
      <ThemeProvider>
        <UserDetails />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(mockUser.name)).toBeTruthy();
      expect(screen.getByText(`@${mockUser.username}`)).toBeTruthy();
      expect(screen.getByText(mockUser.email)).toBeTruthy();
      expect(
        screen.getByText(
          `${mockUser.address.street}, ${mockUser.address.suite}`
        )
      ).toBeTruthy();
      expect(
        screen.getByText(
          `${mockUser.address.city}, ${mockUser.address.zipcode}`
        )
      ).toBeTruthy();
      expect(screen.getByText(`Lat: ${mockUser.address.geo.lat}`)).toBeTruthy();
      expect(screen.getByText(`Lng: ${mockUser.address.geo.lng}`)).toBeTruthy();
      expect(screen.getByText(mockUser.phone)).toBeTruthy();
      expect(screen.getByText(mockUser.website)).toBeTruthy();
      expect(screen.getByText(mockUser.company.name)).toBeTruthy();
      expect(screen.getByText(mockUser.company.catchPhrase)).toBeTruthy();
      expect(screen.getByText(mockUser.company.bs)).toBeTruthy();
    });
  });

  it('displays an error message when data cannot be fetched', async () => {
    (client.get as jest.Mock).mockRejectedValue(new Error('Network error'));
    (useLocalSearchParams as jest.Mock).mockReturnValue({id: 1});

    render(
      <ThemeProvider>
        <UserDetails />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('User not found')).toBeTruthy();
    });
  });
});
