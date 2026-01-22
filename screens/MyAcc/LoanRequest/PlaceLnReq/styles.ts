import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: "100%",
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 1,
    flexWrap:"wrap"
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

  sendLoanView: {
    backgroundColor: '#72ebd8',
    marginHorizontal: 10,
    width: Dimensions.get('screen').width - 20,
    height: 90,
    borderRadius: 20,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 20,
  },

  sendLoanView2: {
    backgroundColor: '#72ebd8',
    marginHorizontal: 10,
    width: Dimensions.get('screen').width - 20,
    height: 110,
    borderRadius: 20,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 20,
  },


  sendLoanText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
  },
  sendLoanButton: {
    backgroundColor: '#fff',
    height: 45,
    borderRadius: 30,
    marginHorizontal: 10,
    width: Dimensions.get('screen').width - 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 400,
  },
  sendLoanButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },

  sendLoanInput: {
    backgroundColor: 'white',
    
    height: 45,
    borderRadius: 10,
    width: Dimensions.get('screen').width - 20,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 10,
  },

  sendLoanInput2: {
    backgroundColor: 'white',
    width: Dimensions.get('screen').width - 20,
    height: 95,
    borderRadius: 10,
    padding:20,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
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