// styles.js
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  amountTitleView: {
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333'
  },
  sendAmtView: {
    marginVertical: 12,
    paddingHorizontal: 16
  },
  sendAmtInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fff'
  },
  sendAmtText: {
    marginTop: 6,
    fontSize: 14,
    color: '#666'
  },
  sendAmtButton: {
    marginTop: 20,
    marginHorizontal: 16,
    backgroundColor: '#e29d59',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center'
  },
  sendAmtButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff'
  }
});
export default styles;