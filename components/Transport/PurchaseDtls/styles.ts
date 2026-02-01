import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  pageContainer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    marginBottom: 24,
  },
  carouselImage: {
    width: '95%',
    height: width * 0.6,
    borderRadius: 12,
    marginBottom: 16,
     alignSelf: 'center',
  },
  infoSection: {
    marginTop: 8,
  },
  prodInfo: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  label: {
    fontWeight: '600',
    color: '#444',
  },
  prodDesc: {
    fontSize: 15,
    marginTop: 12,
    color: '#555',
    lineHeight: 22,
  },
});

export default styles;
