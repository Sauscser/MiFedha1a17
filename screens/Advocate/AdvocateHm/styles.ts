import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  floatimage: {
    width: '100%',
    height: "100%",
    resizeMode: 'cover',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: "5%",
    backgroundColor: '#e58d29',
  },

  floatMainView: {
    backgroundColor: '#72ebd8',
    marginHorizontal: "5%",
    
    height: "20%",
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: "2%",
    
  },
  

  viewForFloatPressables: {
    backgroundColor: '#72ebd8',
    
    marginHorizontal: "5%",
    height: "70%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    
    
    
  },

  floatView: {
    backgroundColor: '#e58d29',
    height:"80%",
    borderRadius: 20,
    flex:2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft:"1%",
    marginRight:"1%"
  },

  

  
  floatPressableText: {
    color: 'black',
    fontSize: 15,
    marginTop: "1%",
  },

  floatPressableText2: {
    color: 'black',
    fontSize: 11,
    marginTop: "1%",
  },

  
  floatText: {
    fontSize: 25,
    color: 'white',
  },
});
export default styles;