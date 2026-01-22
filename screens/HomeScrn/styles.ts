import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: "100%",
    resizeMode: 'cover',
    top:"2%",
    
    alignItems: 'center',
    flexDirection: 'column',

    backgroundColor: '#e58d29',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'skyblue',
    width: '70%',
    marginLeft: "1%",
    marginRight: "1%",
    marginTop: "1%",
    
  },

  loanFriendButton: {
    backgroundColor: '#72ebd8',
    
    height: "90%",
    borderRadius: 30,
    
    width: "60%",
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:"1%",
    marginLeft:"1%",
    marginTop: "1%",
   
  },

  


  chamaLoanAndCreditSalesButton: {
    backgroundColor: 'white',
    height: "50%",
    borderRadius: 30,
    marginHorizontal: 30,
    width: Dimensions.get('screen').width - 60,
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: "1%",
  },

  chamaLoanAndCreditSalesButton4: {
    backgroundColor: 'white',
    height: "90%",
    borderRadius: 30,
    width:"90%",
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: "1%",
  },

  chamaLoanAndCreditSalesButton5: {
    backgroundColor: 'white',
    height: "90%",
    borderRadius: 30,
    width:"90%",
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: "1%",
  },

  ChamaLoanAndCreditSalesText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'black',
    
  },

  ChamaLoanAndCreditSalesText4: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'black',
    
  },

  loanAFriendText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    
  },

  loanAFriendText2: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    
  },

  loanAFriendText3: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'red',
    padding:8
    
  },

  viewForPressables1: {
    backgroundColor: '#72ebd8',
    marginHorizontal: 10,
    width: Dimensions.get('screen').width - 20,
    height: "8%",
    borderRadius: 20,
    marginTop: "2%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
   
  },

  viewForPressables2: {
    backgroundColor: '#e58d29',
    marginHorizontal: 10,
    width: Dimensions.get('screen').width - 20,
    height: "15%",
    borderRadius: 20,
    marginTop: "1%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  

  viewForPressables3: {
    backgroundColor: '#72ebd8',
    marginHorizontal: 10,
    width: Dimensions.get('screen').width - 20,
    height: "25%",
    borderRadius: 20,
    marginTop: "5%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  viewForPressables4: {
    backgroundColor: 'white',
    height: "30%",
    borderRadius: 30,
    marginHorizontal: 30,
    width: Dimensions.get('screen').width - 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: "1%",
  },

  viewForPressables5: {
    backgroundColor: 'white',
    height: "30%",
    borderRadius: 30,
    marginHorizontal: 30,
    width: Dimensions.get('screen').width - 60,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: "1%",
  },

  viewForPressables6: {
    backgroundColor: '#e58d29',
    width: "90%",
    marginRight:"1%",
    marginLeft:"1%",
    height: "12%",
    borderRadius: 20,
    marginTop: "10%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  loanFriendButton2: {
    backgroundColor: 'white',
    
    height: "100%",
    borderRadius: 30,
    
    
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    marginRight:"1%",
    marginLeft:"1%",
    marginTop: "1%",
    marginBottom: "1%",
   
  },
  
});
export default styles;