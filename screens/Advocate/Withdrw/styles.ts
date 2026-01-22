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
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },

  amountTitleView: {
    backgroundColor: 'white',
    marginHorizontal: "15%",    
    height: "8%",
    borderRadius: 5,
    marginTop: "2%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  sendAmtView: {
    backgroundColor: '#72ebd8',
    marginHorizontal: "1%",
    height: "15%",
    borderRadius: 5,
    marginTop: "2%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  sendAmtText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: "10%",
    marginRight: "10%"
  },
  sendAmtButton: {
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
  sendAmtButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },

  sendAmtInput: {
    backgroundColor: 'white',
    width:"95%",
    height: "60%",
    borderRadius: 5,
    marginTop: "2%",   
  },
});
export default styles;