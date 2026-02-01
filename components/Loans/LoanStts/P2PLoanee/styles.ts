import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },

  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },

  prodName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },

  prodInfo: {
    fontSize: 16,
    marginBottom: 4,
  },

  label: {
    fontWeight: 'bold',
  },

  prodDesc: {
    fontSize: 16,
    marginTop: 10,
    color: '#666',
  },

  buttonRow: {
    flexDirection: 'column',
    marginTop: 20,
    gap: 10,
  },

  loanFriendButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },

  redeemButton: {
    backgroundColor: '#00BFFF',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default styles;
