import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  adminImage: {
    width: '100%',
    height: "100%",
    resizeMode: 'cover',
    top:"2%"
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: 'green',
    width: '70%',
    marginLeft: 25,
    top: 5,
  },
  loanFriendButton: {
    backgroundColor: '#064bfb',
    height: 60,
    borderRadius: 30,
    marginHorizontal: 10,
    width: Dimensions.get('screen').width - 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 100,
    zIndex: 10,
  },

  chamaLoanAndCreditSalesButton: {
    backgroundColor: 'white',
    height: 60,
    borderRadius: 30,
    marginHorizontal: 30,
    width: Dimensions.get('screen').width - 60,
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 10,
  },

  ChamaLoanAndCreditSalesText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  loanAFriendText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },

  viewForPressables: {
    backgroundColor: 'green',
    marginHorizontal: 10,
    width: Dimensions.get('screen').width - 20,
    height: 200,
    borderRadius: 20,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  viewForSalesPressables: {
    backgroundColor: 'green',
    marginHorizontal: 4,
    width: Dimensions.get('screen').width - 8,
    height: 170,
    borderRadius: 20,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  SalesPressables: {
    backgroundColor: 'purple',
    marginHorizontal: 20,
    width: Dimensions.get('screen').width - 40,
    height: 60,
    borderRadius: 20,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',

    
  },

  salesPressableText: {
    color: 'white',
    fontSize: 13,
    
  },

  viewForSalesText: {
    color: 'white',
    fontSize: 20,
    marginTop: 1,
    height: 50,
  },

  salesText: {
    fontSize: 20,
    color: "blue",
    marginBottom:"1.5%"
  },

  viewForClientsPressables: {
    backgroundColor: 'pink',
    
    height: "100%",
    borderRadius: 4,
    
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: "100%",
    
  },

  viewForClientsCategories: {
    backgroundColor: 'brown',
    marginTop:"5%",
    marginBottom:"5%",
    height: "100%",
    borderRadius: 4,
    
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: "33%"
  },

  viewForClientsCategoriesLnSt: {
    backgroundColor: 'brown',
    marginTop:"4%",
    marginBottom:"4%",
    height: "100%",
    borderRadius: 4,
    marginLeft:"10%",
    marginRight:"10%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: "33%"
  },

  viewForClientsAndTitleLnSt: {
    backgroundColor: 'brown',
    width:"100%",
    height: "50%",
    borderRadius: 4,
   
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    
  },
  

  viewForClientsAndTitleMFNdogo: {
    backgroundColor: 'pink',
    width:"100%",
    height: "100%",
    borderRadius: 4,
  
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    
  },

  viewForClientsAndTitle: {
    backgroundColor: 'brown',
    width:"100%",
    height: "50%",
    borderRadius: 4,
   
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    
  },
  

  clientsView: {
    backgroundColor: 'brown',
    width:"100%",
    height: "16%",
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  ClientsPressables: {
    backgroundColor: 'purple',
    width:"45%",
    marginLeft:"1%",
    marginRight:"1%",
    height: "90%",
    borderRadius: 4,
  
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',

    
  },

  clientsPressableText: {
    color: 'white',
    fontSize: 10,
    marginTop: 1,
  },

  acEarningsView: {
    backgroundColor: 'brown',
    marginHorizontal: 5,
    width: Dimensions.get('screen').width - 10,
    height: 95,
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: "2%",
  },

  viewForAcEarningsPressables: {
    backgroundColor: 'brown',
    marginHorizontal: 15,
    width: Dimensions.get('screen').width - 30,
    height: "60%",
    borderRadius: 20,
    marginTop: "0.5%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  earningsAcPressables: {
    backgroundColor: 'purple',
    
    height: 60,
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width:"40%",
    marginHorizontal: "10%"
    
    
  },

  earningsAcPressableText: {
    color: 'white',
    fontSize: 15,
    marginTop: 1,
  },
});
export default styles;