import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: "100%",
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },

  loanTitleView: {
    backgroundColor: 'white',
    marginHorizontal: "15%",    
    height: "8%",
    borderRadius: 5,
    marginTop: "2%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    
  },

  sendLoanView: {
    backgroundColor: '#72ebd8',
    marginHorizontal: "1%",
    height: "15%",
    borderRadius: 5,
    marginTop: "2%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    
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
    backgroundColor: 'white',
    marginHorizontal: "15%",    
    height: "8%",
    borderRadius: 5,
    marginTop: "2%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: "95%",
  },
  sendLoanButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },

  sendLoanInput: {
    backgroundColor: 'white',
    width:"95%",
    height: "60%",
    borderRadius: 5,
    marginTop: "2%",   
    
  },

  
 
});
export default styles;