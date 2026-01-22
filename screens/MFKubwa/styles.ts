import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  kfkubwaimage: {
    width: '100%',
    height: "100%",
    resizeMode: 'cover',
  
    backgroundColor: '#e58d29',
  },
  

  viewForkfkubwaPressables: {
    backgroundColor: 'skyblue',
    
    flex:10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 20,
    padding:4
    
  },

  kfkubwaView: {
    backgroundColor: '#e58d29',
    height:"80%",
    borderRadius: 20,
    flex:2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  
  },

  
  kfkubwaPressableText: {
    color: 'black',
    fontSize: 15,
    marginTop: 1,
  },

  

  kfkubwaMainView: {
    backgroundColor: '#e58d29',
    marginHorizontal: 10,
    width: Dimensions.get('screen').width - 20,
    height: "20%",
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: "5%",
    
   
  },
  kfkubwaText: {
    fontSize: 25,
    color: 'white',
  },
});
export default styles;