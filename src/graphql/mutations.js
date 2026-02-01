/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const sendNotification = /* GraphQL */ `
  mutation SendNotification(
    $riderEmail: String!
    $title: String!
    $body: String!
  ) {
    sendNotification(riderEmail: $riderEmail, title: $title, body: $body) {
      success
      message
      __typename
    }
  }
`;
export const createSMAccount = /* GraphQL */ `
  mutation CreateSMAccount(
    $input: CreateSMAccountInput!
    $condition: ModelSMAccountConditionInput
  ) {
    createSMAccount(input: $input, condition: $condition) {
      nationalid
      name
      phonecontact
      awsemail
      balance
      benefitsAmount
      p2pchmBenefits
      pw
      nationality
      MFKubwaCost
      MFKubwaNetCost
      MFNdogoDue
      MFNdogoNet
      beneficiary
      beneficiaryAmt
      loanAcceptanceCode
      mfchampEarnings
      ttlDpstSM
      TtlWthdrwnSM
      TtlActvLonsTmsLnrCov
      TtlActvLonsTmsLneeCov
      TtlActvLonsAmtLnrCov
      TtlActvLonsAmtLneeCov
      TtlBLLonsTmsLnrCov
      TtlBLLonsTmsLneeCov
      TtlBLLonsAmtLnrCov
      TtlBLLonsAmtLneeCov
      TtlClrdLonsTmsLnrCov
      TtlClrdLonsTmsLneeCov
      TtlClrdLonsAmtLnrCov
      TtlClrdLonsAmtLneeCov
      TtlActvLonsTmsLneeChmCov
      TtlActvLonsAmtLneeChmCov
      TtlBLLonsTmsLneeChmCov
      TtlBLLonsAmtLneeChmCov
      TtlClrdLonsTmsLneeChmCov
      TtlClrdLonsAmtLneeChmCov
      TtlActvLonsTmsSllrCov
      TtlActvLonsTmsByrCov
      TtlActvLonsAmtSllrCov
      TtlActvLonsAmtByrCov
      TtlBLLonsTmsSllrCov
      TtlBLLonsTmsByrCov
      TtlBLLonsAmtSllrCov
      TtlBLLonsAmtByrCov
      TtlClrdLonsTmsSllrCov
      TtlClrdLonsTmsByrCov
      TtlClrdLonsAmtSllrCov
      TtlClrdLonsAmtByrCov
      TtlActvLonsTmsLnrNonCov
      TtlActvLonsTmsLneeNonCov
      TtlActvLonsAmtLnrNonCov
      TtlActvLonsAmtLneeNonCov
      TtlBLLonsTmsLnrNonCov
      TtlBLLonsTmsLneeNonCov
      TtlBLLonsAmtLnrNonCov
      TtlBLLonsAmtLneeNonCov
      TtlClrdLonsTmsLnrNonCov
      TtlClrdLonsTmsLneeNonCov
      TtlClrdLonsAmtLnrNonCov
      TtlClrdLonsAmtLneeNonCov
      TtlActvLonsTmsLneeChmNonCov
      TtlActvLonsAmtLneeChmNonCov
      TtlBLLonsTmsLneeChmNonCov
      TtlBLLonsAmtLneeChmNonCov
      TtlClrdLonsTmsLneeChmNonCov
      TtlClrdLonsAmtLneeChmNonCov
      TtlActvLonsTmsSllrNonCov
      TtlActvLonsTmsByrNonCov
      TtlActvLonsAmtSllrNonCov
      TtlActvLonsAmtByrNonCov
      TtlBLLonsTmsSllrNonCov
      TtlBLLonsTmsByrNonCov
      TtlBLLonsAmtSllrNonCov
      TtlBLLonsAmtByrNonCov
      TtlClrdLonsTmsSllrNonCov
      TtlClrdLonsTmsByrNonCov
      TtlClrdLonsAmtSllrNonCov
      TtlClrdLonsAmtByrNonCov
      TtlActvLonsTmsLnrCredSlsP2P
      TtlActvLonsAmtLnrCredSlsP2P
      TtlBLLonsTmsLnrCredSlsP2P
      TtlBLLonsAmtLnrCredSlsP2P
      TtlClrdLonsTmsLnrCredSlsP2P
      TtlClrdLonsAmtLnrCredSlsP2P
      TtlActvLonsTmsLnrCredSlsP2B
      TtlActvLonsAmtLnrCredSlsP2B
      TtlBLLonsTmsLnrCredSlsP2B
      TtlBLLonsAmtLnrCredSlsP2B
      TtlClrdLonsTmsLnrCredSlsP2B
      TtlClrdLonsAmtLnrCredSlsP2B
      TtlActvLonsTmsLneeB2P
      TtlActvLonsAmtLneeB2P
      TtlBLLonsTmsLneeB2P
      TtlBLLonsAmtLneeB2P
      TtlClrdLonsLneeB2P
      TtlClrdLonsAmtLneeB2P
      TtlActvLonsTmsLneeP2P
      TtlActvLonsAmtLneeP2P
      TtlBLLonsTmsLneeP2P
      TtlBLLonsAmtLneeP2P
      TtlClrdLonsLneeP2P
      TtlClrdLonsAmtLneeP2P
      TtlActvLonsTmsLnrP2P
      TtlActvLonsAmtLnrP2P
      TtlBLLonsTmsLnrP2P
      TtlBLLonsAmtLnrP2P
      TtlClrdLonsLnrP2P
      TtlClrdLonsAmtLnrP2P
      ttlNonLonsRecSM
      ttlNonLonsSentSM
      ttlNonLonsRecChm
      ttlNonLonsSentChm
      MaxTymsBL
      MaxTymsIHvBL
      MaxAcBal
      TymsIHvGivnLn
      TymsMyLnClrd
      DefaultPenaltySM
      loanStatus
      acStatus
      deActvtnReason
      blStatus
      loanLimit
      nonLonLimit
      withdrawalLimit
      depositLimit
      owner
      createdAt
      beneficiaryType
      photoPassport
      idFront
      idBack
      updatedAt
      __typename
    }
  }
`;
export const updateSMAccount = /* GraphQL */ `
  mutation UpdateSMAccount(
    $input: UpdateSMAccountInput!
    $condition: ModelSMAccountConditionInput
  ) {
    updateSMAccount(input: $input, condition: $condition) {
      nationalid
      name
      phonecontact
      awsemail
      balance
      benefitsAmount
      p2pchmBenefits
      pw
      nationality
      MFKubwaCost
      MFKubwaNetCost
      MFNdogoDue
      MFNdogoNet
      beneficiary
      beneficiaryAmt
      loanAcceptanceCode
      mfchampEarnings
      ttlDpstSM
      TtlWthdrwnSM
      TtlActvLonsTmsLnrCov
      TtlActvLonsTmsLneeCov
      TtlActvLonsAmtLnrCov
      TtlActvLonsAmtLneeCov
      TtlBLLonsTmsLnrCov
      TtlBLLonsTmsLneeCov
      TtlBLLonsAmtLnrCov
      TtlBLLonsAmtLneeCov
      TtlClrdLonsTmsLnrCov
      TtlClrdLonsTmsLneeCov
      TtlClrdLonsAmtLnrCov
      TtlClrdLonsAmtLneeCov
      TtlActvLonsTmsLneeChmCov
      TtlActvLonsAmtLneeChmCov
      TtlBLLonsTmsLneeChmCov
      TtlBLLonsAmtLneeChmCov
      TtlClrdLonsTmsLneeChmCov
      TtlClrdLonsAmtLneeChmCov
      TtlActvLonsTmsSllrCov
      TtlActvLonsTmsByrCov
      TtlActvLonsAmtSllrCov
      TtlActvLonsAmtByrCov
      TtlBLLonsTmsSllrCov
      TtlBLLonsTmsByrCov
      TtlBLLonsAmtSllrCov
      TtlBLLonsAmtByrCov
      TtlClrdLonsTmsSllrCov
      TtlClrdLonsTmsByrCov
      TtlClrdLonsAmtSllrCov
      TtlClrdLonsAmtByrCov
      TtlActvLonsTmsLnrNonCov
      TtlActvLonsTmsLneeNonCov
      TtlActvLonsAmtLnrNonCov
      TtlActvLonsAmtLneeNonCov
      TtlBLLonsTmsLnrNonCov
      TtlBLLonsTmsLneeNonCov
      TtlBLLonsAmtLnrNonCov
      TtlBLLonsAmtLneeNonCov
      TtlClrdLonsTmsLnrNonCov
      TtlClrdLonsTmsLneeNonCov
      TtlClrdLonsAmtLnrNonCov
      TtlClrdLonsAmtLneeNonCov
      TtlActvLonsTmsLneeChmNonCov
      TtlActvLonsAmtLneeChmNonCov
      TtlBLLonsTmsLneeChmNonCov
      TtlBLLonsAmtLneeChmNonCov
      TtlClrdLonsTmsLneeChmNonCov
      TtlClrdLonsAmtLneeChmNonCov
      TtlActvLonsTmsSllrNonCov
      TtlActvLonsTmsByrNonCov
      TtlActvLonsAmtSllrNonCov
      TtlActvLonsAmtByrNonCov
      TtlBLLonsTmsSllrNonCov
      TtlBLLonsTmsByrNonCov
      TtlBLLonsAmtSllrNonCov
      TtlBLLonsAmtByrNonCov
      TtlClrdLonsTmsSllrNonCov
      TtlClrdLonsTmsByrNonCov
      TtlClrdLonsAmtSllrNonCov
      TtlClrdLonsAmtByrNonCov
      TtlActvLonsTmsLnrCredSlsP2P
      TtlActvLonsAmtLnrCredSlsP2P
      TtlBLLonsTmsLnrCredSlsP2P
      TtlBLLonsAmtLnrCredSlsP2P
      TtlClrdLonsTmsLnrCredSlsP2P
      TtlClrdLonsAmtLnrCredSlsP2P
      TtlActvLonsTmsLnrCredSlsP2B
      TtlActvLonsAmtLnrCredSlsP2B
      TtlBLLonsTmsLnrCredSlsP2B
      TtlBLLonsAmtLnrCredSlsP2B
      TtlClrdLonsTmsLnrCredSlsP2B
      TtlClrdLonsAmtLnrCredSlsP2B
      TtlActvLonsTmsLneeB2P
      TtlActvLonsAmtLneeB2P
      TtlBLLonsTmsLneeB2P
      TtlBLLonsAmtLneeB2P
      TtlClrdLonsLneeB2P
      TtlClrdLonsAmtLneeB2P
      TtlActvLonsTmsLneeP2P
      TtlActvLonsAmtLneeP2P
      TtlBLLonsTmsLneeP2P
      TtlBLLonsAmtLneeP2P
      TtlClrdLonsLneeP2P
      TtlClrdLonsAmtLneeP2P
      TtlActvLonsTmsLnrP2P
      TtlActvLonsAmtLnrP2P
      TtlBLLonsTmsLnrP2P
      TtlBLLonsAmtLnrP2P
      TtlClrdLonsLnrP2P
      TtlClrdLonsAmtLnrP2P
      ttlNonLonsRecSM
      ttlNonLonsSentSM
      ttlNonLonsRecChm
      ttlNonLonsSentChm
      MaxTymsBL
      MaxTymsIHvBL
      MaxAcBal
      TymsIHvGivnLn
      TymsMyLnClrd
      DefaultPenaltySM
      loanStatus
      acStatus
      deActvtnReason
      blStatus
      loanLimit
      nonLonLimit
      withdrawalLimit
      depositLimit
      owner
      createdAt
      beneficiaryType
      photoPassport
      idFront
      idBack
      updatedAt
      __typename
    }
  }
`;
export const deleteSMAccount = /* GraphQL */ `
  mutation DeleteSMAccount(
    $input: DeleteSMAccountInput!
    $condition: ModelSMAccountConditionInput
  ) {
    deleteSMAccount(input: $input, condition: $condition) {
      nationalid
      name
      phonecontact
      awsemail
      balance
      benefitsAmount
      p2pchmBenefits
      pw
      nationality
      MFKubwaCost
      MFKubwaNetCost
      MFNdogoDue
      MFNdogoNet
      beneficiary
      beneficiaryAmt
      loanAcceptanceCode
      mfchampEarnings
      ttlDpstSM
      TtlWthdrwnSM
      TtlActvLonsTmsLnrCov
      TtlActvLonsTmsLneeCov
      TtlActvLonsAmtLnrCov
      TtlActvLonsAmtLneeCov
      TtlBLLonsTmsLnrCov
      TtlBLLonsTmsLneeCov
      TtlBLLonsAmtLnrCov
      TtlBLLonsAmtLneeCov
      TtlClrdLonsTmsLnrCov
      TtlClrdLonsTmsLneeCov
      TtlClrdLonsAmtLnrCov
      TtlClrdLonsAmtLneeCov
      TtlActvLonsTmsLneeChmCov
      TtlActvLonsAmtLneeChmCov
      TtlBLLonsTmsLneeChmCov
      TtlBLLonsAmtLneeChmCov
      TtlClrdLonsTmsLneeChmCov
      TtlClrdLonsAmtLneeChmCov
      TtlActvLonsTmsSllrCov
      TtlActvLonsTmsByrCov
      TtlActvLonsAmtSllrCov
      TtlActvLonsAmtByrCov
      TtlBLLonsTmsSllrCov
      TtlBLLonsTmsByrCov
      TtlBLLonsAmtSllrCov
      TtlBLLonsAmtByrCov
      TtlClrdLonsTmsSllrCov
      TtlClrdLonsTmsByrCov
      TtlClrdLonsAmtSllrCov
      TtlClrdLonsAmtByrCov
      TtlActvLonsTmsLnrNonCov
      TtlActvLonsTmsLneeNonCov
      TtlActvLonsAmtLnrNonCov
      TtlActvLonsAmtLneeNonCov
      TtlBLLonsTmsLnrNonCov
      TtlBLLonsTmsLneeNonCov
      TtlBLLonsAmtLnrNonCov
      TtlBLLonsAmtLneeNonCov
      TtlClrdLonsTmsLnrNonCov
      TtlClrdLonsTmsLneeNonCov
      TtlClrdLonsAmtLnrNonCov
      TtlClrdLonsAmtLneeNonCov
      TtlActvLonsTmsLneeChmNonCov
      TtlActvLonsAmtLneeChmNonCov
      TtlBLLonsTmsLneeChmNonCov
      TtlBLLonsAmtLneeChmNonCov
      TtlClrdLonsTmsLneeChmNonCov
      TtlClrdLonsAmtLneeChmNonCov
      TtlActvLonsTmsSllrNonCov
      TtlActvLonsTmsByrNonCov
      TtlActvLonsAmtSllrNonCov
      TtlActvLonsAmtByrNonCov
      TtlBLLonsTmsSllrNonCov
      TtlBLLonsTmsByrNonCov
      TtlBLLonsAmtSllrNonCov
      TtlBLLonsAmtByrNonCov
      TtlClrdLonsTmsSllrNonCov
      TtlClrdLonsTmsByrNonCov
      TtlClrdLonsAmtSllrNonCov
      TtlClrdLonsAmtByrNonCov
      TtlActvLonsTmsLnrCredSlsP2P
      TtlActvLonsAmtLnrCredSlsP2P
      TtlBLLonsTmsLnrCredSlsP2P
      TtlBLLonsAmtLnrCredSlsP2P
      TtlClrdLonsTmsLnrCredSlsP2P
      TtlClrdLonsAmtLnrCredSlsP2P
      TtlActvLonsTmsLnrCredSlsP2B
      TtlActvLonsAmtLnrCredSlsP2B
      TtlBLLonsTmsLnrCredSlsP2B
      TtlBLLonsAmtLnrCredSlsP2B
      TtlClrdLonsTmsLnrCredSlsP2B
      TtlClrdLonsAmtLnrCredSlsP2B
      TtlActvLonsTmsLneeB2P
      TtlActvLonsAmtLneeB2P
      TtlBLLonsTmsLneeB2P
      TtlBLLonsAmtLneeB2P
      TtlClrdLonsLneeB2P
      TtlClrdLonsAmtLneeB2P
      TtlActvLonsTmsLneeP2P
      TtlActvLonsAmtLneeP2P
      TtlBLLonsTmsLneeP2P
      TtlBLLonsAmtLneeP2P
      TtlClrdLonsLneeP2P
      TtlClrdLonsAmtLneeP2P
      TtlActvLonsTmsLnrP2P
      TtlActvLonsAmtLnrP2P
      TtlBLLonsTmsLnrP2P
      TtlBLLonsAmtLnrP2P
      TtlClrdLonsLnrP2P
      TtlClrdLonsAmtLnrP2P
      ttlNonLonsRecSM
      ttlNonLonsSentSM
      ttlNonLonsRecChm
      ttlNonLonsSentChm
      MaxTymsBL
      MaxTymsIHvBL
      MaxAcBal
      TymsIHvGivnLn
      TymsMyLnClrd
      DefaultPenaltySM
      loanStatus
      acStatus
      deActvtnReason
      blStatus
      loanLimit
      nonLonLimit
      withdrawalLimit
      depositLimit
      owner
      createdAt
      beneficiaryType
      photoPassport
      idFront
      idBack
      updatedAt
      __typename
    }
  }
`;
export const createBenProd2 = /* GraphQL */ `
  mutation CreateBenProd2(
    $input: CreateBenProd2Input!
    $condition: ModelBenProd2ConditionInput
  ) {
    createBenProd2(input: $input, condition: $condition) {
      id
      benefactorAc
      benefactorPhone
      creatorEmail
      prodName
      creatorName
      owner
      prodCost
      benefitsAmount
      prodDesc
      prodStatus
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateBenProd2 = /* GraphQL */ `
  mutation UpdateBenProd2(
    $input: UpdateBenProd2Input!
    $condition: ModelBenProd2ConditionInput
  ) {
    updateBenProd2(input: $input, condition: $condition) {
      id
      benefactorAc
      benefactorPhone
      creatorEmail
      prodName
      creatorName
      owner
      prodCost
      benefitsAmount
      prodDesc
      prodStatus
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteBenProd2 = /* GraphQL */ `
  mutation DeleteBenProd2(
    $input: DeleteBenProd2Input!
    $condition: ModelBenProd2ConditionInput
  ) {
    deleteBenProd2(input: $input, condition: $condition) {
      id
      benefactorAc
      benefactorPhone
      creatorEmail
      prodName
      creatorName
      owner
      prodCost
      benefitsAmount
      prodDesc
      prodStatus
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createBenefitContributions2 = /* GraphQL */ `
  mutation CreateBenefitContributions2(
    $input: CreateBenefitContributions2Input!
    $condition: ModelBenefitContributions2ConditionInput
  ) {
    createBenefitContributions2(input: $input, condition: $condition) {
      id
      benefitsID
      benefactorAc
      benefactorPhone
      beneficiaryAc
      beneficiaryPhone
      creatorEmail
      prodName
      creatorName
      owner
      prodCost
      benefitsAmount
      beneficiaryType
      prodDesc
      benefitStatus
      amount
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateBenefitContributions2 = /* GraphQL */ `
  mutation UpdateBenefitContributions2(
    $input: UpdateBenefitContributions2Input!
    $condition: ModelBenefitContributions2ConditionInput
  ) {
    updateBenefitContributions2(input: $input, condition: $condition) {
      id
      benefitsID
      benefactorAc
      benefactorPhone
      beneficiaryAc
      beneficiaryPhone
      creatorEmail
      prodName
      creatorName
      owner
      prodCost
      benefitsAmount
      beneficiaryType
      prodDesc
      benefitStatus
      amount
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteBenefitContributions2 = /* GraphQL */ `
  mutation DeleteBenefitContributions2(
    $input: DeleteBenefitContributions2Input!
    $condition: ModelBenefitContributions2ConditionInput
  ) {
    deleteBenefitContributions2(input: $input, condition: $condition) {
      id
      benefitsID
      benefactorAc
      benefactorPhone
      beneficiaryAc
      beneficiaryPhone
      creatorEmail
      prodName
      creatorName
      owner
      prodCost
      benefitsAmount
      beneficiaryType
      prodDesc
      benefitStatus
      amount
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createBenefitShare2 = /* GraphQL */ `
  mutation CreateBenefitShare2(
    $input: CreateBenefitShare2Input!
    $condition: ModelBenefitShare2ConditionInput
  ) {
    createBenefitShare2(input: $input, condition: $condition) {
      id
      benefitsID
      benefactorAc
      benefactorPhone
      beneficiaryAc
      beneficiaryPhone
      creatorEmail
      prodName
      creatorName
      owner
      prodCost
      benefitsAmount
      beneficiaryType
      prodDesc
      benefitStatus
      amount
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateBenefitShare2 = /* GraphQL */ `
  mutation UpdateBenefitShare2(
    $input: UpdateBenefitShare2Input!
    $condition: ModelBenefitShare2ConditionInput
  ) {
    updateBenefitShare2(input: $input, condition: $condition) {
      id
      benefitsID
      benefactorAc
      benefactorPhone
      beneficiaryAc
      beneficiaryPhone
      creatorEmail
      prodName
      creatorName
      owner
      prodCost
      benefitsAmount
      beneficiaryType
      prodDesc
      benefitStatus
      amount
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteBenefitShare2 = /* GraphQL */ `
  mutation DeleteBenefitShare2(
    $input: DeleteBenefitShare2Input!
    $condition: ModelBenefitShare2ConditionInput
  ) {
    deleteBenefitShare2(input: $input, condition: $condition) {
      id
      benefitsID
      benefactorAc
      benefactorPhone
      beneficiaryAc
      beneficiaryPhone
      creatorEmail
      prodName
      creatorName
      owner
      prodCost
      benefitsAmount
      beneficiaryType
      prodDesc
      benefitStatus
      amount
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createLinkBeneficiary2 = /* GraphQL */ `
  mutation CreateLinkBeneficiary2(
    $input: CreateLinkBeneficiary2Input!
    $condition: ModelLinkBeneficiary2ConditionInput
  ) {
    createLinkBeneficiary2(input: $input, condition: $condition) {
      beneficiaryID
      prodID
      benefitsID
      benefactorAc
      benefactorPhone
      beneficiaryAc
      beneficiaryPhone
      creatorEmail
      prodName
      creatorName
      owner
      prodCost
      benefitsAmount
      beneficiaryType
      prodDesc
      benefitStatus
      amount
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateLinkBeneficiary2 = /* GraphQL */ `
  mutation UpdateLinkBeneficiary2(
    $input: UpdateLinkBeneficiary2Input!
    $condition: ModelLinkBeneficiary2ConditionInput
  ) {
    updateLinkBeneficiary2(input: $input, condition: $condition) {
      beneficiaryID
      prodID
      benefitsID
      benefactorAc
      benefactorPhone
      beneficiaryAc
      beneficiaryPhone
      creatorEmail
      prodName
      creatorName
      owner
      prodCost
      benefitsAmount
      beneficiaryType
      prodDesc
      benefitStatus
      amount
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteLinkBeneficiary2 = /* GraphQL */ `
  mutation DeleteLinkBeneficiary2(
    $input: DeleteLinkBeneficiary2Input!
    $condition: ModelLinkBeneficiary2ConditionInput
  ) {
    deleteLinkBeneficiary2(input: $input, condition: $condition) {
      beneficiaryID
      prodID
      benefitsID
      benefactorAc
      benefactorPhone
      beneficiaryAc
      beneficiaryPhone
      creatorEmail
      prodName
      creatorName
      owner
      prodCost
      benefitsAmount
      beneficiaryType
      prodDesc
      benefitStatus
      amount
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createBizPartners2 = /* GraphQL */ `
  mutation CreateBizPartners2(
    $input: CreateBizPartners2Input!
    $condition: ModelBizPartners2ConditionInput
  ) {
    createBizPartners2(input: $input, condition: $condition) {
      partnerId
      bizContact
      regNo
      bizNpartner
      bizName
      partnerContact
      partnerName
      partnerNatId
      AcStatus
      owner
      updatedAt
      createdAt
      id
      __typename
    }
  }
`;
export const updateBizPartners2 = /* GraphQL */ `
  mutation UpdateBizPartners2(
    $input: UpdateBizPartners2Input!
    $condition: ModelBizPartners2ConditionInput
  ) {
    updateBizPartners2(input: $input, condition: $condition) {
      partnerId
      bizContact
      regNo
      bizNpartner
      bizName
      partnerContact
      partnerName
      partnerNatId
      AcStatus
      owner
      updatedAt
      createdAt
      id
      __typename
    }
  }
`;
export const deleteBizPartners2 = /* GraphQL */ `
  mutation DeleteBizPartners2(
    $input: DeleteBizPartners2Input!
    $condition: ModelBizPartners2ConditionInput
  ) {
    deleteBizPartners2(input: $input, condition: $condition) {
      partnerId
      bizContact
      regNo
      bizNpartner
      bizName
      partnerContact
      partnerName
      partnerNatId
      AcStatus
      owner
      updatedAt
      createdAt
      id
      __typename
    }
  }
`;
export const createSMLoansCovered = /* GraphQL */ `
  mutation CreateSMLoansCovered(
    $input: CreateSMLoansCoveredInput!
    $condition: ModelSMLoansCoveredConditionInput
  ) {
    createSMLoansCovered(input: $input, condition: $condition) {
      loanID
      loaneeid
      loaneePhn
      loanerLoanee
      loanerLoaneeAdv
      loanerPhn
      advregnu
      loanerId
      amountgiven
      clearanceAmt
      clearanceAmt2
      amountexpected
      amountExpectedBackWthClrnc
      dfltUpdate
      dfltDeadLn
      amountrepaid
      lonBala
      interest
      lnType
      loaneename
      loanername
      loanerEmail
      repaymentPeriod
      DefaultPenaltySM
      DefaultPenaltySM2
      timeExpBack
      crtnDate
      loaneeEmail
      timeExpBack2
      description
      status
      owner
      createdAt
      blOfficer
      advEmail
      installmentAmount
      paymentFrequency
      updatedAt
      __typename
    }
  }
`;
export const updateSMLoansCovered = /* GraphQL */ `
  mutation UpdateSMLoansCovered(
    $input: UpdateSMLoansCoveredInput!
    $condition: ModelSMLoansCoveredConditionInput
  ) {
    updateSMLoansCovered(input: $input, condition: $condition) {
      loanID
      loaneeid
      loaneePhn
      loanerLoanee
      loanerLoaneeAdv
      loanerPhn
      advregnu
      loanerId
      amountgiven
      clearanceAmt
      clearanceAmt2
      amountexpected
      amountExpectedBackWthClrnc
      dfltUpdate
      dfltDeadLn
      amountrepaid
      lonBala
      interest
      lnType
      loaneename
      loanername
      loanerEmail
      repaymentPeriod
      DefaultPenaltySM
      DefaultPenaltySM2
      timeExpBack
      crtnDate
      loaneeEmail
      timeExpBack2
      description
      status
      owner
      createdAt
      blOfficer
      advEmail
      installmentAmount
      paymentFrequency
      updatedAt
      __typename
    }
  }
`;
export const deleteSMLoansCovered = /* GraphQL */ `
  mutation DeleteSMLoansCovered(
    $input: DeleteSMLoansCoveredInput!
    $condition: ModelSMLoansCoveredConditionInput
  ) {
    deleteSMLoansCovered(input: $input, condition: $condition) {
      loanID
      loaneeid
      loaneePhn
      loanerLoanee
      loanerLoaneeAdv
      loanerPhn
      advregnu
      loanerId
      amountgiven
      clearanceAmt
      clearanceAmt2
      amountexpected
      amountExpectedBackWthClrnc
      dfltUpdate
      dfltDeadLn
      amountrepaid
      lonBala
      interest
      lnType
      loaneename
      loanername
      loanerEmail
      repaymentPeriod
      DefaultPenaltySM
      DefaultPenaltySM2
      timeExpBack
      crtnDate
      loaneeEmail
      timeExpBack2
      description
      status
      owner
      createdAt
      blOfficer
      advEmail
      installmentAmount
      paymentFrequency
      updatedAt
      __typename
    }
  }
`;
export const createCovCreditSeller = /* GraphQL */ `
  mutation CreateCovCreditSeller(
    $input: CreateCovCreditSellerInput!
    $condition: ModelCovCreditSellerConditionInput
  ) {
    createCovCreditSeller(input: $input, condition: $condition) {
      loanID
      itemName
      interest
      loanerLoanee
      loanerLoaneeAdv
      buyerContact
      sellerContact
      buyerID
      advEmail
      buyerName
      SellerName
      sellerID
      amountSold
      dfltUpdate
      lnType
      dfltDeadLn
      amountexpectedBack
      amountExpectedBackWthClrnc
      amountRepaid
      repaymentPeriod
      clearanceAmt
      clearanceAmt2
      giverStatus
      timeExpBack
      timeExpBack2
      lonBala
      crtnDate
      description
      status
      advregnu
      DefaultPenaltyCredSl
      DefaultPenaltyCredSl2
      owner
      createdAt
      blOfficer
      installmentAmount
      paymentFrequency
      updatedAt
      __typename
    }
  }
`;
export const updateCovCreditSeller = /* GraphQL */ `
  mutation UpdateCovCreditSeller(
    $input: UpdateCovCreditSellerInput!
    $condition: ModelCovCreditSellerConditionInput
  ) {
    updateCovCreditSeller(input: $input, condition: $condition) {
      loanID
      itemName
      interest
      loanerLoanee
      loanerLoaneeAdv
      buyerContact
      sellerContact
      buyerID
      advEmail
      buyerName
      SellerName
      sellerID
      amountSold
      dfltUpdate
      lnType
      dfltDeadLn
      amountexpectedBack
      amountExpectedBackWthClrnc
      amountRepaid
      repaymentPeriod
      clearanceAmt
      clearanceAmt2
      giverStatus
      timeExpBack
      timeExpBack2
      lonBala
      crtnDate
      description
      status
      advregnu
      DefaultPenaltyCredSl
      DefaultPenaltyCredSl2
      owner
      createdAt
      blOfficer
      installmentAmount
      paymentFrequency
      updatedAt
      __typename
    }
  }
`;
export const deleteCovCreditSeller = /* GraphQL */ `
  mutation DeleteCovCreditSeller(
    $input: DeleteCovCreditSellerInput!
    $condition: ModelCovCreditSellerConditionInput
  ) {
    deleteCovCreditSeller(input: $input, condition: $condition) {
      loanID
      itemName
      interest
      loanerLoanee
      loanerLoaneeAdv
      buyerContact
      sellerContact
      buyerID
      advEmail
      buyerName
      SellerName
      sellerID
      amountSold
      dfltUpdate
      lnType
      dfltDeadLn
      amountexpectedBack
      amountExpectedBackWthClrnc
      amountRepaid
      repaymentPeriod
      clearanceAmt
      clearanceAmt2
      giverStatus
      timeExpBack
      timeExpBack2
      lonBala
      crtnDate
      description
      status
      advregnu
      DefaultPenaltyCredSl
      DefaultPenaltyCredSl2
      owner
      createdAt
      blOfficer
      installmentAmount
      paymentFrequency
      updatedAt
      __typename
    }
  }
`;
export const createCvrdGroupLoans = /* GraphQL */ `
  mutation CreateCvrdGroupLoans(
    $input: CreateCvrdGroupLoansInput!
    $condition: ModelCvrdGroupLoansConditionInput
  ) {
    createCvrdGroupLoans(input: $input, condition: $condition) {
      loanID
      grpContact
      loaneePhn
      repaymentPeriod
      loanerLoanee
      loanerLoaneeAdv
      amountGiven
      interest
      advEmail
      amountExpectedBack
      amountExpectedBackWthClrnc
      clearanceAmt
      clearanceAmt2
      amountRepaid
      description
      dfltUpdate
      dfltDeadLn
      lonBala
      lnType
      memberId
      advRegNu
      loaneeName
      LoanerName
      timeExpBack
      timeExpBack2
      crtnDate
      status
      owner
      DefaultPenaltyChm
      DefaultPenaltyChm2
      createdAt
      blOfficer
      installmentAmount
      paymentFrequency
      updatedAt
      __typename
    }
  }
`;
export const updateCvrdGroupLoans = /* GraphQL */ `
  mutation UpdateCvrdGroupLoans(
    $input: UpdateCvrdGroupLoansInput!
    $condition: ModelCvrdGroupLoansConditionInput
  ) {
    updateCvrdGroupLoans(input: $input, condition: $condition) {
      loanID
      grpContact
      loaneePhn
      repaymentPeriod
      loanerLoanee
      loanerLoaneeAdv
      amountGiven
      interest
      advEmail
      amountExpectedBack
      amountExpectedBackWthClrnc
      clearanceAmt
      clearanceAmt2
      amountRepaid
      description
      dfltUpdate
      dfltDeadLn
      lonBala
      lnType
      memberId
      advRegNu
      loaneeName
      LoanerName
      timeExpBack
      timeExpBack2
      crtnDate
      status
      owner
      DefaultPenaltyChm
      DefaultPenaltyChm2
      createdAt
      blOfficer
      installmentAmount
      paymentFrequency
      updatedAt
      __typename
    }
  }
`;
export const deleteCvrdGroupLoans = /* GraphQL */ `
  mutation DeleteCvrdGroupLoans(
    $input: DeleteCvrdGroupLoansInput!
    $condition: ModelCvrdGroupLoansConditionInput
  ) {
    deleteCvrdGroupLoans(input: $input, condition: $condition) {
      loanID
      grpContact
      loaneePhn
      repaymentPeriod
      loanerLoanee
      loanerLoaneeAdv
      amountGiven
      interest
      advEmail
      amountExpectedBack
      amountExpectedBackWthClrnc
      clearanceAmt
      clearanceAmt2
      amountRepaid
      description
      dfltUpdate
      dfltDeadLn
      lonBala
      lnType
      memberId
      advRegNu
      loaneeName
      LoanerName
      timeExpBack
      timeExpBack2
      crtnDate
      status
      owner
      DefaultPenaltyChm
      DefaultPenaltyChm2
      createdAt
      blOfficer
      installmentAmount
      paymentFrequency
      updatedAt
      __typename
    }
  }
`;
export const createNonLoans = /* GraphQL */ `
  mutation CreateNonLoans(
    $input: CreateNonLoansInput!
    $condition: ModelNonLoansConditionInput
  ) {
    createNonLoans(input: $input, condition: $condition) {
      id
      senderPhn
      recPhn
      RecName
      SenderName
      amount
      description
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateNonLoans = /* GraphQL */ `
  mutation UpdateNonLoans(
    $input: UpdateNonLoansInput!
    $condition: ModelNonLoansConditionInput
  ) {
    updateNonLoans(input: $input, condition: $condition) {
      id
      senderPhn
      recPhn
      RecName
      SenderName
      amount
      description
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteNonLoans = /* GraphQL */ `
  mutation DeleteNonLoans(
    $input: DeleteNonLoansInput!
    $condition: ModelNonLoansConditionInput
  ) {
    deleteNonLoans(input: $input, condition: $condition) {
      id
      senderPhn
      recPhn
      RecName
      SenderName
      amount
      description
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createBizSlsReq = /* GraphQL */ `
  mutation CreateBizSlsReq(
    $input: CreateBizSlsReqInput!
    $condition: ModelBizSlsReqConditionInput
  ) {
    createBizSlsReq(input: $input, condition: $condition) {
      id
      senderPhn
      recPhn
      RecName
      SenderName
      amount
      attendingAdmin
      description
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateBizSlsReq = /* GraphQL */ `
  mutation UpdateBizSlsReq(
    $input: UpdateBizSlsReqInput!
    $condition: ModelBizSlsReqConditionInput
  ) {
    updateBizSlsReq(input: $input, condition: $condition) {
      id
      senderPhn
      recPhn
      RecName
      SenderName
      amount
      attendingAdmin
      description
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteBizSlsReq = /* GraphQL */ `
  mutation DeleteBizSlsReq(
    $input: DeleteBizSlsReqInput!
    $condition: ModelBizSlsReqConditionInput
  ) {
    deleteBizSlsReq(input: $input, condition: $condition) {
      id
      senderPhn
      recPhn
      RecName
      SenderName
      amount
      attendingAdmin
      description
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createBizSls = /* GraphQL */ `
  mutation CreateBizSls(
    $input: CreateBizSlsInput!
    $condition: ModelBizSlsConditionInput
  ) {
    createBizSls(input: $input, condition: $condition) {
      saleId
      id
      senderPhn
      recPhn
      RecName
      SenderName
      amount
      attendingAdmin
      description
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateBizSls = /* GraphQL */ `
  mutation UpdateBizSls(
    $input: UpdateBizSlsInput!
    $condition: ModelBizSlsConditionInput
  ) {
    updateBizSls(input: $input, condition: $condition) {
      saleId
      id
      senderPhn
      recPhn
      RecName
      SenderName
      amount
      attendingAdmin
      description
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteBizSls = /* GraphQL */ `
  mutation DeleteBizSls(
    $input: DeleteBizSlsInput!
    $condition: ModelBizSlsConditionInput
  ) {
    deleteBizSls(input: $input, condition: $condition) {
      saleId
      id
      senderPhn
      recPhn
      RecName
      SenderName
      amount
      attendingAdmin
      description
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createLoanRepayments = /* GraphQL */ `
  mutation CreateLoanRepayments(
    $input: CreateLoanRepaymentsInput!
    $condition: ModelLoanRepaymentsConditionInput
  ) {
    createLoanRepayments(input: $input, condition: $condition) {
      id
      senderPhn
      recPhn
      RecName
      SenderName
      amount
      loanId1
      loanId2
      loanId3
      description
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateLoanRepayments = /* GraphQL */ `
  mutation UpdateLoanRepayments(
    $input: UpdateLoanRepaymentsInput!
    $condition: ModelLoanRepaymentsConditionInput
  ) {
    updateLoanRepayments(input: $input, condition: $condition) {
      id
      senderPhn
      recPhn
      RecName
      SenderName
      amount
      loanId1
      loanId2
      loanId3
      description
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteLoanRepayments = /* GraphQL */ `
  mutation DeleteLoanRepayments(
    $input: DeleteLoanRepaymentsInput!
    $condition: ModelLoanRepaymentsConditionInput
  ) {
    deleteLoanRepayments(input: $input, condition: $condition) {
      id
      senderPhn
      recPhn
      RecName
      SenderName
      amount
      loanId1
      loanId2
      loanId3
      description
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createSokoAd = /* GraphQL */ `
  mutation CreateSokoAd(
    $input: CreateSokoAdInput!
    $condition: ModelSokoAdConditionInput
  ) {
    createSokoAd(input: $input, condition: $condition) {
      id
      sokokntct
      sokotown
      sokolnprcntg
      sokolpymntperiod
      sokodesc
      itemCodeBar
      itemPhoto
      itemSpecifications
      owner
      createdAt
      latitude
      longitude
      sokoname
      businessType
      itemUnit
      unitQuantity
      sokoprice
      itemBrand
      bizName
      bizContact
      updatedAt
      __typename
    }
  }
`;
export const updateSokoAd = /* GraphQL */ `
  mutation UpdateSokoAd(
    $input: UpdateSokoAdInput!
    $condition: ModelSokoAdConditionInput
  ) {
    updateSokoAd(input: $input, condition: $condition) {
      id
      sokokntct
      sokotown
      sokolnprcntg
      sokolpymntperiod
      sokodesc
      itemCodeBar
      itemPhoto
      itemSpecifications
      owner
      createdAt
      latitude
      longitude
      sokoname
      businessType
      itemUnit
      unitQuantity
      sokoprice
      itemBrand
      bizName
      bizContact
      updatedAt
      __typename
    }
  }
`;
export const deleteSokoAd = /* GraphQL */ `
  mutation DeleteSokoAd(
    $input: DeleteSokoAdInput!
    $condition: ModelSokoAdConditionInput
  ) {
    deleteSokoAd(input: $input, condition: $condition) {
      id
      sokokntct
      sokotown
      sokolnprcntg
      sokolpymntperiod
      sokodesc
      itemCodeBar
      itemPhoto
      itemSpecifications
      owner
      createdAt
      latitude
      longitude
      sokoname
      businessType
      itemUnit
      unitQuantity
      sokoprice
      itemBrand
      bizName
      bizContact
      updatedAt
      __typename
    }
  }
`;
export const createTransportRegister = /* GraphQL */ `
  mutation CreateTransportRegister(
    $input: CreateTransportRegisterInput!
    $condition: ModelTransportRegisterConditionInput
  ) {
    createTransportRegister(input: $input, condition: $condition) {
      id
      transportkntct
      transportRate
      transportdesc
      transportPhoto
      owner
      createdAt
      latitude
      longitude
      transportName
      transportType
      dutyStatus
      engagementStatus
      transportRequest
      transportOwnerEmail
      Earnings
      UsrAcCommitment
      ChmAcCommitment
      chmAcNumber
      chmAcCommitmentStatus
      deliveryLatitude
      deliveryLongitude
      buyerName
      buyerContact
      deliveryID
      deliveryCost
      customerEmail
      deliveryDesc
      bizAc
      bizType
      purchasePhoto
      deliveryStart
      itemID
      sellerContact
      sellerName
      sellerLatitude
      sellerLongitude
      distance
      lastForwardedTime
      overdue
      ImageUrl
      numberPlate
      updatedAt
      __typename
    }
  }
`;
export const updateTransportRegister = /* GraphQL */ `
  mutation UpdateTransportRegister(
    $input: UpdateTransportRegisterInput!
    $condition: ModelTransportRegisterConditionInput
  ) {
    updateTransportRegister(input: $input, condition: $condition) {
      id
      transportkntct
      transportRate
      transportdesc
      transportPhoto
      owner
      createdAt
      latitude
      longitude
      transportName
      transportType
      dutyStatus
      engagementStatus
      transportRequest
      transportOwnerEmail
      Earnings
      UsrAcCommitment
      ChmAcCommitment
      chmAcNumber
      chmAcCommitmentStatus
      deliveryLatitude
      deliveryLongitude
      buyerName
      buyerContact
      deliveryID
      deliveryCost
      customerEmail
      deliveryDesc
      bizAc
      bizType
      purchasePhoto
      deliveryStart
      itemID
      sellerContact
      sellerName
      sellerLatitude
      sellerLongitude
      distance
      lastForwardedTime
      overdue
      ImageUrl
      numberPlate
      updatedAt
      __typename
    }
  }
`;
export const deleteTransportRegister = /* GraphQL */ `
  mutation DeleteTransportRegister(
    $input: DeleteTransportRegisterInput!
    $condition: ModelTransportRegisterConditionInput
  ) {
    deleteTransportRegister(input: $input, condition: $condition) {
      id
      transportkntct
      transportRate
      transportdesc
      transportPhoto
      owner
      createdAt
      latitude
      longitude
      transportName
      transportType
      dutyStatus
      engagementStatus
      transportRequest
      transportOwnerEmail
      Earnings
      UsrAcCommitment
      ChmAcCommitment
      chmAcNumber
      chmAcCommitmentStatus
      deliveryLatitude
      deliveryLongitude
      buyerName
      buyerContact
      deliveryID
      deliveryCost
      customerEmail
      deliveryDesc
      bizAc
      bizType
      purchasePhoto
      deliveryStart
      itemID
      sellerContact
      sellerName
      sellerLatitude
      sellerLongitude
      distance
      lastForwardedTime
      overdue
      ImageUrl
      numberPlate
      updatedAt
      __typename
    }
  }
`;
export const createTransportOrder = /* GraphQL */ `
  mutation CreateTransportOrder(
    $input: CreateTransportOrderInput!
    $condition: ModelTransportOrderConditionInput
  ) {
    createTransportOrder(input: $input, condition: $condition) {
      id
      transportkntct
      transportRate
      transportdesc
      transportPhoto
      owner
      createdAt
      latitude
      longitude
      transportName
      transportType
      dutyStatus
      engagementStatus
      transportRequest
      transportOwnerEmail
      Earnings
      UsrAcCommitment
      ChmAcCommitment
      chmAcNumber
      chmAcCommitmentStatus
      deliveryLatitude
      deliveryLongitude
      buyerName
      buyerContact
      deliveryID
      deliveryCost
      customerEmail
      deliveryDesc
      bizAc
      bizType
      purchasePhoto
      deliveryStart
      itemID
      sellerContact
      sellerName
      sellerLatitude
      sellerLongitude
      distance
      orderCost
      offloadingLatitude
      offloadingLongitude
      offLoadingTime
      deliveryReceptionTime
      itemExtra1
      itemExtra2
      itemExtra3
      itemExtra4
      itemExtra5
      updatedAt
      __typename
    }
  }
`;
export const updateTransportOrder = /* GraphQL */ `
  mutation UpdateTransportOrder(
    $input: UpdateTransportOrderInput!
    $condition: ModelTransportOrderConditionInput
  ) {
    updateTransportOrder(input: $input, condition: $condition) {
      id
      transportkntct
      transportRate
      transportdesc
      transportPhoto
      owner
      createdAt
      latitude
      longitude
      transportName
      transportType
      dutyStatus
      engagementStatus
      transportRequest
      transportOwnerEmail
      Earnings
      UsrAcCommitment
      ChmAcCommitment
      chmAcNumber
      chmAcCommitmentStatus
      deliveryLatitude
      deliveryLongitude
      buyerName
      buyerContact
      deliveryID
      deliveryCost
      customerEmail
      deliveryDesc
      bizAc
      bizType
      purchasePhoto
      deliveryStart
      itemID
      sellerContact
      sellerName
      sellerLatitude
      sellerLongitude
      distance
      orderCost
      offloadingLatitude
      offloadingLongitude
      offLoadingTime
      deliveryReceptionTime
      itemExtra1
      itemExtra2
      itemExtra3
      itemExtra4
      itemExtra5
      updatedAt
      __typename
    }
  }
`;
export const deleteTransportOrder = /* GraphQL */ `
  mutation DeleteTransportOrder(
    $input: DeleteTransportOrderInput!
    $condition: ModelTransportOrderConditionInput
  ) {
    deleteTransportOrder(input: $input, condition: $condition) {
      id
      transportkntct
      transportRate
      transportdesc
      transportPhoto
      owner
      createdAt
      latitude
      longitude
      transportName
      transportType
      dutyStatus
      engagementStatus
      transportRequest
      transportOwnerEmail
      Earnings
      UsrAcCommitment
      ChmAcCommitment
      chmAcNumber
      chmAcCommitmentStatus
      deliveryLatitude
      deliveryLongitude
      buyerName
      buyerContact
      deliveryID
      deliveryCost
      customerEmail
      deliveryDesc
      bizAc
      bizType
      purchasePhoto
      deliveryStart
      itemID
      sellerContact
      sellerName
      sellerLatitude
      sellerLongitude
      distance
      orderCost
      offloadingLatitude
      offloadingLongitude
      offLoadingTime
      deliveryReceptionTime
      itemExtra1
      itemExtra2
      itemExtra3
      itemExtra4
      itemExtra5
      updatedAt
      __typename
    }
  }
`;
export const createRafikiLnAd = /* GraphQL */ `
  mutation CreateRafikiLnAd(
    $input: CreateRafikiLnAdInput!
    $condition: ModelRafikiLnAdConditionInput
  ) {
    createRafikiLnAd(input: $input, condition: $condition) {
      id
      rafikiName
      rafikicntct
      rafikiEmail
      AdvEmail
      advLicNo
      rafikiamnt
      defaultPenalty
      rafikidesc
      rafikiprcntg
      rafikirpymntperiod
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateRafikiLnAd = /* GraphQL */ `
  mutation UpdateRafikiLnAd(
    $input: UpdateRafikiLnAdInput!
    $condition: ModelRafikiLnAdConditionInput
  ) {
    updateRafikiLnAd(input: $input, condition: $condition) {
      id
      rafikiName
      rafikicntct
      rafikiEmail
      AdvEmail
      advLicNo
      rafikiamnt
      defaultPenalty
      rafikidesc
      rafikiprcntg
      rafikirpymntperiod
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteRafikiLnAd = /* GraphQL */ `
  mutation DeleteRafikiLnAd(
    $input: DeleteRafikiLnAdInput!
    $condition: ModelRafikiLnAdConditionInput
  ) {
    deleteRafikiLnAd(input: $input, condition: $condition) {
      id
      rafikiName
      rafikicntct
      rafikiEmail
      AdvEmail
      advLicNo
      rafikiamnt
      defaultPenalty
      rafikidesc
      rafikiprcntg
      rafikirpymntperiod
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createAgent = /* GraphQL */ `
  mutation CreateAgent(
    $input: CreateAgentInput!
    $condition: ModelAgentConditionInput
  ) {
    createAgent(input: $input, condition: $condition) {
      phonecontact
      sagentregno
      nationalid
      name
      ttlEarnings
      pw
      email
      TtlFltIn
      TtlFltOut
      floatBal
      latitude
      longitude
      agentEarningBal
      status
      bankName
      bkAcNo
      owner
      town
      MFNWithdrwlFee
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateAgent = /* GraphQL */ `
  mutation UpdateAgent(
    $input: UpdateAgentInput!
    $condition: ModelAgentConditionInput
  ) {
    updateAgent(input: $input, condition: $condition) {
      phonecontact
      sagentregno
      nationalid
      name
      ttlEarnings
      pw
      email
      TtlFltIn
      TtlFltOut
      floatBal
      latitude
      longitude
      agentEarningBal
      status
      bankName
      bkAcNo
      owner
      town
      MFNWithdrwlFee
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteAgent = /* GraphQL */ `
  mutation DeleteAgent(
    $input: DeleteAgentInput!
    $condition: ModelAgentConditionInput
  ) {
    deleteAgent(input: $input, condition: $condition) {
      phonecontact
      sagentregno
      nationalid
      name
      ttlEarnings
      pw
      email
      TtlFltIn
      TtlFltOut
      floatBal
      latitude
      longitude
      agentEarningBal
      status
      bankName
      bkAcNo
      owner
      town
      MFNWithdrwlFee
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createFloatPurchase = /* GraphQL */ `
  mutation CreateFloatPurchase(
    $input: CreateFloatPurchaseInput!
    $condition: ModelFloatPurchaseConditionInput
  ) {
    createFloatPurchase(input: $input, condition: $condition) {
      agentphone
      amount
      transactId
      bankAdminID
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateFloatPurchase = /* GraphQL */ `
  mutation UpdateFloatPurchase(
    $input: UpdateFloatPurchaseInput!
    $condition: ModelFloatPurchaseConditionInput
  ) {
    updateFloatPurchase(input: $input, condition: $condition) {
      agentphone
      amount
      transactId
      bankAdminID
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteFloatPurchase = /* GraphQL */ `
  mutation DeleteFloatPurchase(
    $input: DeleteFloatPurchaseInput!
    $condition: ModelFloatPurchaseConditionInput
  ) {
    deleteFloatPurchase(input: $input, condition: $condition) {
      agentphone
      amount
      transactId
      bankAdminID
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createFloatAdd = /* GraphQL */ `
  mutation CreateFloatAdd(
    $input: CreateFloatAddInput!
    $condition: ModelFloatAddConditionInput
  ) {
    createFloatAdd(input: $input, condition: $condition) {
      id
      withdrawerid
      amount
      agentPhonecontact
      agentName
      userName
      saName
      saPhone
      sagentId
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateFloatAdd = /* GraphQL */ `
  mutation UpdateFloatAdd(
    $input: UpdateFloatAddInput!
    $condition: ModelFloatAddConditionInput
  ) {
    updateFloatAdd(input: $input, condition: $condition) {
      id
      withdrawerid
      amount
      agentPhonecontact
      agentName
      userName
      saName
      saPhone
      sagentId
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteFloatAdd = /* GraphQL */ `
  mutation DeleteFloatAdd(
    $input: DeleteFloatAddInput!
    $condition: ModelFloatAddConditionInput
  ) {
    deleteFloatAdd(input: $input, condition: $condition) {
      id
      withdrawerid
      amount
      agentPhonecontact
      agentName
      userName
      saName
      saPhone
      sagentId
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createFloatReduction = /* GraphQL */ `
  mutation CreateFloatReduction(
    $input: CreateFloatReductionInput!
    $condition: ModelFloatReductionConditionInput
  ) {
    createFloatReduction(input: $input, condition: $condition) {
      id
      amount
      depositerid
      agContact
      agentName
      userName
      status
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateFloatReduction = /* GraphQL */ `
  mutation UpdateFloatReduction(
    $input: UpdateFloatReductionInput!
    $condition: ModelFloatReductionConditionInput
  ) {
    updateFloatReduction(input: $input, condition: $condition) {
      id
      amount
      depositerid
      agContact
      agentName
      userName
      status
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteFloatReduction = /* GraphQL */ `
  mutation DeleteFloatReduction(
    $input: DeleteFloatReductionInput!
    $condition: ModelFloatReductionConditionInput
  ) {
    deleteFloatReduction(input: $input, condition: $condition) {
      id
      amount
      depositerid
      agContact
      agentName
      userName
      status
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createAgentWithdrawals = /* GraphQL */ `
  mutation CreateAgentWithdrawals(
    $input: CreateAgentWithdrawalsInput!
    $condition: ModelAgentWithdrawalsConditionInput
  ) {
    createAgentWithdrawals(input: $input, condition: $condition) {
      id
      agentPhone
      bankAdminId
      bankName
      bkAcNo
      Amount
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateAgentWithdrawals = /* GraphQL */ `
  mutation UpdateAgentWithdrawals(
    $input: UpdateAgentWithdrawalsInput!
    $condition: ModelAgentWithdrawalsConditionInput
  ) {
    updateAgentWithdrawals(input: $input, condition: $condition) {
      id
      agentPhone
      bankAdminId
      bankName
      bkAcNo
      Amount
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteAgentWithdrawals = /* GraphQL */ `
  mutation DeleteAgentWithdrawals(
    $input: DeleteAgentWithdrawalsInput!
    $condition: ModelAgentWithdrawalsConditionInput
  ) {
    deleteAgentWithdrawals(input: $input, condition: $condition) {
      id
      agentPhone
      bankAdminId
      bankName
      bkAcNo
      Amount
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createSAgent = /* GraphQL */ `
  mutation CreateSAgent(
    $input: CreateSAgentInput!
    $condition: ModelSAgentConditionInput
  ) {
    createSAgent(input: $input, condition: $condition) {
      saPhoneContact
      saNationalid
      name
      acChamp
      pw
      TtlEarnings
      actvMFNdog
      cost
      costBal
      mfnTtl
      offerStatus
      InctvMFNdog
      email
      saBalance
      bankName
      bkAcNo
      status
      owner
      MFKWithdrwlFee
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateSAgent = /* GraphQL */ `
  mutation UpdateSAgent(
    $input: UpdateSAgentInput!
    $condition: ModelSAgentConditionInput
  ) {
    updateSAgent(input: $input, condition: $condition) {
      saPhoneContact
      saNationalid
      name
      acChamp
      pw
      TtlEarnings
      actvMFNdog
      cost
      costBal
      mfnTtl
      offerStatus
      InctvMFNdog
      email
      saBalance
      bankName
      bkAcNo
      status
      owner
      MFKWithdrwlFee
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteSAgent = /* GraphQL */ `
  mutation DeleteSAgent(
    $input: DeleteSAgentInput!
    $condition: ModelSAgentConditionInput
  ) {
    deleteSAgent(input: $input, condition: $condition) {
      saPhoneContact
      saNationalid
      name
      acChamp
      pw
      TtlEarnings
      actvMFNdog
      cost
      costBal
      mfnTtl
      offerStatus
      InctvMFNdog
      email
      saBalance
      bankName
      bkAcNo
      status
      owner
      MFKWithdrwlFee
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createSAgentWithdrawals = /* GraphQL */ `
  mutation CreateSAgentWithdrawals(
    $input: CreateSAgentWithdrawalsInput!
    $condition: ModelSAgentWithdrawalsConditionInput
  ) {
    createSAgentWithdrawals(input: $input, condition: $condition) {
      id
      saId
      amount
      bankAdmnId
      bankName
      bkAcNo
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateSAgentWithdrawals = /* GraphQL */ `
  mutation UpdateSAgentWithdrawals(
    $input: UpdateSAgentWithdrawalsInput!
    $condition: ModelSAgentWithdrawalsConditionInput
  ) {
    updateSAgentWithdrawals(input: $input, condition: $condition) {
      id
      saId
      amount
      bankAdmnId
      bankName
      bkAcNo
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteSAgentWithdrawals = /* GraphQL */ `
  mutation DeleteSAgentWithdrawals(
    $input: DeleteSAgentWithdrawalsInput!
    $condition: ModelSAgentWithdrawalsConditionInput
  ) {
    deleteSAgentWithdrawals(input: $input, condition: $condition) {
      id
      saId
      amount
      bankAdmnId
      bankName
      bkAcNo
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createPersonel = /* GraphQL */ `
  mutation CreatePersonel(
    $input: CreatePersonelInput!
    $condition: ModelPersonelConditionInput
  ) {
    createPersonel(input: $input, condition: $condition) {
      phoneKontact
      BusinessRegNo
      nationalid
      BiznaName
      name
      ownrsss
      email
      workerId
      workId
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updatePersonel = /* GraphQL */ `
  mutation UpdatePersonel(
    $input: UpdatePersonelInput!
    $condition: ModelPersonelConditionInput
  ) {
    updatePersonel(input: $input, condition: $condition) {
      phoneKontact
      BusinessRegNo
      nationalid
      BiznaName
      name
      ownrsss
      email
      workerId
      workId
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deletePersonel = /* GraphQL */ `
  mutation DeletePersonel(
    $input: DeletePersonelInput!
    $condition: ModelPersonelConditionInput
  ) {
    deletePersonel(input: $input, condition: $condition) {
      phoneKontact
      BusinessRegNo
      nationalid
      BiznaName
      name
      ownrsss
      email
      workerId
      workId
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createBizna = /* GraphQL */ `
  mutation CreateBizna(
    $input: CreateBiznaInput!
    $condition: ModelBiznaConditionInput
  ) {
    createBizna(input: $input, condition: $condition) {
      BusKntct
      busName
      pw
      TtlEarnings
      earningsBal
      bizBeneficiary
      netEarnings
      beneficiaryType
      benefitsAmount
      owner2email
      email
      licenseNo
      bizType
      bankType
      bankAccount
      status
      owner
      description
      createdAt
      noBL
      latitude
      longitude
      businessType
      bizContact
      TtlActvLonsTmsLnrCredSlsB2B
      TtlActvLonsAmtLnrCredSlsB2B
      TtlBLLonsTmsLnrCredSlsB2B
      TtlBLLonsAmtLnrCredSlsB2B
      TtlClrdLonsTmsLnrCredSlsB2B
      TtlClrdLonsAmtLnrCredSlsB2B
      TtlActvLonsTmsLneeCredSlsB2B
      TtlActvLonsAmtLneeCredSlsB2B
      TtlBLLonsTmsLneeCredSlsB2B
      TtlBLLonsAmtLneeCredSlsB2B
      TtlClrdLonsTmsLneeCredSlsB2B
      TtlClrdLonsAmtLneeCredSlsB2B
      TtlActvLonsTmsLnrCredSlsB2P
      TtlActvLonsAmtLnrCredSlsB2P
      TtlBLLonsTmsLnrCredSlsB2P
      TtlBLLonsAmtLnrCredSlsB2P
      TtlClrdLonsTmsLnrCredSlsB2P
      TtlClrdLonsAmtLnrCredSlsB2P
      TtlActvLonsTmsLneeCredSlsP2B
      TtlActvLonsAmtLneeCredSlsP2B
      TtlBLLonsTmsLneeCredSlsP2B
      TtlBLLonsAmtLneeCredSlsP2B
      TtlClrdLonsTmsLneeCredSlsP2B
      TtlClrdLonsAmtLneeCredSlsP2B
      objectionStatus
      objOfficer
      objReason
      AdminNo
      Admin1
      Admin2
      Admin3
      Admin4
      Admin5
      Admin6
      Admin7
      Admin8
      Admin9
      Admin10
      Admin11
      Admin12
      Admin13
      Admin14
      Admin15
      Admin16
      Admin17
      Admin18
      Admin19
      Admin20
      Admin21
      Admin22
      Admin23
      Admin24
      Admin25
      Admin26
      Admin27
      Admin28
      Admin29
      Admin30
      Admin31
      Admin32
      Admin33
      Admin34
      Admin35
      Admin36
      Admin37
      Admin38
      Admin39
      Admin40
      Admin41
      Admin42
      Admin43
      Admin44
      Admin45
      Admin46
      Admin47
      Admin48
      Admin49
      Admin50
      updatedAt
      __typename
    }
  }
`;
export const updateBizna = /* GraphQL */ `
  mutation UpdateBizna(
    $input: UpdateBiznaInput!
    $condition: ModelBiznaConditionInput
  ) {
    updateBizna(input: $input, condition: $condition) {
      BusKntct
      busName
      pw
      TtlEarnings
      earningsBal
      bizBeneficiary
      netEarnings
      beneficiaryType
      benefitsAmount
      owner2email
      email
      licenseNo
      bizType
      bankType
      bankAccount
      status
      owner
      description
      createdAt
      noBL
      latitude
      longitude
      businessType
      bizContact
      TtlActvLonsTmsLnrCredSlsB2B
      TtlActvLonsAmtLnrCredSlsB2B
      TtlBLLonsTmsLnrCredSlsB2B
      TtlBLLonsAmtLnrCredSlsB2B
      TtlClrdLonsTmsLnrCredSlsB2B
      TtlClrdLonsAmtLnrCredSlsB2B
      TtlActvLonsTmsLneeCredSlsB2B
      TtlActvLonsAmtLneeCredSlsB2B
      TtlBLLonsTmsLneeCredSlsB2B
      TtlBLLonsAmtLneeCredSlsB2B
      TtlClrdLonsTmsLneeCredSlsB2B
      TtlClrdLonsAmtLneeCredSlsB2B
      TtlActvLonsTmsLnrCredSlsB2P
      TtlActvLonsAmtLnrCredSlsB2P
      TtlBLLonsTmsLnrCredSlsB2P
      TtlBLLonsAmtLnrCredSlsB2P
      TtlClrdLonsTmsLnrCredSlsB2P
      TtlClrdLonsAmtLnrCredSlsB2P
      TtlActvLonsTmsLneeCredSlsP2B
      TtlActvLonsAmtLneeCredSlsP2B
      TtlBLLonsTmsLneeCredSlsP2B
      TtlBLLonsAmtLneeCredSlsP2B
      TtlClrdLonsTmsLneeCredSlsP2B
      TtlClrdLonsAmtLneeCredSlsP2B
      objectionStatus
      objOfficer
      objReason
      AdminNo
      Admin1
      Admin2
      Admin3
      Admin4
      Admin5
      Admin6
      Admin7
      Admin8
      Admin9
      Admin10
      Admin11
      Admin12
      Admin13
      Admin14
      Admin15
      Admin16
      Admin17
      Admin18
      Admin19
      Admin20
      Admin21
      Admin22
      Admin23
      Admin24
      Admin25
      Admin26
      Admin27
      Admin28
      Admin29
      Admin30
      Admin31
      Admin32
      Admin33
      Admin34
      Admin35
      Admin36
      Admin37
      Admin38
      Admin39
      Admin40
      Admin41
      Admin42
      Admin43
      Admin44
      Admin45
      Admin46
      Admin47
      Admin48
      Admin49
      Admin50
      updatedAt
      __typename
    }
  }
`;
export const deleteBizna = /* GraphQL */ `
  mutation DeleteBizna(
    $input: DeleteBiznaInput!
    $condition: ModelBiznaConditionInput
  ) {
    deleteBizna(input: $input, condition: $condition) {
      BusKntct
      busName
      pw
      TtlEarnings
      earningsBal
      bizBeneficiary
      netEarnings
      beneficiaryType
      benefitsAmount
      owner2email
      email
      licenseNo
      bizType
      bankType
      bankAccount
      status
      owner
      description
      createdAt
      noBL
      latitude
      longitude
      businessType
      bizContact
      TtlActvLonsTmsLnrCredSlsB2B
      TtlActvLonsAmtLnrCredSlsB2B
      TtlBLLonsTmsLnrCredSlsB2B
      TtlBLLonsAmtLnrCredSlsB2B
      TtlClrdLonsTmsLnrCredSlsB2B
      TtlClrdLonsAmtLnrCredSlsB2B
      TtlActvLonsTmsLneeCredSlsB2B
      TtlActvLonsAmtLneeCredSlsB2B
      TtlBLLonsTmsLneeCredSlsB2B
      TtlBLLonsAmtLneeCredSlsB2B
      TtlClrdLonsTmsLneeCredSlsB2B
      TtlClrdLonsAmtLneeCredSlsB2B
      TtlActvLonsTmsLnrCredSlsB2P
      TtlActvLonsAmtLnrCredSlsB2P
      TtlBLLonsTmsLnrCredSlsB2P
      TtlBLLonsAmtLnrCredSlsB2P
      TtlClrdLonsTmsLnrCredSlsB2P
      TtlClrdLonsAmtLnrCredSlsB2P
      TtlActvLonsTmsLneeCredSlsP2B
      TtlActvLonsAmtLneeCredSlsP2B
      TtlBLLonsTmsLneeCredSlsP2B
      TtlBLLonsAmtLneeCredSlsP2B
      TtlClrdLonsTmsLneeCredSlsP2B
      TtlClrdLonsAmtLneeCredSlsP2B
      objectionStatus
      objOfficer
      objReason
      AdminNo
      Admin1
      Admin2
      Admin3
      Admin4
      Admin5
      Admin6
      Admin7
      Admin8
      Admin9
      Admin10
      Admin11
      Admin12
      Admin13
      Admin14
      Admin15
      Admin16
      Admin17
      Admin18
      Admin19
      Admin20
      Admin21
      Admin22
      Admin23
      Admin24
      Admin25
      Admin26
      Admin27
      Admin28
      Admin29
      Admin30
      Admin31
      Admin32
      Admin33
      Admin34
      Admin35
      Admin36
      Admin37
      Admin38
      Admin39
      Admin40
      Admin41
      Admin42
      Admin43
      Admin44
      Admin45
      Admin46
      Admin47
      Admin48
      Admin49
      Admin50
      updatedAt
      __typename
    }
  }
`;
export const createBankAdmin = /* GraphQL */ `
  mutation CreateBankAdmin(
    $input: CreateBankAdminInput!
    $condition: ModelBankAdminConditionInput
  ) {
    createBankAdmin(input: $input, condition: $condition) {
      nationalid
      name
      phonecontact
      TtlEarnings
      pw
      BankAdmBal
      email
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateBankAdmin = /* GraphQL */ `
  mutation UpdateBankAdmin(
    $input: UpdateBankAdminInput!
    $condition: ModelBankAdminConditionInput
  ) {
    updateBankAdmin(input: $input, condition: $condition) {
      nationalid
      name
      phonecontact
      TtlEarnings
      pw
      BankAdmBal
      email
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteBankAdmin = /* GraphQL */ `
  mutation DeleteBankAdmin(
    $input: DeleteBankAdminInput!
    $condition: ModelBankAdminConditionInput
  ) {
    deleteBankAdmin(input: $input, condition: $condition) {
      nationalid
      name
      phonecontact
      TtlEarnings
      pw
      BankAdmBal
      email
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createMiFedhaBankAdmin = /* GraphQL */ `
  mutation CreateMiFedhaBankAdmin(
    $input: CreateMiFedhaBankAdminInput!
    $condition: ModelMiFedhaBankAdminConditionInput
  ) {
    createMiFedhaBankAdmin(input: $input, condition: $condition) {
      nationalid
      name
      phonecontact
      TtlEarnings
      pw
      BankAdmBal
      email
      bank
      BankAcNu
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateMiFedhaBankAdmin = /* GraphQL */ `
  mutation UpdateMiFedhaBankAdmin(
    $input: UpdateMiFedhaBankAdminInput!
    $condition: ModelMiFedhaBankAdminConditionInput
  ) {
    updateMiFedhaBankAdmin(input: $input, condition: $condition) {
      nationalid
      name
      phonecontact
      TtlEarnings
      pw
      BankAdmBal
      email
      bank
      BankAcNu
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteMiFedhaBankAdmin = /* GraphQL */ `
  mutation DeleteMiFedhaBankAdmin(
    $input: DeleteMiFedhaBankAdminInput!
    $condition: ModelMiFedhaBankAdminConditionInput
  ) {
    deleteMiFedhaBankAdmin(input: $input, condition: $condition) {
      nationalid
      name
      phonecontact
      TtlEarnings
      pw
      BankAdmBal
      email
      bank
      BankAcNu
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createChamaLoanSync = /* GraphQL */ `
  mutation CreateChamaLoanSync(
    $input: CreateChamaLoanSyncInput!
    $condition: ModelChamaLoanSyncConditionInput
  ) {
    createChamaLoanSync(input: $input, condition: $condition) {
      id
      amount
      GrpAc
      GrpAdmEmail
      BankAdminEmail
      ChamaName
      BankName
      BranchNu
      transactionType
      status
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateChamaLoanSync = /* GraphQL */ `
  mutation UpdateChamaLoanSync(
    $input: UpdateChamaLoanSyncInput!
    $condition: ModelChamaLoanSyncConditionInput
  ) {
    updateChamaLoanSync(input: $input, condition: $condition) {
      id
      amount
      GrpAc
      GrpAdmEmail
      BankAdminEmail
      ChamaName
      BankName
      BranchNu
      transactionType
      status
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteChamaLoanSync = /* GraphQL */ `
  mutation DeleteChamaLoanSync(
    $input: DeleteChamaLoanSyncInput!
    $condition: ModelChamaLoanSyncConditionInput
  ) {
    deleteChamaLoanSync(input: $input, condition: $condition) {
      id
      amount
      GrpAc
      GrpAdmEmail
      BankAdminEmail
      ChamaName
      BankName
      BranchNu
      transactionType
      status
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createChamaDividendsSync = /* GraphQL */ `
  mutation CreateChamaDividendsSync(
    $input: CreateChamaDividendsSyncInput!
    $condition: ModelChamaDividendsSyncConditionInput
  ) {
    createChamaDividendsSync(input: $input, condition: $condition) {
      id
      amount
      GrpAc
      GrpAdmEmail
      BankAdminEmail
      ChamaName
      BankName
      BranchNu
      transactionType
      status
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateChamaDividendsSync = /* GraphQL */ `
  mutation UpdateChamaDividendsSync(
    $input: UpdateChamaDividendsSyncInput!
    $condition: ModelChamaDividendsSyncConditionInput
  ) {
    updateChamaDividendsSync(input: $input, condition: $condition) {
      id
      amount
      GrpAc
      GrpAdmEmail
      BankAdminEmail
      ChamaName
      BankName
      BranchNu
      transactionType
      status
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteChamaDividendsSync = /* GraphQL */ `
  mutation DeleteChamaDividendsSync(
    $input: DeleteChamaDividendsSyncInput!
    $condition: ModelChamaDividendsSyncConditionInput
  ) {
    deleteChamaDividendsSync(input: $input, condition: $condition) {
      id
      amount
      GrpAc
      GrpAdmEmail
      BankAdminEmail
      ChamaName
      BankName
      BranchNu
      transactionType
      status
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createChamaSubscrptnSync = /* GraphQL */ `
  mutation CreateChamaSubscrptnSync(
    $input: CreateChamaSubscrptnSyncInput!
    $condition: ModelChamaSubscrptnSyncConditionInput
  ) {
    createChamaSubscrptnSync(input: $input, condition: $condition) {
      id
      amount
      GrpAc
      GrpAdmEmail
      BankAdminEmail
      ChamaName
      BankName
      BranchNu
      transactionType
      status
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateChamaSubscrptnSync = /* GraphQL */ `
  mutation UpdateChamaSubscrptnSync(
    $input: UpdateChamaSubscrptnSyncInput!
    $condition: ModelChamaSubscrptnSyncConditionInput
  ) {
    updateChamaSubscrptnSync(input: $input, condition: $condition) {
      id
      amount
      GrpAc
      GrpAdmEmail
      BankAdminEmail
      ChamaName
      BankName
      BranchNu
      transactionType
      status
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteChamaSubscrptnSync = /* GraphQL */ `
  mutation DeleteChamaSubscrptnSync(
    $input: DeleteChamaSubscrptnSyncInput!
    $condition: ModelChamaSubscrptnSyncConditionInput
  ) {
    deleteChamaSubscrptnSync(input: $input, condition: $condition) {
      id
      amount
      GrpAc
      GrpAdmEmail
      BankAdminEmail
      ChamaName
      BankName
      BranchNu
      transactionType
      status
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createChamaDepositSync = /* GraphQL */ `
  mutation CreateChamaDepositSync(
    $input: CreateChamaDepositSyncInput!
    $condition: ModelChamaDepositSyncConditionInput
  ) {
    createChamaDepositSync(input: $input, condition: $condition) {
      id
      amount
      GrpAc
      GrpAdmEmail
      BankAdminEmail
      ChamaName
      BankName
      BranchNu
      transactionType
      status
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateChamaDepositSync = /* GraphQL */ `
  mutation UpdateChamaDepositSync(
    $input: UpdateChamaDepositSyncInput!
    $condition: ModelChamaDepositSyncConditionInput
  ) {
    updateChamaDepositSync(input: $input, condition: $condition) {
      id
      amount
      GrpAc
      GrpAdmEmail
      BankAdminEmail
      ChamaName
      BankName
      BranchNu
      transactionType
      status
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteChamaDepositSync = /* GraphQL */ `
  mutation DeleteChamaDepositSync(
    $input: DeleteChamaDepositSyncInput!
    $condition: ModelChamaDepositSyncConditionInput
  ) {
    deleteChamaDepositSync(input: $input, condition: $condition) {
      id
      amount
      GrpAc
      GrpAdmEmail
      BankAdminEmail
      ChamaName
      BankName
      BranchNu
      transactionType
      status
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createChamaWithdrawalSync = /* GraphQL */ `
  mutation CreateChamaWithdrawalSync(
    $input: CreateChamaWithdrawalSyncInput!
    $condition: ModelChamaWithdrawalSyncConditionInput
  ) {
    createChamaWithdrawalSync(input: $input, condition: $condition) {
      id
      amount
      GrpAc
      GrpAdmEmail
      BankAdminEmail
      ChamaName
      BankName
      BranchNu
      transactionType
      status
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateChamaWithdrawalSync = /* GraphQL */ `
  mutation UpdateChamaWithdrawalSync(
    $input: UpdateChamaWithdrawalSyncInput!
    $condition: ModelChamaWithdrawalSyncConditionInput
  ) {
    updateChamaWithdrawalSync(input: $input, condition: $condition) {
      id
      amount
      GrpAc
      GrpAdmEmail
      BankAdminEmail
      ChamaName
      BankName
      BranchNu
      transactionType
      status
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteChamaWithdrawalSync = /* GraphQL */ `
  mutation DeleteChamaWithdrawalSync(
    $input: DeleteChamaWithdrawalSyncInput!
    $condition: ModelChamaWithdrawalSyncConditionInput
  ) {
    deleteChamaWithdrawalSync(input: $input, condition: $condition) {
      id
      amount
      GrpAc
      GrpAdmEmail
      BankAdminEmail
      ChamaName
      BankName
      BranchNu
      transactionType
      status
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createChamaLoanRpymntSync = /* GraphQL */ `
  mutation CreateChamaLoanRpymntSync(
    $input: CreateChamaLoanRpymntSyncInput!
    $condition: ModelChamaLoanRpymntSyncConditionInput
  ) {
    createChamaLoanRpymntSync(input: $input, condition: $condition) {
      id
      amount
      GrpAc
      GrpAdmEmail
      BankAdminEmail
      ChamaName
      BankName
      BranchNu
      transactionType
      status
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateChamaLoanRpymntSync = /* GraphQL */ `
  mutation UpdateChamaLoanRpymntSync(
    $input: UpdateChamaLoanRpymntSyncInput!
    $condition: ModelChamaLoanRpymntSyncConditionInput
  ) {
    updateChamaLoanRpymntSync(input: $input, condition: $condition) {
      id
      amount
      GrpAc
      GrpAdmEmail
      BankAdminEmail
      ChamaName
      BankName
      BranchNu
      transactionType
      status
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteChamaLoanRpymntSync = /* GraphQL */ `
  mutation DeleteChamaLoanRpymntSync(
    $input: DeleteChamaLoanRpymntSyncInput!
    $condition: ModelChamaLoanRpymntSyncConditionInput
  ) {
    deleteChamaLoanRpymntSync(input: $input, condition: $condition) {
      id
      amount
      GrpAc
      GrpAdmEmail
      BankAdminEmail
      ChamaName
      BankName
      BranchNu
      transactionType
      status
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createAdvocate = /* GraphQL */ `
  mutation CreateAdvocate(
    $input: CreateAdvocateInput!
    $condition: ModelAdvocateConditionInput
  ) {
    createAdvocate(input: $input, condition: $condition) {
      advregnu
      nationalid
      pwd
      name
      phonecontact
      TtlEarnings
      advBal
      email
      bankName
      bkAcNo
      officeLoc
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateAdvocate = /* GraphQL */ `
  mutation UpdateAdvocate(
    $input: UpdateAdvocateInput!
    $condition: ModelAdvocateConditionInput
  ) {
    updateAdvocate(input: $input, condition: $condition) {
      advregnu
      nationalid
      pwd
      name
      phonecontact
      TtlEarnings
      advBal
      email
      bankName
      bkAcNo
      officeLoc
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteAdvocate = /* GraphQL */ `
  mutation DeleteAdvocate(
    $input: DeleteAdvocateInput!
    $condition: ModelAdvocateConditionInput
  ) {
    deleteAdvocate(input: $input, condition: $condition) {
      advregnu
      nationalid
      pwd
      name
      phonecontact
      TtlEarnings
      advBal
      email
      bankName
      bkAcNo
      officeLoc
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createAdvocateWithdrawals = /* GraphQL */ `
  mutation CreateAdvocateWithdrawals(
    $input: CreateAdvocateWithdrawalsInput!
    $condition: ModelAdvocateWithdrawalsConditionInput
  ) {
    createAdvocateWithdrawals(input: $input, condition: $condition) {
      id
      bankAdmnId
      advregnu
      amount
      bankName
      bkAcNo
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateAdvocateWithdrawals = /* GraphQL */ `
  mutation UpdateAdvocateWithdrawals(
    $input: UpdateAdvocateWithdrawalsInput!
    $condition: ModelAdvocateWithdrawalsConditionInput
  ) {
    updateAdvocateWithdrawals(input: $input, condition: $condition) {
      id
      bankAdmnId
      advregnu
      amount
      bankName
      bkAcNo
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteAdvocateWithdrawals = /* GraphQL */ `
  mutation DeleteAdvocateWithdrawals(
    $input: DeleteAdvocateWithdrawalsInput!
    $condition: ModelAdvocateWithdrawalsConditionInput
  ) {
    deleteAdvocateWithdrawals(input: $input, condition: $condition) {
      id
      bankAdmnId
      advregnu
      amount
      bankName
      bkAcNo
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createMFBankWithdrawals = /* GraphQL */ `
  mutation CreateMFBankWithdrawals(
    $input: CreateMFBankWithdrawalsInput!
    $condition: ModelMFBankWithdrawalsConditionInput
  ) {
    createMFBankWithdrawals(input: $input, condition: $condition) {
      id
      bankAdmnId
      amount
      bankName
      bkAcNo
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateMFBankWithdrawals = /* GraphQL */ `
  mutation UpdateMFBankWithdrawals(
    $input: UpdateMFBankWithdrawalsInput!
    $condition: ModelMFBankWithdrawalsConditionInput
  ) {
    updateMFBankWithdrawals(input: $input, condition: $condition) {
      id
      bankAdmnId
      amount
      bankName
      bkAcNo
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteMFBankWithdrawals = /* GraphQL */ `
  mutation DeleteMFBankWithdrawals(
    $input: DeleteMFBankWithdrawalsInput!
    $condition: ModelMFBankWithdrawalsConditionInput
  ) {
    deleteMFBankWithdrawals(input: $input, condition: $condition) {
      id
      bankAdmnId
      amount
      bankName
      bkAcNo
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createCompany = /* GraphQL */ `
  mutation CreateCompany(
    $input: CreateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    createCompany(input: $input, condition: $condition) {
      AdminId
      phoneContact
      companyEmail
      termsNconditions
      alert
      about
      policy
      privacy
      recom
      pw1
      pw2
      agentwithdrawalFee
      agentCom
      sagentCom
      companyCom
      companyComDisc
      AdvCom
      ChampCom
      AdvCompanyCom
      bankAdminCom
      sawithdrawalFee
      advuserwithdrawalFee
      bankAdmuserwithdrawalFee
      userLoanTransferFee
      userTransferFee
      chmMmbrTransferFee
      chmTransferFee
      biznaTransferFee
      palpalLnRpymntFee
      chmLnRpymntFee
      crdSllrLnRpymntFee
      biznaCredSaleFee
      biznaCashSaleFee
      dfltWaiverFee
      tenderingFee
      EmploymentFee
      userClearanceFee
      CoverageFee
      vat
      ttlvat
      enquiryFee
      UsrWthdrwlFees
      ttlNonLonssRecSM
      ttlNonLonssSentSM
      ttlNonLonssRecChm
      ttlNonLonssSentChm
      companyEarningBal
      companyEarning
      agentEarningBal
      agentEarning
      saEarningBal
      saEarning
      AdvEarningBal
      AdvEarning
      admEarningBal
      admEarning
      ttlUsrDep
      ttlUserWthdrwl
      agentFloatIn
      agentFloatOut
      ttlActiveUsers
      ttlInactvUsrs
      ttlBLUsrs
      ttlActiveChm
      ttlInactvChm
      ttlBLChm
      ttlActiveChmUsers
      ttlInactvChmUsrs
      ttlBLChmUsrs
      ttlKFNdgActv
      ttlKFNdgInActv
      ttlKNdgBLStts
      ttlKFKbwActv
      ttlKFKbwInActv
      ttlKKbwBLStts
      ttlKFAdvActv
      ttlKFAdvInActv
      ttlKAdvBLStts
      ttlKFAdmActv
      ttlKFAdmInActv
      ttlKAdmBLStts
      ttlSMLnsInAmtCov
      ttlChmLnsInAmtCov
      ttlSellerLnsInAmtCov
      ttlSMLnsInActvAmtCov
      ttlChmLnsInActvAmtCov
      ttlSellerLnsInActvAmtCov
      ttlSMLnsInClrdAmtCov
      ttlChmLnsInClrdAmtCov
      ttlSellerLnsInClrdAmtCov
      ttlSMLnsInBlAmtCov
      ttlChmLnsInBlAmtCov
      ttlSellerLnsInBlAmtCov
      ttlSMLnsInTymsCov
      ttlChmLnsInTymsCov
      ttlSellerLnsInTymsCov
      ttlSMLnsInActvTymsCov
      ttlChmLnsInActvTymsCov
      ttlSellerLnsInActvTymsCov
      ttlSMLnsInClrdTymsCov
      ttlChmLnsInClrdTymsCov
      ttlSellerLnsInClrdTymsCov
      ttlSMLnsInBlTymsCov
      ttlChmLnsInBlTymsCov
      ttlSellerLnsInBlTymsCov
      ttlCompTrnsfrEarningsCov
      ttlCompBLClrncEarningsCov
      ttlSMLnsInAmtNonCov
      ttlChmLnsInAmtNonCov
      ttlSellerLnsInAmtNonCov
      ttlSMLnsInActvAmtNonCov
      ttlChmLnsInActvAmtNonCov
      ttlSellerLnsInActvAmtNonCov
      ttlSMLnsInClrdAmtNonCov
      ttlChmLnsInClrdAmtNonCov
      ttlSellerLnsInClrdAmtNonCov
      ttlSMLnsInBlAmtNonCov
      ttlChmLnsInBlAmtNonCov
      ttlSellerLnsInBlAmtNonCov
      ttlSMLnsInTymsNonCov
      ttlChmLnsInTymsNonCov
      ttlSellerLnsInTymsNonCov
      ttlSMLnsInActvTymsNonCov
      ttlChmLnsInActvTymsNonCov
      ttlSellerLnsInActvTymsNonCov
      ttlSMLnsInClrdTymsNonCov
      ttlChmLnsInClrdTymsNonCov
      ttlSellerLnsInClrdTymsNonCov
      ttlSMLnsInBlTymsNonCov
      ttlChmLnsInBlTymsNonCov
      ttlSellerLnsInBlTymsNonCov
      ttlCompTrnsfrEarningsNonCov
      ttlCompBLClrncEarningsNonCov
      ttlCompCovEarnings
      maxInterestSM
      maxInterestPwnBrkr
      maxInterestCredSllr
      maxInterestGrp
      maxMFNdogos
      maxBLs
      owner
      totalLnsRecovered
      createdAt
      MFNdogoTC
      MFKubwaTC
      AdvocateTC
      BiznaTNC
      ChamaTNC
      PayPalTNC
      maxDfltPen
      bizBLNo
      b2bBenCom
      b2pBenCom
      p2pBenCom
      g2pBenCom
      p2BBenCom
      BankMifedhaSyncFee
      transportCost
      transportCompanyShare
      updatedAt
      __typename
    }
  }
`;
export const updateCompany = /* GraphQL */ `
  mutation UpdateCompany(
    $input: UpdateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    updateCompany(input: $input, condition: $condition) {
      AdminId
      phoneContact
      companyEmail
      termsNconditions
      alert
      about
      policy
      privacy
      recom
      pw1
      pw2
      agentwithdrawalFee
      agentCom
      sagentCom
      companyCom
      companyComDisc
      AdvCom
      ChampCom
      AdvCompanyCom
      bankAdminCom
      sawithdrawalFee
      advuserwithdrawalFee
      bankAdmuserwithdrawalFee
      userLoanTransferFee
      userTransferFee
      chmMmbrTransferFee
      chmTransferFee
      biznaTransferFee
      palpalLnRpymntFee
      chmLnRpymntFee
      crdSllrLnRpymntFee
      biznaCredSaleFee
      biznaCashSaleFee
      dfltWaiverFee
      tenderingFee
      EmploymentFee
      userClearanceFee
      CoverageFee
      vat
      ttlvat
      enquiryFee
      UsrWthdrwlFees
      ttlNonLonssRecSM
      ttlNonLonssSentSM
      ttlNonLonssRecChm
      ttlNonLonssSentChm
      companyEarningBal
      companyEarning
      agentEarningBal
      agentEarning
      saEarningBal
      saEarning
      AdvEarningBal
      AdvEarning
      admEarningBal
      admEarning
      ttlUsrDep
      ttlUserWthdrwl
      agentFloatIn
      agentFloatOut
      ttlActiveUsers
      ttlInactvUsrs
      ttlBLUsrs
      ttlActiveChm
      ttlInactvChm
      ttlBLChm
      ttlActiveChmUsers
      ttlInactvChmUsrs
      ttlBLChmUsrs
      ttlKFNdgActv
      ttlKFNdgInActv
      ttlKNdgBLStts
      ttlKFKbwActv
      ttlKFKbwInActv
      ttlKKbwBLStts
      ttlKFAdvActv
      ttlKFAdvInActv
      ttlKAdvBLStts
      ttlKFAdmActv
      ttlKFAdmInActv
      ttlKAdmBLStts
      ttlSMLnsInAmtCov
      ttlChmLnsInAmtCov
      ttlSellerLnsInAmtCov
      ttlSMLnsInActvAmtCov
      ttlChmLnsInActvAmtCov
      ttlSellerLnsInActvAmtCov
      ttlSMLnsInClrdAmtCov
      ttlChmLnsInClrdAmtCov
      ttlSellerLnsInClrdAmtCov
      ttlSMLnsInBlAmtCov
      ttlChmLnsInBlAmtCov
      ttlSellerLnsInBlAmtCov
      ttlSMLnsInTymsCov
      ttlChmLnsInTymsCov
      ttlSellerLnsInTymsCov
      ttlSMLnsInActvTymsCov
      ttlChmLnsInActvTymsCov
      ttlSellerLnsInActvTymsCov
      ttlSMLnsInClrdTymsCov
      ttlChmLnsInClrdTymsCov
      ttlSellerLnsInClrdTymsCov
      ttlSMLnsInBlTymsCov
      ttlChmLnsInBlTymsCov
      ttlSellerLnsInBlTymsCov
      ttlCompTrnsfrEarningsCov
      ttlCompBLClrncEarningsCov
      ttlSMLnsInAmtNonCov
      ttlChmLnsInAmtNonCov
      ttlSellerLnsInAmtNonCov
      ttlSMLnsInActvAmtNonCov
      ttlChmLnsInActvAmtNonCov
      ttlSellerLnsInActvAmtNonCov
      ttlSMLnsInClrdAmtNonCov
      ttlChmLnsInClrdAmtNonCov
      ttlSellerLnsInClrdAmtNonCov
      ttlSMLnsInBlAmtNonCov
      ttlChmLnsInBlAmtNonCov
      ttlSellerLnsInBlAmtNonCov
      ttlSMLnsInTymsNonCov
      ttlChmLnsInTymsNonCov
      ttlSellerLnsInTymsNonCov
      ttlSMLnsInActvTymsNonCov
      ttlChmLnsInActvTymsNonCov
      ttlSellerLnsInActvTymsNonCov
      ttlSMLnsInClrdTymsNonCov
      ttlChmLnsInClrdTymsNonCov
      ttlSellerLnsInClrdTymsNonCov
      ttlSMLnsInBlTymsNonCov
      ttlChmLnsInBlTymsNonCov
      ttlSellerLnsInBlTymsNonCov
      ttlCompTrnsfrEarningsNonCov
      ttlCompBLClrncEarningsNonCov
      ttlCompCovEarnings
      maxInterestSM
      maxInterestPwnBrkr
      maxInterestCredSllr
      maxInterestGrp
      maxMFNdogos
      maxBLs
      owner
      totalLnsRecovered
      createdAt
      MFNdogoTC
      MFKubwaTC
      AdvocateTC
      BiznaTNC
      ChamaTNC
      PayPalTNC
      maxDfltPen
      bizBLNo
      b2bBenCom
      b2pBenCom
      p2pBenCom
      g2pBenCom
      p2BBenCom
      BankMifedhaSyncFee
      transportCost
      transportCompanyShare
      updatedAt
      __typename
    }
  }
`;
export const deleteCompany = /* GraphQL */ `
  mutation DeleteCompany(
    $input: DeleteCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    deleteCompany(input: $input, condition: $condition) {
      AdminId
      phoneContact
      companyEmail
      termsNconditions
      alert
      about
      policy
      privacy
      recom
      pw1
      pw2
      agentwithdrawalFee
      agentCom
      sagentCom
      companyCom
      companyComDisc
      AdvCom
      ChampCom
      AdvCompanyCom
      bankAdminCom
      sawithdrawalFee
      advuserwithdrawalFee
      bankAdmuserwithdrawalFee
      userLoanTransferFee
      userTransferFee
      chmMmbrTransferFee
      chmTransferFee
      biznaTransferFee
      palpalLnRpymntFee
      chmLnRpymntFee
      crdSllrLnRpymntFee
      biznaCredSaleFee
      biznaCashSaleFee
      dfltWaiverFee
      tenderingFee
      EmploymentFee
      userClearanceFee
      CoverageFee
      vat
      ttlvat
      enquiryFee
      UsrWthdrwlFees
      ttlNonLonssRecSM
      ttlNonLonssSentSM
      ttlNonLonssRecChm
      ttlNonLonssSentChm
      companyEarningBal
      companyEarning
      agentEarningBal
      agentEarning
      saEarningBal
      saEarning
      AdvEarningBal
      AdvEarning
      admEarningBal
      admEarning
      ttlUsrDep
      ttlUserWthdrwl
      agentFloatIn
      agentFloatOut
      ttlActiveUsers
      ttlInactvUsrs
      ttlBLUsrs
      ttlActiveChm
      ttlInactvChm
      ttlBLChm
      ttlActiveChmUsers
      ttlInactvChmUsrs
      ttlBLChmUsrs
      ttlKFNdgActv
      ttlKFNdgInActv
      ttlKNdgBLStts
      ttlKFKbwActv
      ttlKFKbwInActv
      ttlKKbwBLStts
      ttlKFAdvActv
      ttlKFAdvInActv
      ttlKAdvBLStts
      ttlKFAdmActv
      ttlKFAdmInActv
      ttlKAdmBLStts
      ttlSMLnsInAmtCov
      ttlChmLnsInAmtCov
      ttlSellerLnsInAmtCov
      ttlSMLnsInActvAmtCov
      ttlChmLnsInActvAmtCov
      ttlSellerLnsInActvAmtCov
      ttlSMLnsInClrdAmtCov
      ttlChmLnsInClrdAmtCov
      ttlSellerLnsInClrdAmtCov
      ttlSMLnsInBlAmtCov
      ttlChmLnsInBlAmtCov
      ttlSellerLnsInBlAmtCov
      ttlSMLnsInTymsCov
      ttlChmLnsInTymsCov
      ttlSellerLnsInTymsCov
      ttlSMLnsInActvTymsCov
      ttlChmLnsInActvTymsCov
      ttlSellerLnsInActvTymsCov
      ttlSMLnsInClrdTymsCov
      ttlChmLnsInClrdTymsCov
      ttlSellerLnsInClrdTymsCov
      ttlSMLnsInBlTymsCov
      ttlChmLnsInBlTymsCov
      ttlSellerLnsInBlTymsCov
      ttlCompTrnsfrEarningsCov
      ttlCompBLClrncEarningsCov
      ttlSMLnsInAmtNonCov
      ttlChmLnsInAmtNonCov
      ttlSellerLnsInAmtNonCov
      ttlSMLnsInActvAmtNonCov
      ttlChmLnsInActvAmtNonCov
      ttlSellerLnsInActvAmtNonCov
      ttlSMLnsInClrdAmtNonCov
      ttlChmLnsInClrdAmtNonCov
      ttlSellerLnsInClrdAmtNonCov
      ttlSMLnsInBlAmtNonCov
      ttlChmLnsInBlAmtNonCov
      ttlSellerLnsInBlAmtNonCov
      ttlSMLnsInTymsNonCov
      ttlChmLnsInTymsNonCov
      ttlSellerLnsInTymsNonCov
      ttlSMLnsInActvTymsNonCov
      ttlChmLnsInActvTymsNonCov
      ttlSellerLnsInActvTymsNonCov
      ttlSMLnsInClrdTymsNonCov
      ttlChmLnsInClrdTymsNonCov
      ttlSellerLnsInClrdTymsNonCov
      ttlSMLnsInBlTymsNonCov
      ttlChmLnsInBlTymsNonCov
      ttlSellerLnsInBlTymsNonCov
      ttlCompTrnsfrEarningsNonCov
      ttlCompBLClrncEarningsNonCov
      ttlCompCovEarnings
      maxInterestSM
      maxInterestPwnBrkr
      maxInterestCredSllr
      maxInterestGrp
      maxMFNdogos
      maxBLs
      owner
      totalLnsRecovered
      createdAt
      MFNdogoTC
      MFKubwaTC
      AdvocateTC
      BiznaTNC
      ChamaTNC
      PayPalTNC
      maxDfltPen
      bizBLNo
      b2bBenCom
      b2pBenCom
      p2pBenCom
      g2pBenCom
      p2BBenCom
      BankMifedhaSyncFee
      transportCost
      transportCompanyShare
      updatedAt
      __typename
    }
  }
`;
export const createCompanyUrls = /* GraphQL */ `
  mutation CreateCompanyUrls(
    $input: CreateCompanyUrlsInput!
    $condition: ModelCompanyUrlsConditionInput
  ) {
    createCompanyUrls(input: $input, condition: $condition) {
      AdminId
      Url1
      Url2
      Url3
      Url4
      Url5
      Url6
      Url7
      Url8
      Url9
      Url10
      Url11
      Url12
      Url13
      Url14
      Url15
      Url16
      Url17
      Url18
      Url19
      Url20
      Url21
      Url22
      Url23
      Url24
      Url25
      Url26
      Url27
      Url28
      Url29
      Url30
      Url31
      Url32
      Url33
      Url34
      Url35
      Url36
      Url37
      Url38
      Url39
      Url40
      Url41
      Url42
      Url43
      Url44
      Url45
      Url46
      Url47
      Url48
      Url49
      Url50
      Url51
      Url52
      Url53
      Url54
      Url55
      Url56
      Url57
      Url58
      Url59
      Url60
      Url61
      Url62
      Url63
      Url64
      Url65
      Url66
      Url67
      Url68
      Url69
      Url70
      Url71
      Url72
      Url73
      Url74
      Url75
      Url76
      Url77
      Url78
      Url79
      Url80
      Url81
      Url82
      Url83
      Url84
      Url85
      Url86
      Url87
      Url88
      Url89
      Url90
      Url91
      Url92
      Url93
      Url94
      Url95
      Url96
      Url97
      Url98
      Url99
      Url100
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateCompanyUrls = /* GraphQL */ `
  mutation UpdateCompanyUrls(
    $input: UpdateCompanyUrlsInput!
    $condition: ModelCompanyUrlsConditionInput
  ) {
    updateCompanyUrls(input: $input, condition: $condition) {
      AdminId
      Url1
      Url2
      Url3
      Url4
      Url5
      Url6
      Url7
      Url8
      Url9
      Url10
      Url11
      Url12
      Url13
      Url14
      Url15
      Url16
      Url17
      Url18
      Url19
      Url20
      Url21
      Url22
      Url23
      Url24
      Url25
      Url26
      Url27
      Url28
      Url29
      Url30
      Url31
      Url32
      Url33
      Url34
      Url35
      Url36
      Url37
      Url38
      Url39
      Url40
      Url41
      Url42
      Url43
      Url44
      Url45
      Url46
      Url47
      Url48
      Url49
      Url50
      Url51
      Url52
      Url53
      Url54
      Url55
      Url56
      Url57
      Url58
      Url59
      Url60
      Url61
      Url62
      Url63
      Url64
      Url65
      Url66
      Url67
      Url68
      Url69
      Url70
      Url71
      Url72
      Url73
      Url74
      Url75
      Url76
      Url77
      Url78
      Url79
      Url80
      Url81
      Url82
      Url83
      Url84
      Url85
      Url86
      Url87
      Url88
      Url89
      Url90
      Url91
      Url92
      Url93
      Url94
      Url95
      Url96
      Url97
      Url98
      Url99
      Url100
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteCompanyUrls = /* GraphQL */ `
  mutation DeleteCompanyUrls(
    $input: DeleteCompanyUrlsInput!
    $condition: ModelCompanyUrlsConditionInput
  ) {
    deleteCompanyUrls(input: $input, condition: $condition) {
      AdminId
      Url1
      Url2
      Url3
      Url4
      Url5
      Url6
      Url7
      Url8
      Url9
      Url10
      Url11
      Url12
      Url13
      Url14
      Url15
      Url16
      Url17
      Url18
      Url19
      Url20
      Url21
      Url22
      Url23
      Url24
      Url25
      Url26
      Url27
      Url28
      Url29
      Url30
      Url31
      Url32
      Url33
      Url34
      Url35
      Url36
      Url37
      Url38
      Url39
      Url40
      Url41
      Url42
      Url43
      Url44
      Url45
      Url46
      Url47
      Url48
      Url49
      Url50
      Url51
      Url52
      Url53
      Url54
      Url55
      Url56
      Url57
      Url58
      Url59
      Url60
      Url61
      Url62
      Url63
      Url64
      Url65
      Url66
      Url67
      Url68
      Url69
      Url70
      Url71
      Url72
      Url73
      Url74
      Url75
      Url76
      Url77
      Url78
      Url79
      Url80
      Url81
      Url82
      Url83
      Url84
      Url85
      Url86
      Url87
      Url88
      Url89
      Url90
      Url91
      Url92
      Url93
      Url94
      Url95
      Url96
      Url97
      Url98
      Url99
      Url100
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createGroup = /* GraphQL */ `
  mutation CreateGroup(
    $input: CreateGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    createGroup(input: $input, condition: $condition) {
      grpContact
      regNo
      signitoryContact
      SignitoryNatid
      signitoryName
      grpName
      signitoryPW
      oprtnArea
      venture
      signatory2Email
      signitory2Sub
      WithdrawCnfrmtn
      Signatory3Email
      WithdrawCnfrmtnAmt
      signitory3Sub2
      WithdrawCnfrmtn2
      WithdrawCnfrmtnAmt2
      BankAdminEmail
      BankAdminAcNu
      SignatoryEmail
      GrpLoanOutSync
      GrpLoanRpymntSync
      MemberSubscrptnSync
      MemberDividendSync
      DepositSync
      WithdrawalSync
      chamaBenSync
      BankName
      BranchNu
      loanApprovalThreshHold
      grpEmail
      grpBal
      ttlGrpMembers
      description
      withdrwlAmt
      ChmBenefits
      subscriptionFrequency
      subscriptionAmt
      lateSubscriptionPenalty
      objectionStatus
      objOfficer
      objReason
      AdminNo
      Admin1
      Admin2
      Admin3
      Admin4
      Admin5
      Admin6
      Admin7
      Admin8
      Admin9
      Admin10
      Admin11
      Admin12
      Admin13
      Admin14
      Admin15
      Admin16
      Admin17
      Admin18
      Admin19
      Admin20
      ttlNonLonsRecChm
      ttlNonLonsSentChm
      ttlDpst
      ttlWthdrwn
      tymsChmHvBL
      TtlActvLonsTmsLnrChmCov
      TtlActvLonsAmtLnrChmCov
      TtlBLLonsTmsLnrChmCov
      TtlBLLonsAmtLnrChmCov
      TtlClrdLonsTmsLnrChmCov
      TtlClrdLonsAmtLnrChmCov
      TtlActvLonsTmsLnrChmNonCov
      TtlActvLonsAmtLnrChmNonCov
      TtlBLLonsTmsLnrChmNonCov
      TtlBLLonsAmtLnrChmNonCov
      TtlClrdLonsTmsLnrChmNonCov
      TtlClrdLonsAmtLnrChmNonCov
      status
      owner
      createdAt
      chairSign
      secSign
      updatedAt
      __typename
    }
  }
`;
export const updateGroup = /* GraphQL */ `
  mutation UpdateGroup(
    $input: UpdateGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    updateGroup(input: $input, condition: $condition) {
      grpContact
      regNo
      signitoryContact
      SignitoryNatid
      signitoryName
      grpName
      signitoryPW
      oprtnArea
      venture
      signatory2Email
      signitory2Sub
      WithdrawCnfrmtn
      Signatory3Email
      WithdrawCnfrmtnAmt
      signitory3Sub2
      WithdrawCnfrmtn2
      WithdrawCnfrmtnAmt2
      BankAdminEmail
      BankAdminAcNu
      SignatoryEmail
      GrpLoanOutSync
      GrpLoanRpymntSync
      MemberSubscrptnSync
      MemberDividendSync
      DepositSync
      WithdrawalSync
      chamaBenSync
      BankName
      BranchNu
      loanApprovalThreshHold
      grpEmail
      grpBal
      ttlGrpMembers
      description
      withdrwlAmt
      ChmBenefits
      subscriptionFrequency
      subscriptionAmt
      lateSubscriptionPenalty
      objectionStatus
      objOfficer
      objReason
      AdminNo
      Admin1
      Admin2
      Admin3
      Admin4
      Admin5
      Admin6
      Admin7
      Admin8
      Admin9
      Admin10
      Admin11
      Admin12
      Admin13
      Admin14
      Admin15
      Admin16
      Admin17
      Admin18
      Admin19
      Admin20
      ttlNonLonsRecChm
      ttlNonLonsSentChm
      ttlDpst
      ttlWthdrwn
      tymsChmHvBL
      TtlActvLonsTmsLnrChmCov
      TtlActvLonsAmtLnrChmCov
      TtlBLLonsTmsLnrChmCov
      TtlBLLonsAmtLnrChmCov
      TtlClrdLonsTmsLnrChmCov
      TtlClrdLonsAmtLnrChmCov
      TtlActvLonsTmsLnrChmNonCov
      TtlActvLonsAmtLnrChmNonCov
      TtlBLLonsTmsLnrChmNonCov
      TtlBLLonsAmtLnrChmNonCov
      TtlClrdLonsTmsLnrChmNonCov
      TtlClrdLonsAmtLnrChmNonCov
      status
      owner
      createdAt
      chairSign
      secSign
      updatedAt
      __typename
    }
  }
`;
export const deleteGroup = /* GraphQL */ `
  mutation DeleteGroup(
    $input: DeleteGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    deleteGroup(input: $input, condition: $condition) {
      grpContact
      regNo
      signitoryContact
      SignitoryNatid
      signitoryName
      grpName
      signitoryPW
      oprtnArea
      venture
      signatory2Email
      signitory2Sub
      WithdrawCnfrmtn
      Signatory3Email
      WithdrawCnfrmtnAmt
      signitory3Sub2
      WithdrawCnfrmtn2
      WithdrawCnfrmtnAmt2
      BankAdminEmail
      BankAdminAcNu
      SignatoryEmail
      GrpLoanOutSync
      GrpLoanRpymntSync
      MemberSubscrptnSync
      MemberDividendSync
      DepositSync
      WithdrawalSync
      chamaBenSync
      BankName
      BranchNu
      loanApprovalThreshHold
      grpEmail
      grpBal
      ttlGrpMembers
      description
      withdrwlAmt
      ChmBenefits
      subscriptionFrequency
      subscriptionAmt
      lateSubscriptionPenalty
      objectionStatus
      objOfficer
      objReason
      AdminNo
      Admin1
      Admin2
      Admin3
      Admin4
      Admin5
      Admin6
      Admin7
      Admin8
      Admin9
      Admin10
      Admin11
      Admin12
      Admin13
      Admin14
      Admin15
      Admin16
      Admin17
      Admin18
      Admin19
      Admin20
      ttlNonLonsRecChm
      ttlNonLonsSentChm
      ttlDpst
      ttlWthdrwn
      tymsChmHvBL
      TtlActvLonsTmsLnrChmCov
      TtlActvLonsAmtLnrChmCov
      TtlBLLonsTmsLnrChmCov
      TtlBLLonsAmtLnrChmCov
      TtlClrdLonsTmsLnrChmCov
      TtlClrdLonsAmtLnrChmCov
      TtlActvLonsTmsLnrChmNonCov
      TtlActvLonsAmtLnrChmNonCov
      TtlBLLonsTmsLnrChmNonCov
      TtlBLLonsAmtLnrChmNonCov
      TtlClrdLonsTmsLnrChmNonCov
      TtlClrdLonsAmtLnrChmNonCov
      status
      owner
      createdAt
      chairSign
      secSign
      updatedAt
      __typename
    }
  }
`;
export const createChamaMembers = /* GraphQL */ `
  mutation CreateChamaMembers(
    $input: CreateChamaMembersInput!
    $condition: ModelChamaMembersConditionInput
  ) {
    createChamaMembers(input: $input, condition: $condition) {
      MembaId
      groupContact
      regNo
      ChamaNMember
      groupName
      memberContact
      memberName
      memberNatId
      memberChmBenefit
      timeCrtd
      subscribedAmt
      totalSubAmt
      ttlLateSubs
      GrossLnsGvn
      LonAmtGven
      AmtRepaid
      LnBal
      NonLoanAcBal
      ttlNonLonAcBal
      AcStatus
      loanStatus
      blStatus
      owner
      createdAt
      subscriptionFrequency
      subscriptionAmt
      lateSubscriptionPenalty
      transportApproved
      updatedAt
      __typename
    }
  }
`;
export const updateChamaMembers = /* GraphQL */ `
  mutation UpdateChamaMembers(
    $input: UpdateChamaMembersInput!
    $condition: ModelChamaMembersConditionInput
  ) {
    updateChamaMembers(input: $input, condition: $condition) {
      MembaId
      groupContact
      regNo
      ChamaNMember
      groupName
      memberContact
      memberName
      memberNatId
      memberChmBenefit
      timeCrtd
      subscribedAmt
      totalSubAmt
      ttlLateSubs
      GrossLnsGvn
      LonAmtGven
      AmtRepaid
      LnBal
      NonLoanAcBal
      ttlNonLonAcBal
      AcStatus
      loanStatus
      blStatus
      owner
      createdAt
      subscriptionFrequency
      subscriptionAmt
      lateSubscriptionPenalty
      transportApproved
      updatedAt
      __typename
    }
  }
`;
export const deleteChamaMembers = /* GraphQL */ `
  mutation DeleteChamaMembers(
    $input: DeleteChamaMembersInput!
    $condition: ModelChamaMembersConditionInput
  ) {
    deleteChamaMembers(input: $input, condition: $condition) {
      MembaId
      groupContact
      regNo
      ChamaNMember
      groupName
      memberContact
      memberName
      memberNatId
      memberChmBenefit
      timeCrtd
      subscribedAmt
      totalSubAmt
      ttlLateSubs
      GrossLnsGvn
      LonAmtGven
      AmtRepaid
      LnBal
      NonLoanAcBal
      ttlNonLonAcBal
      AcStatus
      loanStatus
      blStatus
      owner
      createdAt
      subscriptionFrequency
      subscriptionAmt
      lateSubscriptionPenalty
      transportApproved
      updatedAt
      __typename
    }
  }
`;
export const createChamasNPwnBrkrs = /* GraphQL */ `
  mutation CreateChamasNPwnBrkrs(
    $input: CreateChamasNPwnBrkrsInput!
    $condition: ModelChamasNPwnBrkrsConditionInput
  ) {
    createChamasNPwnBrkrs(input: $input, condition: $condition) {
      id
      contact
      regNo
      AcStatus
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateChamasNPwnBrkrs = /* GraphQL */ `
  mutation UpdateChamasNPwnBrkrs(
    $input: UpdateChamasNPwnBrkrsInput!
    $condition: ModelChamasNPwnBrkrsConditionInput
  ) {
    updateChamasNPwnBrkrs(input: $input, condition: $condition) {
      id
      contact
      regNo
      AcStatus
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteChamasNPwnBrkrs = /* GraphQL */ `
  mutation DeleteChamasNPwnBrkrs(
    $input: DeleteChamasNPwnBrkrsInput!
    $condition: ModelChamasNPwnBrkrsConditionInput
  ) {
    deleteChamasNPwnBrkrs(input: $input, condition: $condition) {
      id
      contact
      regNo
      AcStatus
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createGroupNonLoans = /* GraphQL */ `
  mutation CreateGroupNonLoans(
    $input: CreateGroupNonLoansInput!
    $condition: ModelGroupNonLoansConditionInput
  ) {
    createGroupNonLoans(input: $input, condition: $condition) {
      id
      grpContact
      recipientPhn
      receiverName
      SenderName
      amountSent
      memberId
      description
      senderEmail
      confirm1
      confirm2
      signatory2
      signatory3
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateGroupNonLoans = /* GraphQL */ `
  mutation UpdateGroupNonLoans(
    $input: UpdateGroupNonLoansInput!
    $condition: ModelGroupNonLoansConditionInput
  ) {
    updateGroupNonLoans(input: $input, condition: $condition) {
      id
      grpContact
      recipientPhn
      receiverName
      SenderName
      amountSent
      memberId
      description
      senderEmail
      confirm1
      confirm2
      signatory2
      signatory3
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteGroupNonLoans = /* GraphQL */ `
  mutation DeleteGroupNonLoans(
    $input: DeleteGroupNonLoansInput!
    $condition: ModelGroupNonLoansConditionInput
  ) {
    deleteGroupNonLoans(input: $input, condition: $condition) {
      id
      grpContact
      recipientPhn
      receiverName
      SenderName
      amountSent
      memberId
      description
      senderEmail
      confirm1
      confirm2
      signatory2
      signatory3
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createGrpMembersContribution = /* GraphQL */ `
  mutation CreateGrpMembersContribution(
    $input: CreateGrpMembersContributionInput!
    $condition: ModelGrpMembersContributionConditionInput
  ) {
    createGrpMembersContribution(input: $input, condition: $condition) {
      id
      memberPhn
      mmberNme
      GrpName
      grpContact
      contriAmount
      memberId
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateGrpMembersContribution = /* GraphQL */ `
  mutation UpdateGrpMembersContribution(
    $input: UpdateGrpMembersContributionInput!
    $condition: ModelGrpMembersContributionConditionInput
  ) {
    updateGrpMembersContribution(input: $input, condition: $condition) {
      id
      memberPhn
      mmberNme
      GrpName
      grpContact
      contriAmount
      memberId
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteGrpMembersContribution = /* GraphQL */ `
  mutation DeleteGrpMembersContribution(
    $input: DeleteGrpMembersContributionInput!
    $condition: ModelGrpMembersContributionConditionInput
  ) {
    deleteGrpMembersContribution(input: $input, condition: $condition) {
      id
      memberPhn
      mmberNme
      GrpName
      grpContact
      contriAmount
      memberId
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createReqLoan = /* GraphQL */ `
  mutation CreateReqLoan(
    $input: CreateReqLoanInput!
    $condition: ModelReqLoanConditionInput
  ) {
    createReqLoan(input: $input, condition: $condition) {
      id
      loaneeEmail
      loanerEmail
      loaneePhone
      loaneeName
      AdvEmail
      advLicNo
      loanerName
      loanerPhone
      dfltDeadLn
      amount
      repaymentAmt
      repaymentPeriod
      lnType
      status
      owner
      createdAt
      statusNumber
      description
      defaultPenalty
      installmentAmount
      paymentFrequency
      confirm1
      confirm2
      updatedAt
      __typename
    }
  }
`;
export const updateReqLoan = /* GraphQL */ `
  mutation UpdateReqLoan(
    $input: UpdateReqLoanInput!
    $condition: ModelReqLoanConditionInput
  ) {
    updateReqLoan(input: $input, condition: $condition) {
      id
      loaneeEmail
      loanerEmail
      loaneePhone
      loaneeName
      AdvEmail
      advLicNo
      loanerName
      loanerPhone
      dfltDeadLn
      amount
      repaymentAmt
      repaymentPeriod
      lnType
      status
      owner
      createdAt
      statusNumber
      description
      defaultPenalty
      installmentAmount
      paymentFrequency
      confirm1
      confirm2
      updatedAt
      __typename
    }
  }
`;
export const deleteReqLoan = /* GraphQL */ `
  mutation DeleteReqLoan(
    $input: DeleteReqLoanInput!
    $condition: ModelReqLoanConditionInput
  ) {
    deleteReqLoan(input: $input, condition: $condition) {
      id
      loaneeEmail
      loanerEmail
      loaneePhone
      loaneeName
      AdvEmail
      advLicNo
      loanerName
      loanerPhone
      dfltDeadLn
      amount
      repaymentAmt
      repaymentPeriod
      lnType
      status
      owner
      createdAt
      statusNumber
      description
      defaultPenalty
      installmentAmount
      paymentFrequency
      confirm1
      confirm2
      updatedAt
      __typename
    }
  }
`;
export const createReqLoanChama = /* GraphQL */ `
  mutation CreateReqLoanChama(
    $input: CreateReqLoanChamaInput!
    $condition: ModelReqLoanChamaConditionInput
  ) {
    createReqLoanChama(input: $input, condition: $condition) {
      id
      loaneeEmail
      chamaPhone
      loaneePhone
      loaneeName
      advLicNo
      dfltDeadLn
      amount
      repaymentAmt
      repaymentPeriod
      status
      owner
      lnType
      loaneeMemberId
      createdAt
      statusNumber
      AdvEmail
      loanerName
      loanerPhone
      description
      defaultPenalty
      installmentAmount
      paymentFrequency
      confirm1
      confirm2
      signatory2
      signatory3
      membersApprove
      loanMinutes
      loanMinutesImage
      loanFloatID
      updatedAt
      __typename
    }
  }
`;
export const updateReqLoanChama = /* GraphQL */ `
  mutation UpdateReqLoanChama(
    $input: UpdateReqLoanChamaInput!
    $condition: ModelReqLoanChamaConditionInput
  ) {
    updateReqLoanChama(input: $input, condition: $condition) {
      id
      loaneeEmail
      chamaPhone
      loaneePhone
      loaneeName
      advLicNo
      dfltDeadLn
      amount
      repaymentAmt
      repaymentPeriod
      status
      owner
      lnType
      loaneeMemberId
      createdAt
      statusNumber
      AdvEmail
      loanerName
      loanerPhone
      description
      defaultPenalty
      installmentAmount
      paymentFrequency
      confirm1
      confirm2
      signatory2
      signatory3
      membersApprove
      loanMinutes
      loanMinutesImage
      loanFloatID
      updatedAt
      __typename
    }
  }
`;
export const deleteReqLoanChama = /* GraphQL */ `
  mutation DeleteReqLoanChama(
    $input: DeleteReqLoanChamaInput!
    $condition: ModelReqLoanChamaConditionInput
  ) {
    deleteReqLoanChama(input: $input, condition: $condition) {
      id
      loaneeEmail
      chamaPhone
      loaneePhone
      loaneeName
      advLicNo
      dfltDeadLn
      amount
      repaymentAmt
      repaymentPeriod
      status
      owner
      lnType
      loaneeMemberId
      createdAt
      statusNumber
      AdvEmail
      loanerName
      loanerPhone
      description
      defaultPenalty
      installmentAmount
      paymentFrequency
      confirm1
      confirm2
      signatory2
      signatory3
      membersApprove
      loanMinutes
      loanMinutesImage
      loanFloatID
      updatedAt
      __typename
    }
  }
`;
export const createReqLoanCredSl = /* GraphQL */ `
  mutation CreateReqLoanCredSl(
    $input: CreateReqLoanCredSlInput!
    $condition: ModelReqLoanCredSlConditionInput
  ) {
    createReqLoanCredSl(input: $input, condition: $condition) {
      id
      loaneeEmail
      businessNo
      loaneePhone
      loaneeName
      itemName
      amount
      dfltDeadLn
      repaymentAmt
      repaymentPeriod
      status
      owner
      createdAt
      statusNumber
      lnType
      AdvEmail
      advLicNo
      loanerName
      loanerPhone
      description
      defaultPenalty
      installmentAmount
      paymentFrequency
      updatedAt
      __typename
    }
  }
`;
export const updateReqLoanCredSl = /* GraphQL */ `
  mutation UpdateReqLoanCredSl(
    $input: UpdateReqLoanCredSlInput!
    $condition: ModelReqLoanCredSlConditionInput
  ) {
    updateReqLoanCredSl(input: $input, condition: $condition) {
      id
      loaneeEmail
      businessNo
      loaneePhone
      loaneeName
      itemName
      amount
      dfltDeadLn
      repaymentAmt
      repaymentPeriod
      status
      owner
      createdAt
      statusNumber
      lnType
      AdvEmail
      advLicNo
      loanerName
      loanerPhone
      description
      defaultPenalty
      installmentAmount
      paymentFrequency
      updatedAt
      __typename
    }
  }
`;
export const deleteReqLoanCredSl = /* GraphQL */ `
  mutation DeleteReqLoanCredSl(
    $input: DeleteReqLoanCredSlInput!
    $condition: ModelReqLoanCredSlConditionInput
  ) {
    deleteReqLoanCredSl(input: $input, condition: $condition) {
      id
      loaneeEmail
      businessNo
      loaneePhone
      loaneeName
      itemName
      amount
      dfltDeadLn
      repaymentAmt
      repaymentPeriod
      status
      owner
      createdAt
      statusNumber
      lnType
      AdvEmail
      advLicNo
      loanerName
      loanerPhone
      description
      defaultPenalty
      installmentAmount
      paymentFrequency
      updatedAt
      __typename
    }
  }
`;
export const createExRates = /* GraphQL */ `
  mutation CreateExRates(
    $input: CreateExRatesInput!
    $condition: ModelExRatesConditionInput
  ) {
    createExRates(input: $input, condition: $condition) {
      cur
      sellingPrice
      buyingPrice
      symbol
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateExRates = /* GraphQL */ `
  mutation UpdateExRates(
    $input: UpdateExRatesInput!
    $condition: ModelExRatesConditionInput
  ) {
    updateExRates(input: $input, condition: $condition) {
      cur
      sellingPrice
      buyingPrice
      symbol
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteExRates = /* GraphQL */ `
  mutation DeleteExRates(
    $input: DeleteExRatesInput!
    $condition: ModelExRatesConditionInput
  ) {
    deleteExRates(input: $input, condition: $condition) {
      cur
      sellingPrice
      buyingPrice
      symbol
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createMFKOfferz = /* GraphQL */ `
  mutation CreateMFKOfferz(
    $input: CreateMFKOfferzInput!
    $condition: ModelMFKOfferzConditionInput
  ) {
    createMFKOfferz(input: $input, condition: $condition) {
      id
      offerStatus
      acCost
      amtPaid
      mfnOffered
      acChamp
      mfnReg
      status
      mfkAc
      acMainAc
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateMFKOfferz = /* GraphQL */ `
  mutation UpdateMFKOfferz(
    $input: UpdateMFKOfferzInput!
    $condition: ModelMFKOfferzConditionInput
  ) {
    updateMFKOfferz(input: $input, condition: $condition) {
      id
      offerStatus
      acCost
      amtPaid
      mfnOffered
      acChamp
      mfnReg
      status
      mfkAc
      acMainAc
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteMFKOfferz = /* GraphQL */ `
  mutation DeleteMFKOfferz(
    $input: DeleteMFKOfferzInput!
    $condition: ModelMFKOfferzConditionInput
  ) {
    deleteMFKOfferz(input: $input, condition: $condition) {
      id
      offerStatus
      acCost
      amtPaid
      mfnOffered
      acChamp
      mfnReg
      status
      mfkAc
      acMainAc
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createMFKOfferz2 = /* GraphQL */ `
  mutation CreateMFKOfferz2(
    $input: CreateMFKOfferz2Input!
    $condition: ModelMFKOfferz2ConditionInput
  ) {
    createMFKOfferz2(input: $input, condition: $condition) {
      id
      offerStatus
      acCost
      amtPaid
      mfnOffered
      acChamp
      bankAdminEmail
      mfnReg
      status
      mfkAc
      acMainAc
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateMFKOfferz2 = /* GraphQL */ `
  mutation UpdateMFKOfferz2(
    $input: UpdateMFKOfferz2Input!
    $condition: ModelMFKOfferz2ConditionInput
  ) {
    updateMFKOfferz2(input: $input, condition: $condition) {
      id
      offerStatus
      acCost
      amtPaid
      mfnOffered
      acChamp
      bankAdminEmail
      mfnReg
      status
      mfkAc
      acMainAc
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteMFKOfferz2 = /* GraphQL */ `
  mutation DeleteMFKOfferz2(
    $input: DeleteMFKOfferz2Input!
    $condition: ModelMFKOfferz2ConditionInput
  ) {
    deleteMFKOfferz2(input: $input, condition: $condition) {
      id
      offerStatus
      acCost
      amtPaid
      mfnOffered
      acChamp
      bankAdminEmail
      mfnReg
      status
      mfkAc
      acMainAc
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createChamaApply = /* GraphQL */ `
  mutation CreateChamaApply(
    $input: CreateChamaApplyInput!
    $condition: ModelChamaApplyConditionInput
  ) {
    createChamaApply(input: $input, condition: $condition) {
      id
      ChamaAdminEmail
      bankAdminEmail
      BankAdminAccount
      mfnReg
      status
      ChamaAcNu
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateChamaApply = /* GraphQL */ `
  mutation UpdateChamaApply(
    $input: UpdateChamaApplyInput!
    $condition: ModelChamaApplyConditionInput
  ) {
    updateChamaApply(input: $input, condition: $condition) {
      id
      ChamaAdminEmail
      bankAdminEmail
      BankAdminAccount
      mfnReg
      status
      ChamaAcNu
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteChamaApply = /* GraphQL */ `
  mutation DeleteChamaApply(
    $input: DeleteChamaApplyInput!
    $condition: ModelChamaApplyConditionInput
  ) {
    deleteChamaApply(input: $input, condition: $condition) {
      id
      ChamaAdminEmail
      bankAdminEmail
      BankAdminAccount
      mfnReg
      status
      ChamaAcNu
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createChamaLnApproval = /* GraphQL */ `
  mutation CreateChamaLnApproval(
    $input: CreateChamaLnApprovalInput!
    $condition: ModelChamaLnApprovalConditionInput
  ) {
    createChamaLnApproval(input: $input, condition: $condition) {
      id
      memberGrpNumber
      GrpAccount
      MemberEmail
      grpMinutes
      memberName
      grpName
      loanID
      status
      description
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateChamaLnApproval = /* GraphQL */ `
  mutation UpdateChamaLnApproval(
    $input: UpdateChamaLnApprovalInput!
    $condition: ModelChamaLnApprovalConditionInput
  ) {
    updateChamaLnApproval(input: $input, condition: $condition) {
      id
      memberGrpNumber
      GrpAccount
      MemberEmail
      grpMinutes
      memberName
      grpName
      loanID
      status
      description
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteChamaLnApproval = /* GraphQL */ `
  mutation DeleteChamaLnApproval(
    $input: DeleteChamaLnApprovalInput!
    $condition: ModelChamaLnApprovalConditionInput
  ) {
    deleteChamaLnApproval(input: $input, condition: $condition) {
      id
      memberGrpNumber
      GrpAccount
      MemberEmail
      grpMinutes
      memberName
      grpName
      loanID
      status
      description
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createChamaAdminLnApply = /* GraphQL */ `
  mutation CreateChamaAdminLnApply(
    $input: CreateChamaAdminLnApplyInput!
    $condition: ModelChamaAdminLnApplyConditionInput
  ) {
    createChamaAdminLnApply(input: $input, condition: $condition) {
      id
      grpName
      ChamaAdminEmail
      GrpAccount
      MemberEmail
      grpMinutes
      status
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateChamaAdminLnApply = /* GraphQL */ `
  mutation UpdateChamaAdminLnApply(
    $input: UpdateChamaAdminLnApplyInput!
    $condition: ModelChamaAdminLnApplyConditionInput
  ) {
    updateChamaAdminLnApply(input: $input, condition: $condition) {
      id
      grpName
      ChamaAdminEmail
      GrpAccount
      MemberEmail
      grpMinutes
      status
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteChamaAdminLnApply = /* GraphQL */ `
  mutation DeleteChamaAdminLnApply(
    $input: DeleteChamaAdminLnApplyInput!
    $condition: ModelChamaAdminLnApplyConditionInput
  ) {
    deleteChamaAdminLnApply(input: $input, condition: $condition) {
      id
      grpName
      ChamaAdminEmail
      GrpAccount
      MemberEmail
      grpMinutes
      status
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createChamaApply2 = /* GraphQL */ `
  mutation CreateChamaApply2(
    $input: CreateChamaApply2Input!
    $condition: ModelChamaApply2ConditionInput
  ) {
    createChamaApply2(input: $input, condition: $condition) {
      id
      ChamaAdminEmail
      bankAdminEmail
      BankAdminAccount
      mfnReg
      status
      ChamaAcNu
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateChamaApply2 = /* GraphQL */ `
  mutation UpdateChamaApply2(
    $input: UpdateChamaApply2Input!
    $condition: ModelChamaApply2ConditionInput
  ) {
    updateChamaApply2(input: $input, condition: $condition) {
      id
      ChamaAdminEmail
      bankAdminEmail
      BankAdminAccount
      mfnReg
      status
      ChamaAcNu
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteChamaApply2 = /* GraphQL */ `
  mutation DeleteChamaApply2(
    $input: DeleteChamaApply2Input!
    $condition: ModelChamaApply2ConditionInput
  ) {
    deleteChamaApply2(input: $input, condition: $condition) {
      id
      ChamaAdminEmail
      bankAdminEmail
      BankAdminAccount
      mfnReg
      status
      ChamaAcNu
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createAuditor = /* GraphQL */ `
  mutation CreateAuditor(
    $input: CreateAuditorInput!
    $condition: ModelAuditorConditionInput
  ) {
    createAuditor(input: $input, condition: $condition) {
      id
      name
      email
      active
      organization
      regions
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateAuditor = /* GraphQL */ `
  mutation UpdateAuditor(
    $input: UpdateAuditorInput!
    $condition: ModelAuditorConditionInput
  ) {
    updateAuditor(input: $input, condition: $condition) {
      id
      name
      email
      active
      organization
      regions
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteAuditor = /* GraphQL */ `
  mutation DeleteAuditor(
    $input: DeleteAuditorInput!
    $condition: ModelAuditorConditionInput
  ) {
    deleteAuditor(input: $input, condition: $condition) {
      id
      name
      email
      active
      organization
      regions
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createChamaControlTable = /* GraphQL */ `
  mutation CreateChamaControlTable(
    $input: CreateChamaControlTableInput!
    $condition: ModelChamaControlTableConditionInput
  ) {
    createChamaControlTable(input: $input, condition: $condition) {
      GroupID
      Institution
      LoansGiven
      LoansRepayment
      Subscriptions
      Dividends
      Withdrawals
      Deposits
      BankAdminEarnings
      GrpLoanOutEarnings
      GrpLoanEarnings
      SubscriptionsEarnings
      DividendsEarnings
      WithdrawalsEarnings
      DepositsEarnings
      GroupTotal
      MembersTotal
      BankAdminTotal
      status
      createdAt
      id
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateChamaControlTable = /* GraphQL */ `
  mutation UpdateChamaControlTable(
    $input: UpdateChamaControlTableInput!
    $condition: ModelChamaControlTableConditionInput
  ) {
    updateChamaControlTable(input: $input, condition: $condition) {
      GroupID
      Institution
      LoansGiven
      LoansRepayment
      Subscriptions
      Dividends
      Withdrawals
      Deposits
      BankAdminEarnings
      GrpLoanOutEarnings
      GrpLoanEarnings
      SubscriptionsEarnings
      DividendsEarnings
      WithdrawalsEarnings
      DepositsEarnings
      GroupTotal
      MembersTotal
      BankAdminTotal
      status
      createdAt
      id
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteChamaControlTable = /* GraphQL */ `
  mutation DeleteChamaControlTable(
    $input: DeleteChamaControlTableInput!
    $condition: ModelChamaControlTableConditionInput
  ) {
    deleteChamaControlTable(input: $input, condition: $condition) {
      GroupID
      Institution
      LoansGiven
      LoansRepayment
      Subscriptions
      Dividends
      Withdrawals
      Deposits
      BankAdminEarnings
      GrpLoanOutEarnings
      GrpLoanEarnings
      SubscriptionsEarnings
      DividendsEarnings
      WithdrawalsEarnings
      DepositsEarnings
      GroupTotal
      MembersTotal
      BankAdminTotal
      status
      createdAt
      id
      updatedAt
      owner
      __typename
    }
  }
`;
export const createRideRequest = /* GraphQL */ `
  mutation CreateRideRequest(
    $input: CreateRideRequestInput!
    $condition: ModelRideRequestConditionInput
  ) {
    createRideRequest(input: $input, condition: $condition) {
      id
      passengerEmail
      passengerName
      passengerContact
      pickupLatitude
      pickupLongitude
      destinationLatitude
      destinationLongitude
      distance
      estimatedCost
      selectedRiderID
      riderName
      riderContact
      riderRate
      paymentMethod
      paymentStatus
      rideStatus
      startTime
      endTime
      riderLatitude
      riderLongitude
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateRideRequest = /* GraphQL */ `
  mutation UpdateRideRequest(
    $input: UpdateRideRequestInput!
    $condition: ModelRideRequestConditionInput
  ) {
    updateRideRequest(input: $input, condition: $condition) {
      id
      passengerEmail
      passengerName
      passengerContact
      pickupLatitude
      pickupLongitude
      destinationLatitude
      destinationLongitude
      distance
      estimatedCost
      selectedRiderID
      riderName
      riderContact
      riderRate
      paymentMethod
      paymentStatus
      rideStatus
      startTime
      endTime
      riderLatitude
      riderLongitude
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteRideRequest = /* GraphQL */ `
  mutation DeleteRideRequest(
    $input: DeleteRideRequestInput!
    $condition: ModelRideRequestConditionInput
  ) {
    deleteRideRequest(input: $input, condition: $condition) {
      id
      passengerEmail
      passengerName
      passengerContact
      pickupLatitude
      pickupLongitude
      destinationLatitude
      destinationLongitude
      distance
      estimatedCost
      selectedRiderID
      riderName
      riderContact
      riderRate
      paymentMethod
      paymentStatus
      rideStatus
      startTime
      endTime
      riderLatitude
      riderLongitude
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createPayment = /* GraphQL */ `
  mutation CreatePayment(
    $input: CreatePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    createPayment(input: $input, condition: $condition) {
      id
      rideID
      riderID
      passengerEmail
      amount
      paymentMethod
      paymentStatus
      clearedAt
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updatePayment = /* GraphQL */ `
  mutation UpdatePayment(
    $input: UpdatePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    updatePayment(input: $input, condition: $condition) {
      id
      rideID
      riderID
      passengerEmail
      amount
      paymentMethod
      paymentStatus
      clearedAt
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deletePayment = /* GraphQL */ `
  mutation DeletePayment(
    $input: DeletePaymentInput!
    $condition: ModelPaymentConditionInput
  ) {
    deletePayment(input: $input, condition: $condition) {
      id
      rideID
      riderID
      passengerEmail
      amount
      paymentMethod
      paymentStatus
      clearedAt
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
      awsemail
      firebaseKey
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
      awsemail
      firebaseKey
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
      awsemail
      firebaseKey
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createRiderLocationUpdate = /* GraphQL */ `
  mutation CreateRiderLocationUpdate(
    $input: CreateRiderLocationUpdateInput!
    $condition: ModelRiderLocationUpdateConditionInput
  ) {
    createRiderLocationUpdate(input: $input, condition: $condition) {
      id
      riderID
      rideID
      latitude
      longitude
      updatedAt
      createdAt
      __typename
    }
  }
`;
export const updateRiderLocationUpdate = /* GraphQL */ `
  mutation UpdateRiderLocationUpdate(
    $input: UpdateRiderLocationUpdateInput!
    $condition: ModelRiderLocationUpdateConditionInput
  ) {
    updateRiderLocationUpdate(input: $input, condition: $condition) {
      id
      riderID
      rideID
      latitude
      longitude
      updatedAt
      createdAt
      __typename
    }
  }
`;
export const deleteRiderLocationUpdate = /* GraphQL */ `
  mutation DeleteRiderLocationUpdate(
    $input: DeleteRiderLocationUpdateInput!
    $condition: ModelRiderLocationUpdateConditionInput
  ) {
    deleteRiderLocationUpdate(input: $input, condition: $condition) {
      id
      riderID
      rideID
      latitude
      longitude
      updatedAt
      createdAt
      __typename
    }
  }
`;
export const createMessages = /* GraphQL */ `
  mutation CreateMessages(
    $input: CreateMessagesInput!
    $condition: ModelMessagesConditionInput
  ) {
    createMessages(input: $input, condition: $condition) {
      id
      senderEmail
      messageBody
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateMessages = /* GraphQL */ `
  mutation UpdateMessages(
    $input: UpdateMessagesInput!
    $condition: ModelMessagesConditionInput
  ) {
    updateMessages(input: $input, condition: $condition) {
      id
      senderEmail
      messageBody
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteMessages = /* GraphQL */ `
  mutation DeleteMessages(
    $input: DeleteMessagesInput!
    $condition: ModelMessagesConditionInput
  ) {
    deleteMessages(input: $input, condition: $condition) {
      id
      senderEmail
      messageBody
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createAveragePrices = /* GraphQL */ `
  mutation CreateAveragePrices(
    $input: CreateAveragePricesInput!
    $condition: ModelAveragePricesConditionInput
  ) {
    createAveragePrices(input: $input, condition: $condition) {
      id
      itemName
      itemBrand
      itemSpecs
      itemPrice
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateAveragePrices = /* GraphQL */ `
  mutation UpdateAveragePrices(
    $input: UpdateAveragePricesInput!
    $condition: ModelAveragePricesConditionInput
  ) {
    updateAveragePrices(input: $input, condition: $condition) {
      id
      itemName
      itemBrand
      itemSpecs
      itemPrice
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteAveragePrices = /* GraphQL */ `
  mutation DeleteAveragePrices(
    $input: DeleteAveragePricesInput!
    $condition: ModelAveragePricesConditionInput
  ) {
    deleteAveragePrices(input: $input, condition: $condition) {
      id
      itemName
      itemBrand
      itemSpecs
      itemPrice
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createCombContractVoucher = /* GraphQL */ `
  mutation CreateCombContractVoucher(
    $input: CreateCombContractVoucherInput!
    $condition: ModelCombContractVoucherConditionInput
  ) {
    createCombContractVoucher(input: $input, condition: $condition) {
      combContractID
      marketItemID
      consumerEmail
      funderEmail
      sellerEmail
      consumerAccount
      funderAccount
      sellerAccount
      consumerContact
      funderContact
      sellerName
      consumerName
      funderName
      sellerOfficerName
      consumerOfficerName
      funderOfficerName
      sellerContact
      consumerType
      sellerType
      funderType
      advertStatus
      marketConsumptionStatus
      itemPrice
      itemName
      itemBrand
      itemSpecifications
      numberOfItems
      marketConsumptionPrice
      marketConsumptionFrequency
      marketConsumptionTotal
      priceDeviation
      consumptionCapping
      consumptionMarginStatus
      consumptionMargin
      updateFrequency
      lastUpdateTime
      settlementTime
      prepostPay
      referencePrice
      referencePriceSource
      priceFlag
      accStatus
      generalPriceDev
      repaymentPeriod
      voucherLastUpdate
      createdAt
      id
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateCombContractVoucher = /* GraphQL */ `
  mutation UpdateCombContractVoucher(
    $input: UpdateCombContractVoucherInput!
    $condition: ModelCombContractVoucherConditionInput
  ) {
    updateCombContractVoucher(input: $input, condition: $condition) {
      combContractID
      marketItemID
      consumerEmail
      funderEmail
      sellerEmail
      consumerAccount
      funderAccount
      sellerAccount
      consumerContact
      funderContact
      sellerName
      consumerName
      funderName
      sellerOfficerName
      consumerOfficerName
      funderOfficerName
      sellerContact
      consumerType
      sellerType
      funderType
      advertStatus
      marketConsumptionStatus
      itemPrice
      itemName
      itemBrand
      itemSpecifications
      numberOfItems
      marketConsumptionPrice
      marketConsumptionFrequency
      marketConsumptionTotal
      priceDeviation
      consumptionCapping
      consumptionMarginStatus
      consumptionMargin
      updateFrequency
      lastUpdateTime
      settlementTime
      prepostPay
      referencePrice
      referencePriceSource
      priceFlag
      accStatus
      generalPriceDev
      repaymentPeriod
      voucherLastUpdate
      createdAt
      id
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteCombContractVoucher = /* GraphQL */ `
  mutation DeleteCombContractVoucher(
    $input: DeleteCombContractVoucherInput!
    $condition: ModelCombContractVoucherConditionInput
  ) {
    deleteCombContractVoucher(input: $input, condition: $condition) {
      combContractID
      marketItemID
      consumerEmail
      funderEmail
      sellerEmail
      consumerAccount
      funderAccount
      sellerAccount
      consumerContact
      funderContact
      sellerName
      consumerName
      funderName
      sellerOfficerName
      consumerOfficerName
      funderOfficerName
      sellerContact
      consumerType
      sellerType
      funderType
      advertStatus
      marketConsumptionStatus
      itemPrice
      itemName
      itemBrand
      itemSpecifications
      numberOfItems
      marketConsumptionPrice
      marketConsumptionFrequency
      marketConsumptionTotal
      priceDeviation
      consumptionCapping
      consumptionMarginStatus
      consumptionMargin
      updateFrequency
      lastUpdateTime
      settlementTime
      prepostPay
      referencePrice
      referencePriceSource
      priceFlag
      accStatus
      generalPriceDev
      repaymentPeriod
      voucherLastUpdate
      createdAt
      id
      updatedAt
      owner
      __typename
    }
  }
`;
export const createCombContract = /* GraphQL */ `
  mutation CreateCombContract(
    $input: CreateCombContractInput!
    $condition: ModelCombContractConditionInput
  ) {
    createCombContract(input: $input, condition: $condition) {
      marketItemID
      consumerEmail
      funderEmail
      sellerEmail
      consumerAccount
      funderAccount
      sellerAccount
      consumerContact
      funderContact
      sellerName
      consumerName
      funderName
      sellerOfficerName
      consumerOfficerName
      funderOfficerName
      sellerContact
      consumerType
      sellerType
      funderType
      advertStatus
      marketConsumptionStatus
      itemPrice
      itemName
      itemBrand
      itemSpecifications
      numberOfItems
      marketConsumptionPrice
      marketConsumptionFrequency
      marketConsumptionTotal
      priceDeviation
      consumptionCapping
      consumptionMarginStatus
      consumptionMargin
      updateFrequency
      lastUpdateTime
      settlementTime
      prepostPay
      referencePrice
      referencePriceSource
      priceFlag
      accStatus
      generalPriceDev
      repaymentPeriod
      createdAt
      id
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateCombContract = /* GraphQL */ `
  mutation UpdateCombContract(
    $input: UpdateCombContractInput!
    $condition: ModelCombContractConditionInput
  ) {
    updateCombContract(input: $input, condition: $condition) {
      marketItemID
      consumerEmail
      funderEmail
      sellerEmail
      consumerAccount
      funderAccount
      sellerAccount
      consumerContact
      funderContact
      sellerName
      consumerName
      funderName
      sellerOfficerName
      consumerOfficerName
      funderOfficerName
      sellerContact
      consumerType
      sellerType
      funderType
      advertStatus
      marketConsumptionStatus
      itemPrice
      itemName
      itemBrand
      itemSpecifications
      numberOfItems
      marketConsumptionPrice
      marketConsumptionFrequency
      marketConsumptionTotal
      priceDeviation
      consumptionCapping
      consumptionMarginStatus
      consumptionMargin
      updateFrequency
      lastUpdateTime
      settlementTime
      prepostPay
      referencePrice
      referencePriceSource
      priceFlag
      accStatus
      generalPriceDev
      repaymentPeriod
      createdAt
      id
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteCombContract = /* GraphQL */ `
  mutation DeleteCombContract(
    $input: DeleteCombContractInput!
    $condition: ModelCombContractConditionInput
  ) {
    deleteCombContract(input: $input, condition: $condition) {
      marketItemID
      consumerEmail
      funderEmail
      sellerEmail
      consumerAccount
      funderAccount
      sellerAccount
      consumerContact
      funderContact
      sellerName
      consumerName
      funderName
      sellerOfficerName
      consumerOfficerName
      funderOfficerName
      sellerContact
      consumerType
      sellerType
      funderType
      advertStatus
      marketConsumptionStatus
      itemPrice
      itemName
      itemBrand
      itemSpecifications
      numberOfItems
      marketConsumptionPrice
      marketConsumptionFrequency
      marketConsumptionTotal
      priceDeviation
      consumptionCapping
      consumptionMarginStatus
      consumptionMargin
      updateFrequency
      lastUpdateTime
      settlementTime
      prepostPay
      referencePrice
      referencePriceSource
      priceFlag
      accStatus
      generalPriceDev
      repaymentPeriod
      createdAt
      id
      updatedAt
      owner
      __typename
    }
  }
`;
export const createMarketConsumption = /* GraphQL */ `
  mutation CreateMarketConsumption(
    $input: CreateMarketConsumptionInput!
    $condition: ModelMarketConsumptionConditionInput
  ) {
    createMarketConsumption(input: $input, condition: $condition) {
      id
      marketItemID
      price
      sellerID
      buyerID
      soldAt
      sokoname
      itemBrand
      itemSpecifications
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateMarketConsumption = /* GraphQL */ `
  mutation UpdateMarketConsumption(
    $input: UpdateMarketConsumptionInput!
    $condition: ModelMarketConsumptionConditionInput
  ) {
    updateMarketConsumption(input: $input, condition: $condition) {
      id
      marketItemID
      price
      sellerID
      buyerID
      soldAt
      sokoname
      itemBrand
      itemSpecifications
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteMarketConsumption = /* GraphQL */ `
  mutation DeleteMarketConsumption(
    $input: DeleteMarketConsumptionInput!
    $condition: ModelMarketConsumptionConditionInput
  ) {
    deleteMarketConsumption(input: $input, condition: $condition) {
      id
      marketItemID
      price
      sellerID
      buyerID
      soldAt
      sokoname
      itemBrand
      itemSpecifications
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createCombPersonel = /* GraphQL */ `
  mutation CreateCombPersonel(
    $input: CreateCombPersonelInput!
    $condition: ModelCombPersonelConditionInput
  ) {
    createCombPersonel(input: $input, condition: $condition) {
      phoneKontact
      BusinessRegNo
      nationalid
      BiznaName
      name
      ownrsss
      email
      workerId
      workId
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateCombPersonel = /* GraphQL */ `
  mutation UpdateCombPersonel(
    $input: UpdateCombPersonelInput!
    $condition: ModelCombPersonelConditionInput
  ) {
    updateCombPersonel(input: $input, condition: $condition) {
      phoneKontact
      BusinessRegNo
      nationalid
      BiznaName
      name
      ownrsss
      email
      workerId
      workId
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteCombPersonel = /* GraphQL */ `
  mutation DeleteCombPersonel(
    $input: DeleteCombPersonelInput!
    $condition: ModelCombPersonelConditionInput
  ) {
    deleteCombPersonel(input: $input, condition: $condition) {
      phoneKontact
      BusinessRegNo
      nationalid
      BiznaName
      name
      ownrsss
      email
      workerId
      workId
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createChamaMinutes = /* GraphQL */ `
  mutation CreateChamaMinutes(
    $input: CreateChamaMinutesInput!
    $condition: ModelChamaMinutesConditionInput
  ) {
    createChamaMinutes(input: $input, condition: $condition) {
      id
      grpContact
      sittingNumber
      meetingDate
      venue
      status
      secretaryId
      chairpersonId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateChamaMinutes = /* GraphQL */ `
  mutation UpdateChamaMinutes(
    $input: UpdateChamaMinutesInput!
    $condition: ModelChamaMinutesConditionInput
  ) {
    updateChamaMinutes(input: $input, condition: $condition) {
      id
      grpContact
      sittingNumber
      meetingDate
      venue
      status
      secretaryId
      chairpersonId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteChamaMinutes = /* GraphQL */ `
  mutation DeleteChamaMinutes(
    $input: DeleteChamaMinutesInput!
    $condition: ModelChamaMinutesConditionInput
  ) {
    deleteChamaMinutes(input: $input, condition: $condition) {
      id
      grpContact
      sittingNumber
      meetingDate
      venue
      status
      secretaryId
      chairpersonId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createChamaMinutesItem = /* GraphQL */ `
  mutation CreateChamaMinutesItem(
    $input: CreateChamaMinutesItemInput!
    $condition: ModelChamaMinutesItemConditionInput
  ) {
    createChamaMinutesItem(input: $input, condition: $condition) {
      id
      minutesId
      entryOrder
      minuteRef
      title
      content
      decision
      relatedEntityId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateChamaMinutesItem = /* GraphQL */ `
  mutation UpdateChamaMinutesItem(
    $input: UpdateChamaMinutesItemInput!
    $condition: ModelChamaMinutesItemConditionInput
  ) {
    updateChamaMinutesItem(input: $input, condition: $condition) {
      id
      minutesId
      entryOrder
      minuteRef
      title
      content
      decision
      relatedEntityId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteChamaMinutesItem = /* GraphQL */ `
  mutation DeleteChamaMinutesItem(
    $input: DeleteChamaMinutesItemInput!
    $condition: ModelChamaMinutesItemConditionInput
  ) {
    deleteChamaMinutesItem(input: $input, condition: $condition) {
      id
      minutesId
      entryOrder
      minuteRef
      title
      content
      decision
      relatedEntityId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createChamaMeetingAttendance = /* GraphQL */ `
  mutation CreateChamaMeetingAttendance(
    $input: CreateChamaMeetingAttendanceInput!
    $condition: ModelChamaMeetingAttendanceConditionInput
  ) {
    createChamaMeetingAttendance(input: $input, condition: $condition) {
      id
      minutesId
      grpContact
      memberName
      memberEmail
      attendanceStatus
      markedBy
      markedAt
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateChamaMeetingAttendance = /* GraphQL */ `
  mutation UpdateChamaMeetingAttendance(
    $input: UpdateChamaMeetingAttendanceInput!
    $condition: ModelChamaMeetingAttendanceConditionInput
  ) {
    updateChamaMeetingAttendance(input: $input, condition: $condition) {
      id
      minutesId
      grpContact
      memberName
      memberEmail
      attendanceStatus
      markedBy
      markedAt
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteChamaMeetingAttendance = /* GraphQL */ `
  mutation DeleteChamaMeetingAttendance(
    $input: DeleteChamaMeetingAttendanceInput!
    $condition: ModelChamaMeetingAttendanceConditionInput
  ) {
    deleteChamaMeetingAttendance(input: $input, condition: $condition) {
      id
      minutesId
      grpContact
      memberName
      memberEmail
      attendanceStatus
      markedBy
      markedAt
      createdAt
      updatedAt
      __typename
    }
  }
`;
