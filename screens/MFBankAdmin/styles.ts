import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  // General view for each section
  clientsView: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 3,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  // Section title text style
  salesText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF8C00', // Orange color from your theme
    marginBottom: 10,
  },
  // View for options and title alignment
  viewForClientsAndTitle: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  // Base style for each pressable item in the section
  viewForClientsPressables: {
    padding: 10,
    marginBottom: 8,
    borderRadius: 6,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Linear gradient applied to pressable buttons
  clientsPressableGradient: {
    borderRadius: 8,
    width: '100%',
    padding: 12, // Add padding for the button inside the gradient
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Style for pressable text inside buttons
  salesPressableText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  // Style for different pressables in the "Cash Sales" section
  viewForClientsPressables3: {
    padding: 12,
    borderRadius: 8,
    width: '100%',
    marginBottom: 8,
  },

  


});

export default styles;
