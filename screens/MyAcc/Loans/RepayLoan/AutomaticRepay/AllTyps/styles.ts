import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({

  image: {
    width: '100%',
    height: "100%",
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 30,
    marginBottom:"90%"
  },

  loanTitleView2: {
    backgroundColor: 'white',
    width: "95%",    
    height: "80%",
    borderRadius: 5,
    marginTop: "5%",
    
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    
  },

  loanTitleView1: {
    backgroundColor: 'white',
    width: "45%",    
    height: "100%",
    borderRadius: 5,
   
    marginRight:"2%",
    marginLeft:"2%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    
  },

  loanTitleView: {
    backgroundColor: 'white',
    
    height: "30%",
    borderRadius: 5,
    marginTop: "5%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    
  },

  root: {
    flex: 1,
    marginTop: "2%",
    justifyContent: 'center',
    alignItems: 'center',
    
    backgroundColor: 'white',
  },

  label: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  label2: {
    fontSize: 10,
    fontWeight: "normal",
  },

  
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },



  sendLoanView: {
    backgroundColor: '#72ebd8',
    marginHorizontal: 10,
    width: Dimensions.get('screen').width - 20,
    height: "15%",
    borderRadius: 20,
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
    marginLeft: "10%",
    marginRight: "10%"
  },
  sendLoanButton: {
    backgroundColor: 'white',
    marginHorizontal: "15%",    
    height: "7%",
    borderRadius: 5,
    marginTop: "5%",
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