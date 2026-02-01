import React from 'react';
import {View, Text,   ScrollView} from 'react-native';


import styles from './styles';


export interface SMAccount {
    SMAc: {     
    AdminId:string,
      agentwithdrawalFee: number,
      agentCom: number,
      sagentCom: number,
      companyCom: number,
      AdvCom: number,
      bankAdminCom: number,
      sawithdrawalFee: number,
      advuserwithdrawalFee: number,
      bankAdmuserwithdrawalFee: number,
      userLoanTransferFee: number,
      userTransferFee: number,
      userClearanceFee: number,
      CoverageFee: number,
    
      enquiryFee: number,
      UsrWthdrwlFees: number,
    
      ttlNonLonssRecSM: number,
      ttlNonLonssSentSM:number,
    
      ttlNonLonssRecChm: number,
      ttlNonLonssSentChm:number,
    
      companyEarningBal: number,
      companyEarning: number,
      agentEarningBal: number,
      agentEarning: number,
      saEarningBal: number,
      saEarning: number,
      AdvEarningBal: number,
      AdvEarning: number,
      admEarningBal: number,
      admEarning: number,
    
      ttlUsrDep: number,
      ttlUserWthdrwl: number,
      agentFloatIn: number,
      agentFloatOut: number,
      ttlActiveUsers: number,
      ttlInactvUsrs: number,
      ttlBLUsrs: number,
      ttlActiveChm: number,
      ttlInactvChm: number,
      ttlBLChm: number,
      ttlActiveChmUsers: number,
      ttlInactvChmUsrs: number,
      ttlBLChmUsrs: number,
      
      
      ttlKFNdgActv: number,
      ttlKFNdgInActv: number,
      ttlKNdgBLStts: number,
      ttlKFKbwActv: number,
      ttlKFKbwInActv: number,
      ttlKKbwBLStts: number,
      ttlKFAdvActv: number,
      ttlKFAdvInActv: number,
      ttlKAdvBLStts: number,
      ttlKFAdmActv: number,
      ttlKFAdmInActv: number,
      ttlKAdmBLStts: number,
    
      ttlSMLnsInAmtCov: number,
      ttlChmLnsInAmtCov: number,
      ttlSellerLnsInAmtCov: number,
      ttlSMLnsInActvAmtCov: number,
      ttlChmLnsInActvAmtCov: number,
      ttlSellerLnsInActvAmtCov: number,
      ttlSMLnsInClrdAmtCov: number,
      ttlChmLnsInClrdAmtCov: number,
      ttlSellerLnsInClrdAmtCov: number,
      ttlSMLnsInBlAmtCov: number,
      ttlChmLnsInBlAmtCov: number,
      ttlSellerLnsInBlAmtCov: number,
      
      ttlSMLnsInTymsCov: number,
      ttlChmLnsInTymsCov: number,
      ttlSellerLnsInTymsCov: number,
      ttlSMLnsInActvTymsCov: number,
      ttlChmLnsInActvTymsCov: number,
      ttlSellerLnsInActvTymsCov: number,
      ttlSMLnsInClrdTymsCov: number,
      ttlChmLnsInClrdTymsCov: number,
      ttlSellerLnsInClrdTymsCov: number,
      ttlSMLnsInBlTymsCov: number,
      ttlChmLnsInBlTymsCov: number,
      ttlSellerLnsInBlTymsCov: number,
      
      ttlCompTrnsfrEarningsCov: number,
      ttlCompBLClrncEarningsCov: number,
    
      ttlSMLnsInAmtNonCov: number,
      ttlChmLnsInAmtNonCov: number,
      ttlSellerLnsInAmtNonCov: number,
      ttlSMLnsInActvAmtNonCov: number,
      ttlChmLnsInActvAmtNonCov: number,
      ttlSellerLnsInActvAmtNonCov: number,
      ttlSMLnsInClrdAmtNonCov: number,
      ttlChmLnsInClrdAmtNonCov: number,
      ttlSellerLnsInClrdAmtNonCov: number,
      ttlSMLnsInBlAmtNonCov: number,
      ttlChmLnsInBlAmtNonCov: number,
      ttlSellerLnsInBlAmtNonCov: number,
      
      ttlSMLnsInTymsNonCov: number,
      ttlChmLnsInTymsNonCov: number,
      ttlSellerLnsInTymsNonCov: number,
      ttlSMLnsInActvTymsNonCov: number,
      ttlChmLnsInActvTymsNonCov: number,
      ttlSellerLnsInActvTymsNonCov: number,
      ttlSMLnsInClrdTymsNonCov: number,
      ttlChmLnsInClrdTymsNonCov: number,
      ttlSellerLnsInClrdTymsNonCov: number,
      ttlSMLnsInBlTymsNonCov: number,
      ttlChmLnsInBlTymsNonCov: number,
      ttlSellerLnsInBlTymsNonCov: number,
      
      ttlCompTrnsfrEarningsNonCov: number,
      ttlCompBLClrncEarningsNonCov: number,
      ttlCompCovEarnings: number,
    
      maxInterestSM: number,
      maxInterestCredSllr: number,
      maxInterestGrp: number,
    
      maxMFNdogos:number,
      maxBLs:number,
    
      
      totalLnsRecovered: number,

      companyEmail: string,
      termsNconditions: string,
      alert: string,
      about: string,
      policy: string,
      privacy: string,
      recom: string,

   }} const SMCvLnStts = (props:SMAccount) => {
      const {
         SMAc: {
            AdminId,
            companyEarningBal,
            companyEarning,
            agentEarningBal,
            agentEarning,
            saEarningBal,
            saEarning,
            AdvEarningBal,
            AdvEarning,
            
            agentCom,
            sagentCom,
            companyCom,
            AdvCom,
            
            userLoanTransferFee,
            userTransferFee,
            userClearanceFee,
            CoverageFee,
          
            enquiryFee,
            UsrWthdrwlFees,

            maxInterestSM,
            maxInterestCredSllr,
            maxInterestGrp,
          
            maxMFNdogos,
            maxBLs,
          
            
            totalLnsRecovered,
          
            ttlNonLonssRecSM,
            ttlNonLonssSentSM,
          
            ttlNonLonssRecChm,
            ttlNonLonssSentChm,
            
            ttlCompTrnsfrEarningsCov,
            ttlCompBLClrncEarningsCov,
          
            ttlCompTrnsfrEarningsNonCov,
            ttlCompBLClrncEarningsNonCov,
            ttlCompCovEarnings,
          
          
            ttlUsrDep,
            ttlUserWthdrwl,
            agentFloatIn,
            agentFloatOut,


            ttlActiveUsers,
            ttlInactvUsrs,
            ttlBLUsrs,
            ttlActiveChm,
            ttlInactvChm,
            ttlBLChm,
            ttlActiveChmUsers,
            ttlInactvChmUsrs,
            ttlBLChmUsrs,         
            ttlKFNdgActv,
            ttlKFNdgInActv,
            ttlKNdgBLStts,
            ttlKFKbwActv,
            ttlKFKbwInActv,
            ttlKKbwBLStts,
            ttlKFAdvActv,
            ttlKFAdvInActv,
            ttlKAdvBLStts,
            ttlKFAdmActv,
            ttlKFAdmInActv,
            ttlKAdmBLStts,
          
            ttlSMLnsInAmtCov,
            ttlChmLnsInAmtCov,
            ttlSellerLnsInAmtCov,
            ttlSMLnsInActvAmtCov,
            ttlChmLnsInActvAmtCov,
            ttlSellerLnsInActvAmtCov,
            ttlSMLnsInClrdAmtCov,
            ttlChmLnsInClrdAmtCov,
            ttlSellerLnsInClrdAmtCov,
            ttlSMLnsInBlAmtCov,
            ttlChmLnsInBlAmtCov,
            ttlSellerLnsInBlAmtCov,
            
            ttlSMLnsInTymsCov,
            ttlChmLnsInTymsCov,
            ttlSellerLnsInTymsCov,
            ttlSMLnsInActvTymsCov,
            ttlChmLnsInActvTymsCov,
            ttlSellerLnsInActvTymsCov,
            ttlSMLnsInClrdTymsCov,
            ttlChmLnsInClrdTymsCov,
            ttlSellerLnsInClrdTymsCov,
            ttlSMLnsInBlTymsCov,
            ttlChmLnsInBlTymsCov,
            ttlSellerLnsInBlTymsCov,
            
            
            ttlSMLnsInAmtNonCov,
            ttlChmLnsInAmtNonCov,
            ttlSellerLnsInAmtNonCov,
            ttlSMLnsInActvAmtNonCov,
            ttlChmLnsInActvAmtNonCov,
            ttlSellerLnsInActvAmtNonCov,
            ttlSMLnsInClrdAmtNonCov,
            ttlChmLnsInClrdAmtNonCov,
            ttlSellerLnsInClrdAmtNonCov,
            ttlSMLnsInBlAmtNonCov,
            ttlChmLnsInBlAmtNonCov,
            ttlSellerLnsInBlAmtNonCov,
            
            ttlSMLnsInTymsNonCov,
            ttlChmLnsInTymsNonCov,
            ttlSellerLnsInTymsNonCov,
            ttlSMLnsInActvTymsNonCov,
            ttlChmLnsInActvTymsNonCov,
            ttlSellerLnsInActvTymsNonCov,
            ttlSMLnsInClrdTymsNonCov,
            ttlChmLnsInClrdTymsNonCov,
            ttlSellerLnsInClrdTymsNonCov,
            ttlSMLnsInBlTymsNonCov,
            ttlChmLnsInBlTymsNonCov,
            ttlSellerLnsInBlTymsNonCov,
            
            
            
      
            companyEmail,
            termsNconditions,
            alert,
            about,
            policy,
            privacy,
            recom,
         }}= props ;

 
    return (
        <View style = {styles.container}>              
            
            
            <View style = {{alignItems:"center"}}>
            <Text style = {styles.subTitle}>                       
                       {/*loaner details */}   
                       Cash Flow              
                    </Text>
            </View>
                  
                  
            
            <ScrollView >              
                       
                        
                     

                    <Text style = {styles.ownerName}>                       
                       {/*loaner details */}   
                       Total Company Earnings (Ksh): {companyEarning.toFixed(2)}                 
                    </Text>

                    <Text style = {styles.ownerName}>                       
                       {/*loaner details */}   
                       Ac Balance (Ksh): {companyEarningBal.toFixed(2)}                 
                    </Text>

                    <Text style = {styles.ownerContact}>                       
                       {/*loaner details */}  
                       Total Agent Earning (Ksh): {agentEarning.toFixed(2)}                
                    </Text>                     
                    <Text style ={styles.amountoffered}>                       
                       {/* amount*/} 
                      Total Agent Balance (Ksh): {agentEarningBal.toFixed(2)}
                    </Text>   
                    <Text style = {styles.repaymentPeriod}>                       
                       {/* repaymentPeriod*/}
                      Total MFKubwa Earning (Ksh): {saEarning.toFixed(2)}                  
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       Total MFKubwa Balance : {saEarningBal.toFixed(2)}                    
                    </Text> 

                    <Text style = {styles.ownerContact}>                       
                       {/*loaner details */}  
                       Total Advocate Earning (Ksh): {AdvEarning.toFixed(2)}                
                    </Text>                     
                    <Text style ={styles.amountoffered}>                       
                       {/* amount*/} 
                      Total Advocate Balance (Ksh): {AdvEarningBal.toFixed(2)}
                    </Text>   

                     <Text style = {styles.ownerName}>                       
                       {/*loaner details */}   
                       Total Loans Recovered (Ksh): {totalLnsRecovered.toFixed(2)}                 
                    </Text>

                    <Text style = {styles.ownerName}>                       
                       {/*loaner details */}   
                       Total NonLoans From SM (Ksh): {ttlNonLonssRecSM.toFixed(2)}                 
                    </Text>

                    <Text style = {styles.ownerContact}>                       
                       {/*loaner details */}  
                       Total NonLoans to SM (Ksh): {ttlNonLonssSentSM.toFixed(2)}                
                    </Text>                     
                    <Text style ={styles.amountoffered}>                       
                       {/* amount*/} 
                      Total NonLoans From Chama (Ksh): {ttlNonLonssRecChm.toFixed(2)}
                    </Text> 
                    <Text style = {styles.repaymentPeriod}>                       
                       {/* repaymentPeriod*/}
                      Total NonLoans To Chama (Ksh): {ttlNonLonssSentChm.toFixed(2)}                  
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       Total User Deposits Ksh : {ttlUsrDep.toFixed(2)}                
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       Total User Withdrawals (Ksh) : {ttlUserWthdrwl.toFixed(2)}                
                    </Text> 
                    <Text style = {styles.ownerContact}>                       
                       {/*loaner details */}  
                     NonCov Transfer Earnings (Ksh): {ttlCompTrnsfrEarningsNonCov.toFixed(2)}                
                    </Text>                     
                    <Text style ={styles.amountoffered}>                       
                       {/* amount*/} 
                      NonCov BL Clearance Earnings (Ksh): {ttlCompBLClrncEarningsNonCov.toFixed(2)}
                    </Text> 
                    <Text style = {styles.ownerContact}>                       
                       {/*loaner details */}  
                     Transfer Cov Earnings (Ksh): {ttlCompTrnsfrEarningsCov.toFixed(2)}                
                    </Text>                     
                    <Text style ={styles.amountoffered}>                       
                       {/* amount*/} 
                      Cov BL Clearance Earnings (Ksh): {ttlCompBLClrncEarningsCov.toFixed(2)}
                    </Text> 
                    <Text style = {styles.repaymentPeriod}>                       
                       {/* repaymentPeriod*/}
                      Coverage Earnings (Ksh): {ttlCompCovEarnings.toFixed(2)}                  
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       Total Float In (Ksh) : {agentFloatIn.toFixed(2)}                    
                    </Text> 

                    <Text style = {styles.ownerContact}>                       
                       {/*loaner details */}  
                       Float Out (Ksh): {agentFloatOut.toFixed(2)}                
                    </Text>                     
                    




                    
                    <View style = {{alignItems:"center"}}>
                        <Text style = {styles.subTitle}>                       
                       {/*loaner details */}   
                       Transaction Fees         
                        </Text>
                     </View>
                    <Text style = {styles.repaymentPeriod}>                       
                       {/* repaymentPeriod*/}
                      Loan Transaction Fee: {userLoanTransferFee}                  
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      User Transfer Fee: {userTransferFee}                    
                    </Text> 
                   <Text style = {styles.interest}>                       
                       {/* interest*/}
                       User Transfer Fee: {userClearanceFee}                    
                    </Text> 
                    
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      Loan Coverage Fee: {CoverageFee}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      Coverage Fee: {enquiryFee}                    
                    </Text> 

                    <Text style = {styles.ownerName}>                       
                       {/*loaner details */}   
                     User Withdrawal Fee: {UsrWthdrwlFees}                 
                    </Text>

                    <Text style = {styles.repaymentPeriod}>                       
                       {/* repaymentPeriod*/}
                      MFNdogo Commission: {agentCom}                  
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      MFKubwa commission: {sagentCom}                    
                    </Text> 
                   <Text style = {styles.interest}>                       
                       {/* interest*/}
                       Company Commission: {companyCom}                    
                    </Text> 
                    
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      Advocate Commission: {AdvCom}                    
                    </Text> 
                    



                    <View style = {{alignItems:"center"}}>
                        <Text style = {styles.subTitle}>                       
                       {/*loaner details */}   
                      Maximums           
                        </Text>
                     </View>
                    <Text style = {styles.ownerName}>                       
                       {/*loaner details */}   
                       Max Interest for SM: {maxInterestSM}                 
                    </Text>
                    <Text style = {styles.ownerContact}>                       
                       {/*loaner details */}  
                      Max Interest for Credit Seller: {maxInterestCredSllr}                
                    </Text>                     
                    <Text style ={styles.amountoffered}>                       
                       {/* amount*/} 
                       Max Interest for Chama: {maxInterestGrp}
                    </Text>   
                    <Text style = {styles.repaymentPeriod}>                       
                       {/* repaymentPeriod*/}
                       Max MFNdogos: {maxMFNdogos}                  
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                     Max BListings: {maxBLs}                    
                    </Text> 




                    <View style = {{alignItems:"center"}}>
                        <Text style = {styles.subTitle}>                       
                       {/*loaner details */}   
                      StakeHolders          
                        </Text>
                     </View>
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       Total Active Users: {ttlActiveUsers}                    
                    </Text>                     
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       Total Inactive Users: {ttlInactvUsrs}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       Total BListed Users: {ttlBLUsrs}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      Total Active Chama: {ttlActiveChm}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       Total Inactive Chama: {ttlInactvChm}                    
                    </Text> 
                    
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      Total BListed Chama: {ttlBLChm}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                   Total Active Chama Members: {ttlActiveChmUsers}                    
                    </Text>
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       Total Inactive Chama Members: {ttlInactvChmUsrs}                    
                    </Text>                     
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       Total BListed Chama Members: {ttlBLChmUsrs}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       Total Active MFNdogo: {ttlKFNdgActv}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       Total Inactive MFNdogo: {ttlKFNdgInActv}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       Total BListed MFNdogo: {ttlKNdgBLStts}                    
                    </Text>                     
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      Total Active MFKubwa: {ttlKFKbwActv}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                   Total Inactive MFKubwa: {ttlKFKbwInActv}                    
                    </Text> 

                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       Total BListed MFKubwa: {ttlKKbwBLStts}                    
                    </Text>                     
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       Total BListed Chama Members: {ttlBLChmUsrs}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       Total Active Advocates: {ttlKFAdvActv}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       Total Inactive Advocates: {ttlKFAdvInActv}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       Total BListed Advocates: {ttlKAdvBLStts}                    
                    </Text>                     
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      Total Active Administrators: {ttlKFAdmActv}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                   Total Inactive Administrators: {ttlKFAdmInActv}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       Total BListed Administrators: {ttlKAdmBLStts}                    
                    </Text>  



                    <View style = {{alignItems:"center"}}>
                        <Text style = {styles.subTitle}>                       
                       {/*loaner details */}   
                      Covered Loan Amount           
                        </Text>
                     </View>
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                     Total SM  Loans (Ksh): {ttlSMLnsInAmtCov.toFixed(2)}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      Total Chama Loans (Ksh): {ttlChmLnsInAmtCov.toFixed(2)}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      Total CredSales Loans (Ksh): {ttlSellerLnsInAmtCov}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                     Inactive SM Loans (Ksh): {ttlSMLnsInActvAmtCov.toFixed(2)}                    
                    </Text>                     
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                     Total Inactive Chama Loans (Ksh): {ttlChmLnsInActvAmtCov}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       Total Inactive Sales (Ksh): {ttlSellerLnsInActvAmtCov.toFixed(2)}                    
                    </Text>

                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                     Total SM Cleared Loans (Ksh): {ttlSMLnsInClrdAmtCov.toFixed(2)}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      Total Chama Cleared Loans (Ksh): {ttlChmLnsInClrdAmtCov.toFixed(2)}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      Total CredSales Cleared Loans (Ksh): {ttlSellerLnsInClrdAmtCov.toFixed(2)}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                     Total SM BListed Loans (Ksh): {ttlSMLnsInBlAmtCov.toFixed(2)}                    
                    </Text>                     
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                     Total BListted Chama Loans (Ksh): {ttlChmLnsInBlAmtCov.toFixed(2)}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       Total BListed Sales (Ksh): {ttlSellerLnsInBlAmtCov.toFixed(2)}                    
                    </Text>




                    <View style = {{alignItems:"center"}}>
                        <Text style = {styles.subTitle}>                       
                       {/*loaner details */}   
                      Covered Loan Times           
                        </Text>
                     </View>
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      SM  Loans (Ksh): {ttlSMLnsInTymsCov}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       Chama Loans (Ksh): {ttlChmLnsInTymsCov}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       CredSales Loans (Ksh): {ttlSellerLnsInTymsCov}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      SM Loans (Ksh): {ttlSMLnsInActvTymsCov}                    
                    </Text>                     
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      Inactive Chama Loans (Ksh): {ttlChmLnsInActvTymsCov}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                        Inactive Sales (Ksh): {ttlSellerLnsInActvTymsCov}                    
                    </Text>

                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      SM Cleared Loans (Ksh): {ttlSMLnsInClrdTymsCov}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       Chama Cleared Loans (Ksh): {ttlChmLnsInClrdTymsCov}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       CredSales Cleared Loans (Ksh): {ttlSellerLnsInClrdTymsCov}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      SM BListed Loans (Ksh): {ttlSMLnsInBlTymsCov}                    
                    </Text>                     
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      BListted Chama Loans (Ksh): {ttlChmLnsInBlTymsCov}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                        BListed Sales (Ksh): {ttlSellerLnsInBlTymsCov}                    
                    </Text>




                    <View style = {{alignItems:"center"}}>
                        <Text style = {styles.subTitle}>                       
                       {/*loaner details */}   
                      NonCovered Loan Amount           
                        </Text>
                     </View>
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                     Total SM  Loans (Ksh): {ttlSMLnsInAmtNonCov.toFixed(2)}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      Total Chama Loans (Ksh): {ttlChmLnsInAmtNonCov.toFixed(2)}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      Total CredSales Loans (Ksh): {ttlSellerLnsInAmtNonCov}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                     Inactive SM Loans (Ksh): {ttlSMLnsInActvAmtNonCov.toFixed(2)}                    
                    </Text>                     
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                     Total Inactive Chama Loans (Ksh): {ttlChmLnsInActvAmtNonCov}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       Total Inactive Sales (Ksh): {ttlSellerLnsInActvAmtNonCov.toFixed(2)}                    
                    </Text>

                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                     Total SM Cleared Loans (Ksh): {ttlSMLnsInClrdAmtNonCov.toFixed(2)}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      Total Chama Cleared Loans (Ksh): {ttlChmLnsInClrdAmtNonCov.toFixed(2)}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      Total CredSales Cleared Loans (Ksh): {ttlSellerLnsInClrdAmtNonCov.toFixed(2)}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                     Total SM BListed Loans (Ksh): {ttlSMLnsInBlAmtNonCov.toFixed(2)}                    
                    </Text>                     
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                     Total BListted Chama Loans (Ksh): {ttlChmLnsInBlAmtNonCov.toFixed(2)}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       Total BListed Sales (Ksh): {ttlSellerLnsInBlAmtNonCov.toFixed(2)}                    
                    </Text>




                    <View style = {{alignItems:"center"}}>
                        <Text style = {styles.subTitle}>                       
                       {/*loaner details */}   
                      Covered Loan Times           
                        </Text>
                     </View>
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      SM  Loans (Ksh): {ttlSMLnsInTymsNonCov}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       Chama Loans (Ksh): {ttlChmLnsInTymsNonCov}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       CredSales Loans (Ksh): {ttlSellerLnsInTymsNonCov}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      SM Loans (Ksh): {ttlSMLnsInActvTymsCov}                    
                    </Text>                     
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      Inactive Chama Loans (Ksh): {ttlChmLnsInActvTymsNonCov}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                        Inactive Sales (Ksh): {ttlSellerLnsInActvTymsNonCov}                    
                    </Text>

                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      SM Cleared Loans (Ksh): {ttlSMLnsInClrdTymsNonCov}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       Chama Cleared Loans (Ksh): {ttlChmLnsInClrdTymsNonCov}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                       CredSales Cleared Loans (Ksh): {ttlSellerLnsInClrdTymsNonCov}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      SM BListed Loans (Ksh): {ttlSMLnsInBlTymsNonCov}                    
                    </Text>                     
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                      BListted Chama Loans (Ksh): {ttlChmLnsInBlTymsNonCov}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                        BListed Sales (Ksh): {ttlSellerLnsInBlTymsNonCov}                    
                    </Text>






                    <View style = {{alignItems:"center"}}>
                        <Text style = {styles.subTitle}>                       
                       {/*loaner details */}   
                       Company Other Details           
                        </Text>
                     </View>
                    <Text style = {styles.ownerName}>                       
                       {/*loaner details */}   
                       Email: {companyEmail}                 
                    </Text>
                    <Text style = {styles.ownerContact}>                       
                       {/*loaner details */}  
                      Terms and Conditions: {termsNconditions}                
                    </Text>                     
                    <Text style ={styles.amountoffered}>                       
                       {/* amount*/} 
                      Alert: {alert}
                    </Text>   
                    <Text style = {styles.repaymentPeriod}>                       
                       {/* repaymentPeriod*/}
                     About: {about}                  
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                     Policy: {policy}                    
                    </Text> 
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                     Privacy: {privacy}                    
                    </Text>                     
                    <Text style = {styles.interest}>                       
                       {/* interest*/}
                     Recommendation: {recom}                    
                    </Text> 
                   
            
        </ScrollView>
                
        </View>
    );
}; 

export default SMCvLnStts