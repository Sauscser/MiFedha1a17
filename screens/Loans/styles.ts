import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Background and container for the entire page
  adminImage: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 20,
  },
  // View for each section with shadows and rounded corners
  clientsView: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    alignItems: 'center', // Center all items horizontally
    justifyContent: 'center', // Center all items vertically
  },
  // Section title text
  salesText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF8C00', // Orange
    marginBottom: 15,
    textTransform: 'uppercase',
    textAlign: 'center', // Center the title text
  },
  // Container for categories (Grant Loans, Loan Statuses, etc.)
  viewForClientsAndTitle: {
    flexDirection: 'column',
    alignItems: 'center', // Center all categories horizontally
    justifyContent: 'center', // Center categories vertically
  },
  // Categories view (each category like "Grant Loan Requests")
  viewForClientsCategories: {
    marginBottom: 20,
    paddingHorizontal: 10,
    alignItems: 'center', // Center categories horizontally
    justifyContent: 'center', // Center categories vertically
  },
  // Text for category titles (e.g., "Grant Loan Requests")
  salesPressableText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E90FF', // Sky Blue
    marginBottom: 8,
    textAlign: 'center', // Center the category title text
  },
  // Container for all pressable buttons in a category
  viewForClientsPressables: {
    flexDirection: 'column',
    alignItems: 'center', // Center all buttons horizontally
    justifyContent: 'center', // Center buttons vertically
    width: '100%', // Ensure the buttons are aligned across the full width
  },
  // Base style for each button (Pressable)
  ClientsPressables: {
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF8C00', // Default orange background
    elevation: 3, // Elevation for shadow
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
  },
  // Text inside the pressable buttons
  clientsPressableText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  // Linear gradient style for each button for the professional look
  clientsPressableGradient: {
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    width: '80%', // Make the buttons take up more space for a cleaner look
  },
  // Gradient style for the buttons (orange to sky blue)
  gradientPressable: {
    borderRadius: 8,
    paddingVertical: 12,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
});

export default styles;
