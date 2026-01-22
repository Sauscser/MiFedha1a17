import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: "100%",
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },

  amountTitleView: {
    backgroundColor: 'white',
   
    marginHorizontal: 10,
    width: Dimensions.get('screen').width - 20,
    borderRadius: 5,
    marginTop: "5%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    
  },

  sendAmtButton: {
    backgroundColor: '#fff',
    height: "7%",
    borderRadius: 30,
    marginHorizontal: 10,
    width: Dimensions.get('screen').width - 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: "5%",
    marginBottom: "95%",
  },

  sendAmtView: {
    backgroundColor: 'skyblue',
    marginHorizontal: 10,
    width: Dimensions.get('screen').width - 20,
    height: "17%",
    borderRadius: 20,
    marginTop: "5%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding:"1%",
   
  },

  sendAmtText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
  },
  
  sendAmtButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },

  sendAmtInput: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    width: Dimensions.get('screen').width - 30,
    height: "60%",
    borderRadius: 10,
    marginTop: "2%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendAmtViewDesc: {
    backgroundColor: 'white',
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
});
export default styles;