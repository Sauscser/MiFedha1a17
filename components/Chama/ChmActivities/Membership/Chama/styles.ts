import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 30,
    backgroundColor: '#f5f5f5',
  },

  card: {
    width: '92%',
    borderRadius: 20,
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },

  prodName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff6600', // orange
    marginBottom: 10,
  },

  prodInfo: {
    fontSize: 16,
    marginBottom: 6,
    color: '#333',
  },

  label: {
    fontWeight: 'bold',
    color: '#000',
  },

  prodDesc: {
    fontSize: 15,
    color: '#666',
    marginTop: 12,
  },

  buttonRow: {
    width: '90%',
    marginTop: 20,
    gap: 12,
  },

  gradientButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

  pressableContent: {
    width: '100%',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default styles;
