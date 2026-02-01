import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create ({
    container: {
        margin: 25,
        
    },

    
    ownerName: {
        fontSize: 15,
        fontWeight: '900',
        color: '#ad1c65'
    },

    ownerContact: {
        fontSize: 15,
        fontWeight: '900',
        color: '#981658'
    },

    amountoffered: {
        fontSize: 15,
        fontWeight: '900',
        color: '#88124e',
        
    },

    subTitle: {
        fontSize: 25,
        fontWeight: '900',
        color: '#88124e',
        marginTop:"5%",
        textDecorationLine: "underline"
    },


    repaymentPeriod: {
        fontSize: 15,
        fontWeight: '900',
        color: '#7b0e45'
    },

    interest: {
        fontSize: 15,
        fontWeight: '900',
        color: '#69093a'
    },

    

    loanerotherdescriptions: {
        fontSize: 15,
        fontWeight: '900',
        color: '#420423'
    }, 

    loanAdvert: {
        fontSize:35,
        justifyContent: 'center',
        color: 'blue',
        
        top: 2
    },

    image: {
        width: '100%',
        height: "100%",
        resizeMode: 'cover',
        top:"2%",
        
        alignItems: 'center',
        flexDirection: 'column',
    
        backgroundColor: 'white',
      },

      viewForPressables1: {
        backgroundColor: 'white',
        
        width: "100%",
        height: "40%",
        borderRadius: 20,
        marginTop: "8%",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
       
      },
    
      viewForPressables2: {
        
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        
        width:"100%"

      },
      title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'skyblue',
        width: '70%',
        marginLeft: "5%",
        
      },

         
      loanFriendButton: {
        
        width: "50%",
        marginRight:"20%",
        marginLeft:"20%",
        marginTop:"10%"
      
      },

      viewForPressables3: {
        backgroundColor: '#72ebd8',
        marginHorizontal: 10,
        width: Dimensions.get('screen').width - 20,
        height: "25%",
        borderRadius: 20,
        marginTop: "9%",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      },

      viewForPressables4: {
        backgroundColor: 'white',
        height: "30%",
        borderRadius: 30,
        marginHorizontal: 30,
        width: Dimensions.get('screen').width - 60,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: "1%",
      },

      chamaLoanAndCreditSalesButton4: {
        backgroundColor: 'white',
        height: "90%",
        borderRadius: 30,
        width:"90%",
        justifyContent: 'center',
        alignItems: 'center',
    
        marginTop: "1%",
      },
    
    
      chamaLoanAndCreditSalesButton: {
        backgroundColor: 'white',
        height: "50%",
        borderRadius: 30,
        marginHorizontal: 30,
        width: Dimensions.get('screen').width - 60,
        justifyContent: 'center',
        alignItems: 'center',
    
        marginTop: "1%",
      },
    
     
    
      chamaLoanAndCreditSalesButton5: {
        backgroundColor: 'white',
        height: "90%",
        borderRadius: 30,
        width:"90%",
        justifyContent: 'center',
        alignItems: 'center',
    
        marginTop: "1%",
      },
    
      ChamaLoanAndCreditSalesText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: 'black',
        
      },
    
      ChamaLoanAndCreditSalesText4: {
        fontSize: 10,
        fontWeight: 'bold',
        color: 'black',
        
      },
    
      loanAFriendText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'black',
        
      },
    

    
      
});
export default styles