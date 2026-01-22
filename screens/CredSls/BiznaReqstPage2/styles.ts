import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: "100%",
    resizeMode: 'cover',
    
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 1,
    flexWrap:"wrap"
  },

  accountView: {
    backgroundColor: '#e58d29',
    marginHorizontal: 10,
    width: Dimensions.get('screen').width - 20,
    height: "32%",
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: "5%",
  },

  
  acPressables: {
    backgroundColor: '#e58d29',
    
    height: "60%",
    borderRadius: 5,
    marginTop: "4%",
    marginLeft:"2%",
    marginRight:"2%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',

    width: "30%",
  },

  acNonLnsPressables: {
    backgroundColor: 'skyblue',
    
    height: "99%",
    borderRadius: 5,
    marginTop: "4%",
    marginLeft:"2%",
    marginRight:"2%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    
    width: "45%",
  },

  viewForSalesPressables: {
    backgroundColor: '#72ebd8',
    marginHorizontal: 15,
    width: Dimensions.get('screen').width - 30,
    height: "70%",
    borderRadius: 20,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  acPressableText: {
    color: 'white',
    fontSize: 12,
    marginTop: 1,
  },

  accountText: {
    fontSize: 25,
    color: 'white',
  },
});
export default styles;