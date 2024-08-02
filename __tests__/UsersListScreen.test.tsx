import React from 'react';
import {render, screen, waitFor} from '@testing-library/react-native';
import {client} from '@/config/API';
import UsersListScreen from '@/app/(tabs)/(user)/userList';

jest.mock('@/config/API', () => ({
  client: {
    get: jest.fn()
  }
}));

const mockUsers = [
  {id: 1, name: 'John Doe', email: 'john.doe@example.com'},
  {id: 2, name: 'Jane Smith', email: 'jane.smith@example.com'}
];

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  // eslint-disable-next-line no-console
  (console.error as jest.Mock).mockRestore();
});

describe('UsersListScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays a loading indicator while data is being fetched', async () => {
    (client.get as jest.Mock).mockImplementation(() => new Promise(() => {})); // Mocking a pending promise

    render(<UsersListScreen />);

    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
  });

  test('renders a list of users when data is fetched successfully', async () => {
    (client.get as jest.Mock).mockResolvedValue({data: mockUsers});

    render(<UsersListScreen />);

    await waitFor(() => {
      expect(
        screen.getByText(
          'Below is a list of users fetched from an external API.'
        )
      ).toBeTruthy();
      expect(screen.getByText('John Doe')).toBeTruthy();
      expect(screen.getByText('jane.smith@example.com')).toBeTruthy();
    });
  });

  test('handles errors gracefully', async () => {
    (client.get as jest.Mock).mockRejectedValue(new Error('Network error'));

    render(<UsersListScreen />);

    await waitFor(() => {
      expect(
        screen.queryByText(
          'Below is a list of users fetched from an external API.'
        )
      ).toBeNull();
    });
  });
});
