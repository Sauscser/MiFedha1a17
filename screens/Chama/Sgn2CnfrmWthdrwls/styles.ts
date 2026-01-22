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
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },

  amountTitleView: {
    backgroundColor: 'white',
    marginHorizontal: 40,
    width: Dimensions.get('screen').width - 80,
    height: "7%",
    borderRadius: 5,
    marginTop: "2%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  sendAmtView: {
    backgroundColor: '#72ebd8',
    marginHorizontal: 10,
    width: Dimensions.get('screen').width - 20,
    height: "11%",
    borderRadius: 20,
    marginTop: "6%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  sendAmtText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: "10%",
    marginRight: "10%"
  },
  sendAmtButton: {
    backgroundColor: 'white',
    height: "5%",
    borderRadius: 5,
    marginHorizontal: 50,
    width: Dimensions.get('screen').width - 100,
    marginTop: "3%",
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
    height: "50%",
    borderRadius: 5,
    marginTop: "2%",
  },
});
export default styles;