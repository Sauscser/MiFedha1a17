import { StyleSheet, Dimensions } from 'react-native';
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: "100%",
    resizeMode: 'cover',
    justifyContent: 'center',
    marginTop: 30
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black'
  },
  loanTitleView: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    width: Dimensions.get('screen').width - 20,
    height: "40%",
    borderRadius: 5,
    marginTop: "25%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  loanTitleView2: {
    backgroundColor: 'skyblue',
    marginHorizontal: 10,
    width: Dimensions.get('screen').width - 20,
    height: "80%",
    borderRadius: 5,
    marginTop: "5%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  sendLoanView: {
    backgroundColor: 'skyblue',
    marginHorizontal: 10,
    width: Dimensions.get('screen').width - 20,
    height: 90,
    borderRadius: 20,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 20
  },
  sendLoanText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30
  },
  sendLoanButton: {
    backgroundColor: '#fff',
    height: 40,
    borderRadius: 30,
    marginHorizontal: 10,
    width: Dimensions.get('screen').width - 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  sendLoanButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black'
  },
  sendLoanInput: {
    backgroundColor: 'white',
    width: 300,
    height: 45,
    borderRadius: 10,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loanSpecificationsTextInput: {
    backgroundColor: 'white',
    width: 300,
    height: 200,
    borderRadius: 10,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loanSpecificationView: {
    backgroundColor: 'skyblue',
    marginHorizontal: 10,
    width: Dimensions.get('screen').width - 20,
    height: 250,
    borderRadius: 20,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 20
  }
});
export default styles;