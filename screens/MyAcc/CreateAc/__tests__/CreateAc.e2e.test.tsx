// @ts-nocheck
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CreateAcForm from '../index';
import * as RN from 'react-native';

jest.mock('aws-amplify/auth', () => ({
  getCurrentUser: jest.fn(),
  fetchUserAttributes: jest.fn(() => ({})),
  updateUserAttribute: jest.fn(() => Promise.resolve()),
}));

// Mock Alert so we can call its callbacks
const originalAlert = RN.Alert.alert;
beforeAll(() => {
  RN.Alert.alert = jest.fn((title, message, buttons) => {
    // Simulate pressing first action for confirmation dialogs in tests
    if (Array.isArray(buttons) && buttons[0] && typeof buttons[0].onPress === 'function') {
      buttons[0].onPress();
    }
    return null as any;
  });
});
afterAll(() => {
  RN.Alert.alert = originalAlert;
});

describe('CreateAc phone integration', () => {
  it('allows searching, selecting country, entering number, validating and confirming', async () => {
    const { getByPlaceholderText, getByText, getAllByText } = render(<CreateAcForm />);

    // Open country modal
    const countrySelector = getByText('Select Country');
    fireEvent.press(countrySelector);

    // Search for Kenya
    const searchInput = getByPlaceholderText(/Search country name/i);
    fireEvent.changeText(searchInput, 'Kenya');

    // Select Kenya from list
    await waitFor(() => getByText(/Kenya/));
    const kenyaItem = getByText(/Kenya/);
    fireEvent.press(kenyaItem);

    // Enter local number and validate
    const localInput = getByPlaceholderText(/Local number/i);
    fireEvent.changeText(localInput, '712345678');

    const validateButton = getByText(/Validate/i);
    fireEvent.press(validateButton);

    // After Alert mock above the confirmation should have been pressed and phoneConfirmed set
    await waitFor(() => {
      expect(getByText(/Confirmed/i)).toBeTruthy();
    });
  });
});
