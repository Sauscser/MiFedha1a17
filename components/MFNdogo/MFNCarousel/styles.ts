import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: 20,
  paddingBottom: 20,
 
  },

  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12, // slightly smaller radius
    padding: 5, // reduced from 20
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    minHeight: 70,
    elevation: 3,
  },

  prodName: {
    fontSize: 16, // reduced from 20
    fontWeight: 'bold',
    marginBottom: 4, // reduced from 8
    color: '#333',
  },

  prodInfo: {
    fontSize: 13, // increased a bit from 8 for legibility
    marginBottom: 2, // reduced
    lineHeight: 14,  // control line spacing
  },

  label: {
    fontWeight: 'bold',
    color:'brown'
  },

  prodDesc: {
    fontSize: 12, // reduced from 16
    marginTop: 6, // reduced from 10
    color: '#666',
    lineHeight: 16,
  },

  buttonRow: {
    flexDirection: 'row',
    marginTop: 12, // reduced from 20
    gap: 8,
  },

  loanFriendButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 8, // reduced from 12
    paddingHorizontal: 12, // reduced from 18
    borderRadius: 8,
  },

  redeemButton: {
    backgroundColor: '#00BFFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12, // smaller text
  },
});

export default styles;
