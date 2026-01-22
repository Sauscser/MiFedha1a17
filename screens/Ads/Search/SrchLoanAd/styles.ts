import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    width: Dimensions.get('screen').width - 20,
    height: "60%",
    borderRadius: 20,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
   marginBottom:5
  },

  sendLoanView: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    width: Dimensions.get('screen').width - 20,
    height: "20%",
    borderRadius: 20,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 5,
  },

  

  image: {
    width: '100%',
    height: "100%",
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 1,
    flexWrap:"wrap",
    marginBottom:400
  },

  sendLoanButton: {
    backgroundColor: 'white',
    width: "100%",
    height: "25%",
    borderRadius: 10,
    marginTop: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sendLoanInput: {
    backgroundColor: 'white',
    width: "100%",
    height: "15%",
    borderRadius: 10,
    marginTop: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:15
  },

  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  label2: {
    fontSize: 18,
    fontWeight: "normal",
  },

  
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },

  loanTitleView: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    width: Dimensions.get('screen').width - 20,
    height: 40,
    borderRadius: 5,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    top: 10,
  
  },

  sendAmtViewDesc: {
    backgroundColor: '#72ebd8',
    marginHorizontal: 10,
    width: Dimensions.get('screen').width - 20,
    height: "12%",
    borderRadius: 20,
    marginTop: "5%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding:"1%",
   
  },

  sendAmtInputDesc: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    width: Dimensions.get('screen').width - 30,
    height: "70%",
    borderRadius: 10,
    marginTop: "2%",
    justifyContent: 'center',
    alignItems: 'center',
    
  },

  

  sendLoanText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
  },
  
  sendLoanButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },

  

  loanSpecificationsTextInput: {
    backgroundColor: 'white',
    width: 300,
    height: 200,
    borderRadius: 10,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loanSpecificationView: {
    backgroundColor: '#72ebd8',
    marginHorizontal: 10,
    width: Dimensions.get('screen').width - 20,
    height: 250,
    borderRadius: 20,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 20,
  },
  
});

export default styles;