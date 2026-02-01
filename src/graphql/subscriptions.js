/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSMAccount = /* GraphQL */ `
  subscription OnCreateSMAccount(
    $filter: ModelSubscriptionSMAccountFilterInput
    $owner: String
  ) {
    onCreateSMAccount(filter: $filter, owner: $owner) {
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
export const onUpdateSMAccount = /* GraphQL */ `
  subscription OnUpdateSMAccount(
    $filter: ModelSubscriptionSMAccountFilterInput
    $owner: String
  ) {
    onUpdateSMAccount(filter: $filter, owner: $owner) {
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
export const onDeleteSMAccount = /* GraphQL */ `
  subscription OnDeleteSMAccount(
    $filter: ModelSubscriptionSMAccountFilterInput
    $owner: String
  ) {
    onDeleteSMAccount(filter: $filter, owner: $owner) {
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
export const onCreateBenProd2 = /* GraphQL */ `
  subscription OnCreateBenProd2(
    $filter: ModelSubscriptionBenProd2FilterInput
    $owner: String
  ) {
    onCreateBenProd2(filter: $filter, owner: $owner) {
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
export const onUpdateBenProd2 = /* GraphQL */ `
  subscription OnUpdateBenProd2(
    $filter: ModelSubscriptionBenProd2FilterInput
    $owner: String
  ) {
    onUpdateBenProd2(filter: $filter, owner: $owner) {
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
export const onDeleteBenProd2 = /* GraphQL */ `
  subscription OnDeleteBenProd2(
    $filter: ModelSubscriptionBenProd2FilterInput
    $owner: String
  ) {
    onDeleteBenProd2(filter: $filter, owner: $owner) {
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
export const onCreateBenefitContributions2 = /* GraphQL */ `
  subscription OnCreateBenefitContributions2(
    $filter: ModelSubscriptionBenefitContributions2FilterInput
    $owner: String
  ) {
    onCreateBenefitContributions2(filter: $filter, owner: $owner) {
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
export const onUpdateBenefitContributions2 = /* GraphQL */ `
  subscription OnUpdateBenefitContributions2(
    $filter: ModelSubscriptionBenefitContributions2FilterInput
    $owner: String
  ) {
    onUpdateBenefitContributions2(filter: $filter, owner: $owner) {
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
export const onDeleteBenefitContributions2 = /* GraphQL */ `
  subscription OnDeleteBenefitContributions2(
    $filter: ModelSubscriptionBenefitContributions2FilterInput
    $owner: String
  ) {
    onDeleteBenefitContributions2(filter: $filter, owner: $owner) {
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
export const onCreateBenefitShare2 = /* GraphQL */ `
  subscription OnCreateBenefitShare2(
    $filter: ModelSubscriptionBenefitShare2FilterInput
    $owner: String
  ) {
    onCreateBenefitShare2(filter: $filter, owner: $owner) {
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
export const onUpdateBenefitShare2 = /* GraphQL */ `
  subscription OnUpdateBenefitShare2(
    $filter: ModelSubscriptionBenefitShare2FilterInput
    $owner: String
  ) {
    onUpdateBenefitShare2(filter: $filter, owner: $owner) {
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
export const onDeleteBenefitShare2 = /* GraphQL */ `
  subscription OnDeleteBenefitShare2(
    $filter: ModelSubscriptionBenefitShare2FilterInput
    $owner: String
  ) {
    onDeleteBenefitShare2(filter: $filter, owner: $owner) {
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
export const onCreateLinkBeneficiary2 = /* GraphQL */ `
  subscription OnCreateLinkBeneficiary2(
    $filter: ModelSubscriptionLinkBeneficiary2FilterInput
    $owner: String
  ) {
    onCreateLinkBeneficiary2(filter: $filter, owner: $owner) {
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
export const onUpdateLinkBeneficiary2 = /* GraphQL */ `
  subscription OnUpdateLinkBeneficiary2(
    $filter: ModelSubscriptionLinkBeneficiary2FilterInput
    $owner: String
  ) {
    onUpdateLinkBeneficiary2(filter: $filter, owner: $owner) {
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
export const onDeleteLinkBeneficiary2 = /* GraphQL */ `
  subscription OnDeleteLinkBeneficiary2(
    $filter: ModelSubscriptionLinkBeneficiary2FilterInput
    $owner: String
  ) {
    onDeleteLinkBeneficiary2(filter: $filter, owner: $owner) {
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
export const onCreateBizPartners2 = /* GraphQL */ `
  subscription OnCreateBizPartners2(
    $filter: ModelSubscriptionBizPartners2FilterInput
    $owner: String
  ) {
    onCreateBizPartners2(filter: $filter, owner: $owner) {
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
export const onUpdateBizPartners2 = /* GraphQL */ `
  subscription OnUpdateBizPartners2(
    $filter: ModelSubscriptionBizPartners2FilterInput
    $owner: String
  ) {
    onUpdateBizPartners2(filter: $filter, owner: $owner) {
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
export const onDeleteBizPartners2 = /* GraphQL */ `
  subscription OnDeleteBizPartners2(
    $filter: ModelSubscriptionBizPartners2FilterInput
    $owner: String
  ) {
    onDeleteBizPartners2(filter: $filter, owner: $owner) {
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
export const onCreateSMLoansCovered = /* GraphQL */ `
  subscription OnCreateSMLoansCovered(
    $filter: ModelSubscriptionSMLoansCoveredFilterInput
    $owner: String
  ) {
    onCreateSMLoansCovered(filter: $filter, owner: $owner) {
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
export const onUpdateSMLoansCovered = /* GraphQL */ `
  subscription OnUpdateSMLoansCovered(
    $filter: ModelSubscriptionSMLoansCoveredFilterInput
    $owner: String
  ) {
    onUpdateSMLoansCovered(filter: $filter, owner: $owner) {
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
export const onDeleteSMLoansCovered = /* GraphQL */ `
  subscription OnDeleteSMLoansCovered(
    $filter: ModelSubscriptionSMLoansCoveredFilterInput
    $owner: String
  ) {
    onDeleteSMLoansCovered(filter: $filter, owner: $owner) {
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
export const onCreateCovCreditSeller = /* GraphQL */ `
  subscription OnCreateCovCreditSeller(
    $filter: ModelSubscriptionCovCreditSellerFilterInput
    $owner: String
  ) {
    onCreateCovCreditSeller(filter: $filter, owner: $owner) {
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
export const onUpdateCovCreditSeller = /* GraphQL */ `
  subscription OnUpdateCovCreditSeller(
    $filter: ModelSubscriptionCovCreditSellerFilterInput
    $owner: String
  ) {
    onUpdateCovCreditSeller(filter: $filter, owner: $owner) {
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
export const onDeleteCovCreditSeller = /* GraphQL */ `
  subscription OnDeleteCovCreditSeller(
    $filter: ModelSubscriptionCovCreditSellerFilterInput
    $owner: String
  ) {
    onDeleteCovCreditSeller(filter: $filter, owner: $owner) {
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
export const onCreateCvrdGroupLoans = /* GraphQL */ `
  subscription OnCreateCvrdGroupLoans(
    $filter: ModelSubscriptionCvrdGroupLoansFilterInput
    $owner: String
  ) {
    onCreateCvrdGroupLoans(filter: $filter, owner: $owner) {
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
export const onUpdateCvrdGroupLoans = /* GraphQL */ `
  subscription OnUpdateCvrdGroupLoans(
    $filter: ModelSubscriptionCvrdGroupLoansFilterInput
    $owner: String
  ) {
    onUpdateCvrdGroupLoans(filter: $filter, owner: $owner) {
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
export const onDeleteCvrdGroupLoans = /* GraphQL */ `
  subscription OnDeleteCvrdGroupLoans(
    $filter: ModelSubscriptionCvrdGroupLoansFilterInput
    $owner: String
  ) {
    onDeleteCvrdGroupLoans(filter: $filter, owner: $owner) {
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
export const onCreateNonLoans = /* GraphQL */ `
  subscription OnCreateNonLoans(
    $filter: ModelSubscriptionNonLoansFilterInput
    $owner: String
  ) {
    onCreateNonLoans(filter: $filter, owner: $owner) {
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
export const onUpdateNonLoans = /* GraphQL */ `
  subscription OnUpdateNonLoans(
    $filter: ModelSubscriptionNonLoansFilterInput
    $owner: String
  ) {
    onUpdateNonLoans(filter: $filter, owner: $owner) {
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
export const onDeleteNonLoans = /* GraphQL */ `
  subscription OnDeleteNonLoans(
    $filter: ModelSubscriptionNonLoansFilterInput
    $owner: String
  ) {
    onDeleteNonLoans(filter: $filter, owner: $owner) {
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
export const onCreateBizSlsReq = /* GraphQL */ `
  subscription OnCreateBizSlsReq(
    $filter: ModelSubscriptionBizSlsReqFilterInput
    $owner: String
  ) {
    onCreateBizSlsReq(filter: $filter, owner: $owner) {
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
export const onUpdateBizSlsReq = /* GraphQL */ `
  subscription OnUpdateBizSlsReq(
    $filter: ModelSubscriptionBizSlsReqFilterInput
    $owner: String
  ) {
    onUpdateBizSlsReq(filter: $filter, owner: $owner) {
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
export const onDeleteBizSlsReq = /* GraphQL */ `
  subscription OnDeleteBizSlsReq(
    $filter: ModelSubscriptionBizSlsReqFilterInput
    $owner: String
  ) {
    onDeleteBizSlsReq(filter: $filter, owner: $owner) {
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
export const onCreateBizSls = /* GraphQL */ `
  subscription OnCreateBizSls(
    $filter: ModelSubscriptionBizSlsFilterInput
    $owner: String
  ) {
    onCreateBizSls(filter: $filter, owner: $owner) {
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
export const onUpdateBizSls = /* GraphQL */ `
  subscription OnUpdateBizSls(
    $filter: ModelSubscriptionBizSlsFilterInput
    $owner: String
  ) {
    onUpdateBizSls(filter: $filter, owner: $owner) {
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
export const onDeleteBizSls = /* GraphQL */ `
  subscription OnDeleteBizSls(
    $filter: ModelSubscriptionBizSlsFilterInput
    $owner: String
  ) {
    onDeleteBizSls(filter: $filter, owner: $owner) {
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
export const onCreateLoanRepayments = /* GraphQL */ `
  subscription OnCreateLoanRepayments(
    $filter: ModelSubscriptionLoanRepaymentsFilterInput
    $owner: String
  ) {
    onCreateLoanRepayments(filter: $filter, owner: $owner) {
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
export const onUpdateLoanRepayments = /* GraphQL */ `
  subscription OnUpdateLoanRepayments(
    $filter: ModelSubscriptionLoanRepaymentsFilterInput
    $owner: String
  ) {
    onUpdateLoanRepayments(filter: $filter, owner: $owner) {
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
export const onDeleteLoanRepayments = /* GraphQL */ `
  subscription OnDeleteLoanRepayments(
    $filter: ModelSubscriptionLoanRepaymentsFilterInput
    $owner: String
  ) {
    onDeleteLoanRepayments(filter: $filter, owner: $owner) {
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
export const onCreateSokoAd = /* GraphQL */ `
  subscription OnCreateSokoAd(
    $filter: ModelSubscriptionSokoAdFilterInput
    $owner: String
  ) {
    onCreateSokoAd(filter: $filter, owner: $owner) {
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
export const onUpdateSokoAd = /* GraphQL */ `
  subscription OnUpdateSokoAd(
    $filter: ModelSubscriptionSokoAdFilterInput
    $owner: String
  ) {
    onUpdateSokoAd(filter: $filter, owner: $owner) {
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
export const onDeleteSokoAd = /* GraphQL */ `
  subscription OnDeleteSokoAd(
    $filter: ModelSubscriptionSokoAdFilterInput
    $owner: String
  ) {
    onDeleteSokoAd(filter: $filter, owner: $owner) {
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
export const onCreateTransportRegister = /* GraphQL */ `
  subscription OnCreateTransportRegister(
    $filter: ModelSubscriptionTransportRegisterFilterInput
    $owner: String
  ) {
    onCreateTransportRegister(filter: $filter, owner: $owner) {
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
export const onUpdateTransportRegister = /* GraphQL */ `
  subscription OnUpdateTransportRegister(
    $filter: ModelSubscriptionTransportRegisterFilterInput
    $owner: String
  ) {
    onUpdateTransportRegister(filter: $filter, owner: $owner) {
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
export const onDeleteTransportRegister = /* GraphQL */ `
  subscription OnDeleteTransportRegister(
    $filter: ModelSubscriptionTransportRegisterFilterInput
    $owner: String
  ) {
    onDeleteTransportRegister(filter: $filter, owner: $owner) {
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
export const onCreateTransportOrder = /* GraphQL */ `
  subscription OnCreateTransportOrder(
    $filter: ModelSubscriptionTransportOrderFilterInput
    $owner: String
  ) {
    onCreateTransportOrder(filter: $filter, owner: $owner) {
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
export const onUpdateTransportOrder = /* GraphQL */ `
  subscription OnUpdateTransportOrder(
    $filter: ModelSubscriptionTransportOrderFilterInput
    $owner: String
  ) {
    onUpdateTransportOrder(filter: $filter, owner: $owner) {
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
export const onDeleteTransportOrder = /* GraphQL */ `
  subscription OnDeleteTransportOrder(
    $filter: ModelSubscriptionTransportOrderFilterInput
    $owner: String
  ) {
    onDeleteTransportOrder(filter: $filter, owner: $owner) {
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
export const onCreateRafikiLnAd = /* GraphQL */ `
  subscription OnCreateRafikiLnAd(
    $filter: ModelSubscriptionRafikiLnAdFilterInput
    $owner: String
  ) {
    onCreateRafikiLnAd(filter: $filter, owner: $owner) {
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
export const onUpdateRafikiLnAd = /* GraphQL */ `
  subscription OnUpdateRafikiLnAd(
    $filter: ModelSubscriptionRafikiLnAdFilterInput
    $owner: String
  ) {
    onUpdateRafikiLnAd(filter: $filter, owner: $owner) {
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
export const onDeleteRafikiLnAd = /* GraphQL */ `
  subscription OnDeleteRafikiLnAd(
    $filter: ModelSubscriptionRafikiLnAdFilterInput
    $owner: String
  ) {
    onDeleteRafikiLnAd(filter: $filter, owner: $owner) {
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
export const onCreateAgent = /* GraphQL */ `
  subscription OnCreateAgent(
    $filter: ModelSubscriptionAgentFilterInput
    $owner: String
  ) {
    onCreateAgent(filter: $filter, owner: $owner) {
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
export const onUpdateAgent = /* GraphQL */ `
  subscription OnUpdateAgent(
    $filter: ModelSubscriptionAgentFilterInput
    $owner: String
  ) {
    onUpdateAgent(filter: $filter, owner: $owner) {
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
export const onDeleteAgent = /* GraphQL */ `
  subscription OnDeleteAgent(
    $filter: ModelSubscriptionAgentFilterInput
    $owner: String
  ) {
    onDeleteAgent(filter: $filter, owner: $owner) {
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
export const onCreateFloatPurchase = /* GraphQL */ `
  subscription OnCreateFloatPurchase(
    $filter: ModelSubscriptionFloatPurchaseFilterInput
    $owner: String
  ) {
    onCreateFloatPurchase(filter: $filter, owner: $owner) {
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
export const onUpdateFloatPurchase = /* GraphQL */ `
  subscription OnUpdateFloatPurchase(
    $filter: ModelSubscriptionFloatPurchaseFilterInput
    $owner: String
  ) {
    onUpdateFloatPurchase(filter: $filter, owner: $owner) {
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
export const onDeleteFloatPurchase = /* GraphQL */ `
  subscription OnDeleteFloatPurchase(
    $filter: ModelSubscriptionFloatPurchaseFilterInput
    $owner: String
  ) {
    onDeleteFloatPurchase(filter: $filter, owner: $owner) {
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
export const onCreateFloatAdd = /* GraphQL */ `
  subscription OnCreateFloatAdd(
    $filter: ModelSubscriptionFloatAddFilterInput
    $owner: String
  ) {
    onCreateFloatAdd(filter: $filter, owner: $owner) {
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
export const onUpdateFloatAdd = /* GraphQL */ `
  subscription OnUpdateFloatAdd(
    $filter: ModelSubscriptionFloatAddFilterInput
    $owner: String
  ) {
    onUpdateFloatAdd(filter: $filter, owner: $owner) {
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
export const onDeleteFloatAdd = /* GraphQL */ `
  subscription OnDeleteFloatAdd(
    $filter: ModelSubscriptionFloatAddFilterInput
    $owner: String
  ) {
    onDeleteFloatAdd(filter: $filter, owner: $owner) {
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
export const onCreateFloatReduction = /* GraphQL */ `
  subscription OnCreateFloatReduction(
    $filter: ModelSubscriptionFloatReductionFilterInput
    $owner: String
  ) {
    onCreateFloatReduction(filter: $filter, owner: $owner) {
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
export const onUpdateFloatReduction = /* GraphQL */ `
  subscription OnUpdateFloatReduction(
    $filter: ModelSubscriptionFloatReductionFilterInput
    $owner: String
  ) {
    onUpdateFloatReduction(filter: $filter, owner: $owner) {
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
export const onDeleteFloatReduction = /* GraphQL */ `
  subscription OnDeleteFloatReduction(
    $filter: ModelSubscriptionFloatReductionFilterInput
    $owner: String
  ) {
    onDeleteFloatReduction(filter: $filter, owner: $owner) {
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
export const onCreateAgentWithdrawals = /* GraphQL */ `
  subscription OnCreateAgentWithdrawals(
    $filter: ModelSubscriptionAgentWithdrawalsFilterInput
    $owner: String
  ) {
    onCreateAgentWithdrawals(filter: $filter, owner: $owner) {
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
export const onUpdateAgentWithdrawals = /* GraphQL */ `
  subscription OnUpdateAgentWithdrawals(
    $filter: ModelSubscriptionAgentWithdrawalsFilterInput
    $owner: String
  ) {
    onUpdateAgentWithdrawals(filter: $filter, owner: $owner) {
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
export const onDeleteAgentWithdrawals = /* GraphQL */ `
  subscription OnDeleteAgentWithdrawals(
    $filter: ModelSubscriptionAgentWithdrawalsFilterInput
    $owner: String
  ) {
    onDeleteAgentWithdrawals(filter: $filter, owner: $owner) {
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
export const onCreateSAgent = /* GraphQL */ `
  subscription OnCreateSAgent(
    $filter: ModelSubscriptionSAgentFilterInput
    $owner: String
  ) {
    onCreateSAgent(filter: $filter, owner: $owner) {
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
export const onUpdateSAgent = /* GraphQL */ `
  subscription OnUpdateSAgent(
    $filter: ModelSubscriptionSAgentFilterInput
    $owner: String
  ) {
    onUpdateSAgent(filter: $filter, owner: $owner) {
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
export const onDeleteSAgent = /* GraphQL */ `
  subscription OnDeleteSAgent(
    $filter: ModelSubscriptionSAgentFilterInput
    $owner: String
  ) {
    onDeleteSAgent(filter: $filter, owner: $owner) {
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
export const onCreateSAgentWithdrawals = /* GraphQL */ `
  subscription OnCreateSAgentWithdrawals(
    $filter: ModelSubscriptionSAgentWithdrawalsFilterInput
    $owner: String
  ) {
    onCreateSAgentWithdrawals(filter: $filter, owner: $owner) {
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
export const onUpdateSAgentWithdrawals = /* GraphQL */ `
  subscription OnUpdateSAgentWithdrawals(
    $filter: ModelSubscriptionSAgentWithdrawalsFilterInput
    $owner: String
  ) {
    onUpdateSAgentWithdrawals(filter: $filter, owner: $owner) {
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
export const onDeleteSAgentWithdrawals = /* GraphQL */ `
  subscription OnDeleteSAgentWithdrawals(
    $filter: ModelSubscriptionSAgentWithdrawalsFilterInput
    $owner: String
  ) {
    onDeleteSAgentWithdrawals(filter: $filter, owner: $owner) {
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
export const onCreatePersonel = /* GraphQL */ `
  subscription OnCreatePersonel(
    $filter: ModelSubscriptionPersonelFilterInput
    $owner: String
  ) {
    onCreatePersonel(filter: $filter, owner: $owner) {
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
export const onUpdatePersonel = /* GraphQL */ `
  subscription OnUpdatePersonel(
    $filter: ModelSubscriptionPersonelFilterInput
    $owner: String
  ) {
    onUpdatePersonel(filter: $filter, owner: $owner) {
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
export const onDeletePersonel = /* GraphQL */ `
  subscription OnDeletePersonel(
    $filter: ModelSubscriptionPersonelFilterInput
    $owner: String
  ) {
    onDeletePersonel(filter: $filter, owner: $owner) {
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
export const onCreateBizna = /* GraphQL */ `
  subscription OnCreateBizna($filter: ModelSubscriptionBiznaFilterInput) {
    onCreateBizna(filter: $filter) {
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
export const onUpdateBizna = /* GraphQL */ `
  subscription OnUpdateBizna($filter: ModelSubscriptionBiznaFilterInput) {
    onUpdateBizna(filter: $filter) {
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
export const onDeleteBizna = /* GraphQL */ `
  subscription OnDeleteBizna($filter: ModelSubscriptionBiznaFilterInput) {
    onDeleteBizna(filter: $filter) {
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
export const onCreateBankAdmin = /* GraphQL */ `
  subscription OnCreateBankAdmin(
    $filter: ModelSubscriptionBankAdminFilterInput
    $owner: String
  ) {
    onCreateBankAdmin(filter: $filter, owner: $owner) {
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
export const onUpdateBankAdmin = /* GraphQL */ `
  subscription OnUpdateBankAdmin(
    $filter: ModelSubscriptionBankAdminFilterInput
    $owner: String
  ) {
    onUpdateBankAdmin(filter: $filter, owner: $owner) {
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
export const onDeleteBankAdmin = /* GraphQL */ `
  subscription OnDeleteBankAdmin(
    $filter: ModelSubscriptionBankAdminFilterInput
    $owner: String
  ) {
    onDeleteBankAdmin(filter: $filter, owner: $owner) {
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
export const onCreateMiFedhaBankAdmin = /* GraphQL */ `
  subscription OnCreateMiFedhaBankAdmin(
    $filter: ModelSubscriptionMiFedhaBankAdminFilterInput
    $owner: String
  ) {
    onCreateMiFedhaBankAdmin(filter: $filter, owner: $owner) {
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
export const onUpdateMiFedhaBankAdmin = /* GraphQL */ `
  subscription OnUpdateMiFedhaBankAdmin(
    $filter: ModelSubscriptionMiFedhaBankAdminFilterInput
    $owner: String
  ) {
    onUpdateMiFedhaBankAdmin(filter: $filter, owner: $owner) {
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
export const onDeleteMiFedhaBankAdmin = /* GraphQL */ `
  subscription OnDeleteMiFedhaBankAdmin(
    $filter: ModelSubscriptionMiFedhaBankAdminFilterInput
    $owner: String
  ) {
    onDeleteMiFedhaBankAdmin(filter: $filter, owner: $owner) {
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
export const onCreateChamaLoanSync = /* GraphQL */ `
  subscription OnCreateChamaLoanSync(
    $filter: ModelSubscriptionChamaLoanSyncFilterInput
    $owner: String
  ) {
    onCreateChamaLoanSync(filter: $filter, owner: $owner) {
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
export const onUpdateChamaLoanSync = /* GraphQL */ `
  subscription OnUpdateChamaLoanSync(
    $filter: ModelSubscriptionChamaLoanSyncFilterInput
    $owner: String
  ) {
    onUpdateChamaLoanSync(filter: $filter, owner: $owner) {
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
export const onDeleteChamaLoanSync = /* GraphQL */ `
  subscription OnDeleteChamaLoanSync(
    $filter: ModelSubscriptionChamaLoanSyncFilterInput
    $owner: String
  ) {
    onDeleteChamaLoanSync(filter: $filter, owner: $owner) {
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
export const onCreateChamaDividendsSync = /* GraphQL */ `
  subscription OnCreateChamaDividendsSync(
    $filter: ModelSubscriptionChamaDividendsSyncFilterInput
    $owner: String
  ) {
    onCreateChamaDividendsSync(filter: $filter, owner: $owner) {
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
export const onUpdateChamaDividendsSync = /* GraphQL */ `
  subscription OnUpdateChamaDividendsSync(
    $filter: ModelSubscriptionChamaDividendsSyncFilterInput
    $owner: String
  ) {
    onUpdateChamaDividendsSync(filter: $filter, owner: $owner) {
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
export const onDeleteChamaDividendsSync = /* GraphQL */ `
  subscription OnDeleteChamaDividendsSync(
    $filter: ModelSubscriptionChamaDividendsSyncFilterInput
    $owner: String
  ) {
    onDeleteChamaDividendsSync(filter: $filter, owner: $owner) {
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
export const onCreateChamaSubscrptnSync = /* GraphQL */ `
  subscription OnCreateChamaSubscrptnSync(
    $filter: ModelSubscriptionChamaSubscrptnSyncFilterInput
    $owner: String
  ) {
    onCreateChamaSubscrptnSync(filter: $filter, owner: $owner) {
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
export const onUpdateChamaSubscrptnSync = /* GraphQL */ `
  subscription OnUpdateChamaSubscrptnSync(
    $filter: ModelSubscriptionChamaSubscrptnSyncFilterInput
    $owner: String
  ) {
    onUpdateChamaSubscrptnSync(filter: $filter, owner: $owner) {
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
export const onDeleteChamaSubscrptnSync = /* GraphQL */ `
  subscription OnDeleteChamaSubscrptnSync(
    $filter: ModelSubscriptionChamaSubscrptnSyncFilterInput
    $owner: String
  ) {
    onDeleteChamaSubscrptnSync(filter: $filter, owner: $owner) {
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
export const onCreateChamaDepositSync = /* GraphQL */ `
  subscription OnCreateChamaDepositSync(
    $filter: ModelSubscriptionChamaDepositSyncFilterInput
    $owner: String
  ) {
    onCreateChamaDepositSync(filter: $filter, owner: $owner) {
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
export const onUpdateChamaDepositSync = /* GraphQL */ `
  subscription OnUpdateChamaDepositSync(
    $filter: ModelSubscriptionChamaDepositSyncFilterInput
    $owner: String
  ) {
    onUpdateChamaDepositSync(filter: $filter, owner: $owner) {
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
export const onDeleteChamaDepositSync = /* GraphQL */ `
  subscription OnDeleteChamaDepositSync(
    $filter: ModelSubscriptionChamaDepositSyncFilterInput
    $owner: String
  ) {
    onDeleteChamaDepositSync(filter: $filter, owner: $owner) {
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
export const onCreateChamaWithdrawalSync = /* GraphQL */ `
  subscription OnCreateChamaWithdrawalSync(
    $filter: ModelSubscriptionChamaWithdrawalSyncFilterInput
    $owner: String
  ) {
    onCreateChamaWithdrawalSync(filter: $filter, owner: $owner) {
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
export const onUpdateChamaWithdrawalSync = /* GraphQL */ `
  subscription OnUpdateChamaWithdrawalSync(
    $filter: ModelSubscriptionChamaWithdrawalSyncFilterInput
    $owner: String
  ) {
    onUpdateChamaWithdrawalSync(filter: $filter, owner: $owner) {
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
export const onDeleteChamaWithdrawalSync = /* GraphQL */ `
  subscription OnDeleteChamaWithdrawalSync(
    $filter: ModelSubscriptionChamaWithdrawalSyncFilterInput
    $owner: String
  ) {
    onDeleteChamaWithdrawalSync(filter: $filter, owner: $owner) {
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
export const onCreateChamaLoanRpymntSync = /* GraphQL */ `
  subscription OnCreateChamaLoanRpymntSync(
    $filter: ModelSubscriptionChamaLoanRpymntSyncFilterInput
    $owner: String
  ) {
    onCreateChamaLoanRpymntSync(filter: $filter, owner: $owner) {
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
export const onUpdateChamaLoanRpymntSync = /* GraphQL */ `
  subscription OnUpdateChamaLoanRpymntSync(
    $filter: ModelSubscriptionChamaLoanRpymntSyncFilterInput
    $owner: String
  ) {
    onUpdateChamaLoanRpymntSync(filter: $filter, owner: $owner) {
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
export const onDeleteChamaLoanRpymntSync = /* GraphQL */ `
  subscription OnDeleteChamaLoanRpymntSync(
    $filter: ModelSubscriptionChamaLoanRpymntSyncFilterInput
    $owner: String
  ) {
    onDeleteChamaLoanRpymntSync(filter: $filter, owner: $owner) {
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
export const onCreateAdvocate = /* GraphQL */ `
  subscription OnCreateAdvocate(
    $filter: ModelSubscriptionAdvocateFilterInput
    $owner: String
  ) {
    onCreateAdvocate(filter: $filter, owner: $owner) {
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
export const onUpdateAdvocate = /* GraphQL */ `
  subscription OnUpdateAdvocate(
    $filter: ModelSubscriptionAdvocateFilterInput
    $owner: String
  ) {
    onUpdateAdvocate(filter: $filter, owner: $owner) {
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
export const onDeleteAdvocate = /* GraphQL */ `
  subscription OnDeleteAdvocate(
    $filter: ModelSubscriptionAdvocateFilterInput
    $owner: String
  ) {
    onDeleteAdvocate(filter: $filter, owner: $owner) {
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
export const onCreateAdvocateWithdrawals = /* GraphQL */ `
  subscription OnCreateAdvocateWithdrawals(
    $filter: ModelSubscriptionAdvocateWithdrawalsFilterInput
    $owner: String
  ) {
    onCreateAdvocateWithdrawals(filter: $filter, owner: $owner) {
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
export const onUpdateAdvocateWithdrawals = /* GraphQL */ `
  subscription OnUpdateAdvocateWithdrawals(
    $filter: ModelSubscriptionAdvocateWithdrawalsFilterInput
    $owner: String
  ) {
    onUpdateAdvocateWithdrawals(filter: $filter, owner: $owner) {
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
export const onDeleteAdvocateWithdrawals = /* GraphQL */ `
  subscription OnDeleteAdvocateWithdrawals(
    $filter: ModelSubscriptionAdvocateWithdrawalsFilterInput
    $owner: String
  ) {
    onDeleteAdvocateWithdrawals(filter: $filter, owner: $owner) {
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
export const onCreateMFBankWithdrawals = /* GraphQL */ `
  subscription OnCreateMFBankWithdrawals(
    $filter: ModelSubscriptionMFBankWithdrawalsFilterInput
    $owner: String
  ) {
    onCreateMFBankWithdrawals(filter: $filter, owner: $owner) {
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
export const onUpdateMFBankWithdrawals = /* GraphQL */ `
  subscription OnUpdateMFBankWithdrawals(
    $filter: ModelSubscriptionMFBankWithdrawalsFilterInput
    $owner: String
  ) {
    onUpdateMFBankWithdrawals(filter: $filter, owner: $owner) {
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
export const onDeleteMFBankWithdrawals = /* GraphQL */ `
  subscription OnDeleteMFBankWithdrawals(
    $filter: ModelSubscriptionMFBankWithdrawalsFilterInput
    $owner: String
  ) {
    onDeleteMFBankWithdrawals(filter: $filter, owner: $owner) {
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
export const onCreateCompany = /* GraphQL */ `
  subscription OnCreateCompany(
    $filter: ModelSubscriptionCompanyFilterInput
    $owner: String
  ) {
    onCreateCompany(filter: $filter, owner: $owner) {
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
export const onUpdateCompany = /* GraphQL */ `
  subscription OnUpdateCompany(
    $filter: ModelSubscriptionCompanyFilterInput
    $owner: String
  ) {
    onUpdateCompany(filter: $filter, owner: $owner) {
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
export const onDeleteCompany = /* GraphQL */ `
  subscription OnDeleteCompany(
    $filter: ModelSubscriptionCompanyFilterInput
    $owner: String
  ) {
    onDeleteCompany(filter: $filter, owner: $owner) {
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
export const onCreateCompanyUrls = /* GraphQL */ `
  subscription OnCreateCompanyUrls(
    $filter: ModelSubscriptionCompanyUrlsFilterInput
    $owner: String
  ) {
    onCreateCompanyUrls(filter: $filter, owner: $owner) {
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
export const onUpdateCompanyUrls = /* GraphQL */ `
  subscription OnUpdateCompanyUrls(
    $filter: ModelSubscriptionCompanyUrlsFilterInput
    $owner: String
  ) {
    onUpdateCompanyUrls(filter: $filter, owner: $owner) {
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
export const onDeleteCompanyUrls = /* GraphQL */ `
  subscription OnDeleteCompanyUrls(
    $filter: ModelSubscriptionCompanyUrlsFilterInput
    $owner: String
  ) {
    onDeleteCompanyUrls(filter: $filter, owner: $owner) {
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
export const onCreateGroup = /* GraphQL */ `
  subscription OnCreateGroup(
    $filter: ModelSubscriptionGroupFilterInput
    $owner: String
  ) {
    onCreateGroup(filter: $filter, owner: $owner) {
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
export const onUpdateGroup = /* GraphQL */ `
  subscription OnUpdateGroup(
    $filter: ModelSubscriptionGroupFilterInput
    $owner: String
  ) {
    onUpdateGroup(filter: $filter, owner: $owner) {
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
export const onDeleteGroup = /* GraphQL */ `
  subscription OnDeleteGroup(
    $filter: ModelSubscriptionGroupFilterInput
    $owner: String
  ) {
    onDeleteGroup(filter: $filter, owner: $owner) {
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
export const onCreateChamaMembers = /* GraphQL */ `
  subscription OnCreateChamaMembers(
    $filter: ModelSubscriptionChamaMembersFilterInput
    $owner: String
  ) {
    onCreateChamaMembers(filter: $filter, owner: $owner) {
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
export const onUpdateChamaMembers = /* GraphQL */ `
  subscription OnUpdateChamaMembers(
    $filter: ModelSubscriptionChamaMembersFilterInput
    $owner: String
  ) {
    onUpdateChamaMembers(filter: $filter, owner: $owner) {
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
export const onDeleteChamaMembers = /* GraphQL */ `
  subscription OnDeleteChamaMembers(
    $filter: ModelSubscriptionChamaMembersFilterInput
    $owner: String
  ) {
    onDeleteChamaMembers(filter: $filter, owner: $owner) {
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
export const onCreateChamasNPwnBrkrs = /* GraphQL */ `
  subscription OnCreateChamasNPwnBrkrs(
    $filter: ModelSubscriptionChamasNPwnBrkrsFilterInput
  ) {
    onCreateChamasNPwnBrkrs(filter: $filter) {
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
export const onUpdateChamasNPwnBrkrs = /* GraphQL */ `
  subscription OnUpdateChamasNPwnBrkrs(
    $filter: ModelSubscriptionChamasNPwnBrkrsFilterInput
  ) {
    onUpdateChamasNPwnBrkrs(filter: $filter) {
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
export const onDeleteChamasNPwnBrkrs = /* GraphQL */ `
  subscription OnDeleteChamasNPwnBrkrs(
    $filter: ModelSubscriptionChamasNPwnBrkrsFilterInput
  ) {
    onDeleteChamasNPwnBrkrs(filter: $filter) {
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
export const onCreateGroupNonLoans = /* GraphQL */ `
  subscription OnCreateGroupNonLoans(
    $filter: ModelSubscriptionGroupNonLoansFilterInput
    $owner: String
  ) {
    onCreateGroupNonLoans(filter: $filter, owner: $owner) {
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
export const onUpdateGroupNonLoans = /* GraphQL */ `
  subscription OnUpdateGroupNonLoans(
    $filter: ModelSubscriptionGroupNonLoansFilterInput
    $owner: String
  ) {
    onUpdateGroupNonLoans(filter: $filter, owner: $owner) {
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
export const onDeleteGroupNonLoans = /* GraphQL */ `
  subscription OnDeleteGroupNonLoans(
    $filter: ModelSubscriptionGroupNonLoansFilterInput
    $owner: String
  ) {
    onDeleteGroupNonLoans(filter: $filter, owner: $owner) {
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
export const onCreateGrpMembersContribution = /* GraphQL */ `
  subscription OnCreateGrpMembersContribution(
    $filter: ModelSubscriptionGrpMembersContributionFilterInput
    $owner: String
  ) {
    onCreateGrpMembersContribution(filter: $filter, owner: $owner) {
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
export const onUpdateGrpMembersContribution = /* GraphQL */ `
  subscription OnUpdateGrpMembersContribution(
    $filter: ModelSubscriptionGrpMembersContributionFilterInput
    $owner: String
  ) {
    onUpdateGrpMembersContribution(filter: $filter, owner: $owner) {
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
export const onDeleteGrpMembersContribution = /* GraphQL */ `
  subscription OnDeleteGrpMembersContribution(
    $filter: ModelSubscriptionGrpMembersContributionFilterInput
    $owner: String
  ) {
    onDeleteGrpMembersContribution(filter: $filter, owner: $owner) {
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
export const onCreateReqLoan = /* GraphQL */ `
  subscription OnCreateReqLoan(
    $filter: ModelSubscriptionReqLoanFilterInput
    $owner: String
  ) {
    onCreateReqLoan(filter: $filter, owner: $owner) {
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
export const onUpdateReqLoan = /* GraphQL */ `
  subscription OnUpdateReqLoan(
    $filter: ModelSubscriptionReqLoanFilterInput
    $owner: String
  ) {
    onUpdateReqLoan(filter: $filter, owner: $owner) {
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
export const onDeleteReqLoan = /* GraphQL */ `
  subscription OnDeleteReqLoan(
    $filter: ModelSubscriptionReqLoanFilterInput
    $owner: String
  ) {
    onDeleteReqLoan(filter: $filter, owner: $owner) {
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
export const onCreateReqLoanChama = /* GraphQL */ `
  subscription OnCreateReqLoanChama(
    $filter: ModelSubscriptionReqLoanChamaFilterInput
    $owner: String
  ) {
    onCreateReqLoanChama(filter: $filter, owner: $owner) {
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
export const onUpdateReqLoanChama = /* GraphQL */ `
  subscription OnUpdateReqLoanChama(
    $filter: ModelSubscriptionReqLoanChamaFilterInput
    $owner: String
  ) {
    onUpdateReqLoanChama(filter: $filter, owner: $owner) {
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
export const onDeleteReqLoanChama = /* GraphQL */ `
  subscription OnDeleteReqLoanChama(
    $filter: ModelSubscriptionReqLoanChamaFilterInput
    $owner: String
  ) {
    onDeleteReqLoanChama(filter: $filter, owner: $owner) {
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
export const onCreateReqLoanCredSl = /* GraphQL */ `
  subscription OnCreateReqLoanCredSl(
    $filter: ModelSubscriptionReqLoanCredSlFilterInput
    $owner: String
  ) {
    onCreateReqLoanCredSl(filter: $filter, owner: $owner) {
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
export const onUpdateReqLoanCredSl = /* GraphQL */ `
  subscription OnUpdateReqLoanCredSl(
    $filter: ModelSubscriptionReqLoanCredSlFilterInput
    $owner: String
  ) {
    onUpdateReqLoanCredSl(filter: $filter, owner: $owner) {
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
export const onDeleteReqLoanCredSl = /* GraphQL */ `
  subscription OnDeleteReqLoanCredSl(
    $filter: ModelSubscriptionReqLoanCredSlFilterInput
    $owner: String
  ) {
    onDeleteReqLoanCredSl(filter: $filter, owner: $owner) {
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
export const onCreateExRates = /* GraphQL */ `
  subscription OnCreateExRates(
    $filter: ModelSubscriptionExRatesFilterInput
    $owner: String
  ) {
    onCreateExRates(filter: $filter, owner: $owner) {
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
export const onUpdateExRates = /* GraphQL */ `
  subscription OnUpdateExRates(
    $filter: ModelSubscriptionExRatesFilterInput
    $owner: String
  ) {
    onUpdateExRates(filter: $filter, owner: $owner) {
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
export const onDeleteExRates = /* GraphQL */ `
  subscription OnDeleteExRates(
    $filter: ModelSubscriptionExRatesFilterInput
    $owner: String
  ) {
    onDeleteExRates(filter: $filter, owner: $owner) {
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
export const onCreateMFKOfferz = /* GraphQL */ `
  subscription OnCreateMFKOfferz(
    $filter: ModelSubscriptionMFKOfferzFilterInput
    $owner: String
  ) {
    onCreateMFKOfferz(filter: $filter, owner: $owner) {
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
export const onUpdateMFKOfferz = /* GraphQL */ `
  subscription OnUpdateMFKOfferz(
    $filter: ModelSubscriptionMFKOfferzFilterInput
    $owner: String
  ) {
    onUpdateMFKOfferz(filter: $filter, owner: $owner) {
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
export const onDeleteMFKOfferz = /* GraphQL */ `
  subscription OnDeleteMFKOfferz(
    $filter: ModelSubscriptionMFKOfferzFilterInput
    $owner: String
  ) {
    onDeleteMFKOfferz(filter: $filter, owner: $owner) {
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
export const onCreateMFKOfferz2 = /* GraphQL */ `
  subscription OnCreateMFKOfferz2(
    $filter: ModelSubscriptionMFKOfferz2FilterInput
    $owner: String
  ) {
    onCreateMFKOfferz2(filter: $filter, owner: $owner) {
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
export const onUpdateMFKOfferz2 = /* GraphQL */ `
  subscription OnUpdateMFKOfferz2(
    $filter: ModelSubscriptionMFKOfferz2FilterInput
    $owner: String
  ) {
    onUpdateMFKOfferz2(filter: $filter, owner: $owner) {
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
export const onDeleteMFKOfferz2 = /* GraphQL */ `
  subscription OnDeleteMFKOfferz2(
    $filter: ModelSubscriptionMFKOfferz2FilterInput
    $owner: String
  ) {
    onDeleteMFKOfferz2(filter: $filter, owner: $owner) {
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
export const onCreateChamaApply = /* GraphQL */ `
  subscription OnCreateChamaApply(
    $filter: ModelSubscriptionChamaApplyFilterInput
    $owner: String
  ) {
    onCreateChamaApply(filter: $filter, owner: $owner) {
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
export const onUpdateChamaApply = /* GraphQL */ `
  subscription OnUpdateChamaApply(
    $filter: ModelSubscriptionChamaApplyFilterInput
    $owner: String
  ) {
    onUpdateChamaApply(filter: $filter, owner: $owner) {
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
export const onDeleteChamaApply = /* GraphQL */ `
  subscription OnDeleteChamaApply(
    $filter: ModelSubscriptionChamaApplyFilterInput
    $owner: String
  ) {
    onDeleteChamaApply(filter: $filter, owner: $owner) {
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
export const onCreateChamaLnApproval = /* GraphQL */ `
  subscription OnCreateChamaLnApproval(
    $filter: ModelSubscriptionChamaLnApprovalFilterInput
    $owner: String
  ) {
    onCreateChamaLnApproval(filter: $filter, owner: $owner) {
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
export const onUpdateChamaLnApproval = /* GraphQL */ `
  subscription OnUpdateChamaLnApproval(
    $filter: ModelSubscriptionChamaLnApprovalFilterInput
    $owner: String
  ) {
    onUpdateChamaLnApproval(filter: $filter, owner: $owner) {
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
export const onDeleteChamaLnApproval = /* GraphQL */ `
  subscription OnDeleteChamaLnApproval(
    $filter: ModelSubscriptionChamaLnApprovalFilterInput
    $owner: String
  ) {
    onDeleteChamaLnApproval(filter: $filter, owner: $owner) {
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
export const onCreateChamaAdminLnApply = /* GraphQL */ `
  subscription OnCreateChamaAdminLnApply(
    $filter: ModelSubscriptionChamaAdminLnApplyFilterInput
    $owner: String
  ) {
    onCreateChamaAdminLnApply(filter: $filter, owner: $owner) {
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
export const onUpdateChamaAdminLnApply = /* GraphQL */ `
  subscription OnUpdateChamaAdminLnApply(
    $filter: ModelSubscriptionChamaAdminLnApplyFilterInput
    $owner: String
  ) {
    onUpdateChamaAdminLnApply(filter: $filter, owner: $owner) {
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
export const onDeleteChamaAdminLnApply = /* GraphQL */ `
  subscription OnDeleteChamaAdminLnApply(
    $filter: ModelSubscriptionChamaAdminLnApplyFilterInput
    $owner: String
  ) {
    onDeleteChamaAdminLnApply(filter: $filter, owner: $owner) {
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
export const onCreateChamaApply2 = /* GraphQL */ `
  subscription OnCreateChamaApply2(
    $filter: ModelSubscriptionChamaApply2FilterInput
    $owner: String
  ) {
    onCreateChamaApply2(filter: $filter, owner: $owner) {
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
export const onUpdateChamaApply2 = /* GraphQL */ `
  subscription OnUpdateChamaApply2(
    $filter: ModelSubscriptionChamaApply2FilterInput
    $owner: String
  ) {
    onUpdateChamaApply2(filter: $filter, owner: $owner) {
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
export const onDeleteChamaApply2 = /* GraphQL */ `
  subscription OnDeleteChamaApply2(
    $filter: ModelSubscriptionChamaApply2FilterInput
    $owner: String
  ) {
    onDeleteChamaApply2(filter: $filter, owner: $owner) {
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
export const onCreateAuditor = /* GraphQL */ `
  subscription OnCreateAuditor($filter: ModelSubscriptionAuditorFilterInput) {
    onCreateAuditor(filter: $filter) {
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
export const onUpdateAuditor = /* GraphQL */ `
  subscription OnUpdateAuditor($filter: ModelSubscriptionAuditorFilterInput) {
    onUpdateAuditor(filter: $filter) {
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
export const onDeleteAuditor = /* GraphQL */ `
  subscription OnDeleteAuditor($filter: ModelSubscriptionAuditorFilterInput) {
    onDeleteAuditor(filter: $filter) {
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
export const onCreateChamaControlTable = /* GraphQL */ `
  subscription OnCreateChamaControlTable(
    $filter: ModelSubscriptionChamaControlTableFilterInput
    $owner: String
  ) {
    onCreateChamaControlTable(filter: $filter, owner: $owner) {
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
export const onUpdateChamaControlTable = /* GraphQL */ `
  subscription OnUpdateChamaControlTable(
    $filter: ModelSubscriptionChamaControlTableFilterInput
    $owner: String
  ) {
    onUpdateChamaControlTable(filter: $filter, owner: $owner) {
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
export const onDeleteChamaControlTable = /* GraphQL */ `
  subscription OnDeleteChamaControlTable(
    $filter: ModelSubscriptionChamaControlTableFilterInput
    $owner: String
  ) {
    onDeleteChamaControlTable(filter: $filter, owner: $owner) {
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
export const onCreateRideRequest = /* GraphQL */ `
  subscription OnCreateRideRequest(
    $filter: ModelSubscriptionRideRequestFilterInput
    $owner: String
  ) {
    onCreateRideRequest(filter: $filter, owner: $owner) {
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
export const onUpdateRideRequest = /* GraphQL */ `
  subscription OnUpdateRideRequest(
    $filter: ModelSubscriptionRideRequestFilterInput
    $owner: String
  ) {
    onUpdateRideRequest(filter: $filter, owner: $owner) {
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
export const onDeleteRideRequest = /* GraphQL */ `
  subscription OnDeleteRideRequest(
    $filter: ModelSubscriptionRideRequestFilterInput
    $owner: String
  ) {
    onDeleteRideRequest(filter: $filter, owner: $owner) {
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
export const onCreatePayment = /* GraphQL */ `
  subscription OnCreatePayment(
    $filter: ModelSubscriptionPaymentFilterInput
    $owner: String
  ) {
    onCreatePayment(filter: $filter, owner: $owner) {
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
export const onUpdatePayment = /* GraphQL */ `
  subscription OnUpdatePayment(
    $filter: ModelSubscriptionPaymentFilterInput
    $owner: String
  ) {
    onUpdatePayment(filter: $filter, owner: $owner) {
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
export const onDeletePayment = /* GraphQL */ `
  subscription OnDeletePayment(
    $filter: ModelSubscriptionPaymentFilterInput
    $owner: String
  ) {
    onDeletePayment(filter: $filter, owner: $owner) {
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
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification(
    $filter: ModelSubscriptionNotificationFilterInput
    $owner: String
  ) {
    onCreateNotification(filter: $filter, owner: $owner) {
      awsemail
      firebaseKey
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification(
    $filter: ModelSubscriptionNotificationFilterInput
    $owner: String
  ) {
    onUpdateNotification(filter: $filter, owner: $owner) {
      awsemail
      firebaseKey
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification(
    $filter: ModelSubscriptionNotificationFilterInput
    $owner: String
  ) {
    onDeleteNotification(filter: $filter, owner: $owner) {
      awsemail
      firebaseKey
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateRiderLocationUpdate = /* GraphQL */ `
  subscription OnCreateRiderLocationUpdate(
    $filter: ModelSubscriptionRiderLocationUpdateFilterInput
  ) {
    onCreateRiderLocationUpdate(filter: $filter) {
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
export const onUpdateRiderLocationUpdate = /* GraphQL */ `
  subscription OnUpdateRiderLocationUpdate(
    $filter: ModelSubscriptionRiderLocationUpdateFilterInput
  ) {
    onUpdateRiderLocationUpdate(filter: $filter) {
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
export const onDeleteRiderLocationUpdate = /* GraphQL */ `
  subscription OnDeleteRiderLocationUpdate(
    $filter: ModelSubscriptionRiderLocationUpdateFilterInput
  ) {
    onDeleteRiderLocationUpdate(filter: $filter) {
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
export const onCreateMessages = /* GraphQL */ `
  subscription OnCreateMessages($filter: ModelSubscriptionMessagesFilterInput) {
    onCreateMessages(filter: $filter) {
      id
      senderEmail
      messageBody
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateMessages = /* GraphQL */ `
  subscription OnUpdateMessages($filter: ModelSubscriptionMessagesFilterInput) {
    onUpdateMessages(filter: $filter) {
      id
      senderEmail
      messageBody
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteMessages = /* GraphQL */ `
  subscription OnDeleteMessages($filter: ModelSubscriptionMessagesFilterInput) {
    onDeleteMessages(filter: $filter) {
      id
      senderEmail
      messageBody
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateAveragePrices = /* GraphQL */ `
  subscription OnCreateAveragePrices(
    $filter: ModelSubscriptionAveragePricesFilterInput
  ) {
    onCreateAveragePrices(filter: $filter) {
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
export const onUpdateAveragePrices = /* GraphQL */ `
  subscription OnUpdateAveragePrices(
    $filter: ModelSubscriptionAveragePricesFilterInput
  ) {
    onUpdateAveragePrices(filter: $filter) {
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
export const onDeleteAveragePrices = /* GraphQL */ `
  subscription OnDeleteAveragePrices(
    $filter: ModelSubscriptionAveragePricesFilterInput
  ) {
    onDeleteAveragePrices(filter: $filter) {
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
export const onCreateCombContractVoucher = /* GraphQL */ `
  subscription OnCreateCombContractVoucher(
    $filter: ModelSubscriptionCombContractVoucherFilterInput
    $owner: String
  ) {
    onCreateCombContractVoucher(filter: $filter, owner: $owner) {
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
export const onUpdateCombContractVoucher = /* GraphQL */ `
  subscription OnUpdateCombContractVoucher(
    $filter: ModelSubscriptionCombContractVoucherFilterInput
    $owner: String
  ) {
    onUpdateCombContractVoucher(filter: $filter, owner: $owner) {
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
export const onDeleteCombContractVoucher = /* GraphQL */ `
  subscription OnDeleteCombContractVoucher(
    $filter: ModelSubscriptionCombContractVoucherFilterInput
    $owner: String
  ) {
    onDeleteCombContractVoucher(filter: $filter, owner: $owner) {
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
export const onCreateCombContract = /* GraphQL */ `
  subscription OnCreateCombContract(
    $filter: ModelSubscriptionCombContractFilterInput
    $owner: String
  ) {
    onCreateCombContract(filter: $filter, owner: $owner) {
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
export const onUpdateCombContract = /* GraphQL */ `
  subscription OnUpdateCombContract(
    $filter: ModelSubscriptionCombContractFilterInput
    $owner: String
  ) {
    onUpdateCombContract(filter: $filter, owner: $owner) {
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
export const onDeleteCombContract = /* GraphQL */ `
  subscription OnDeleteCombContract(
    $filter: ModelSubscriptionCombContractFilterInput
    $owner: String
  ) {
    onDeleteCombContract(filter: $filter, owner: $owner) {
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
export const onCreateMarketConsumption = /* GraphQL */ `
  subscription OnCreateMarketConsumption(
    $filter: ModelSubscriptionMarketConsumptionFilterInput
  ) {
    onCreateMarketConsumption(filter: $filter) {
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
export const onUpdateMarketConsumption = /* GraphQL */ `
  subscription OnUpdateMarketConsumption(
    $filter: ModelSubscriptionMarketConsumptionFilterInput
  ) {
    onUpdateMarketConsumption(filter: $filter) {
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
export const onDeleteMarketConsumption = /* GraphQL */ `
  subscription OnDeleteMarketConsumption(
    $filter: ModelSubscriptionMarketConsumptionFilterInput
  ) {
    onDeleteMarketConsumption(filter: $filter) {
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
export const onCreateCombPersonel = /* GraphQL */ `
  subscription OnCreateCombPersonel(
    $filter: ModelSubscriptionCombPersonelFilterInput
    $owner: String
  ) {
    onCreateCombPersonel(filter: $filter, owner: $owner) {
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
export const onUpdateCombPersonel = /* GraphQL */ `
  subscription OnUpdateCombPersonel(
    $filter: ModelSubscriptionCombPersonelFilterInput
    $owner: String
  ) {
    onUpdateCombPersonel(filter: $filter, owner: $owner) {
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
export const onDeleteCombPersonel = /* GraphQL */ `
  subscription OnDeleteCombPersonel(
    $filter: ModelSubscriptionCombPersonelFilterInput
    $owner: String
  ) {
    onDeleteCombPersonel(filter: $filter, owner: $owner) {
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
export const onCreateChamaMinutes = /* GraphQL */ `
  subscription OnCreateChamaMinutes(
    $filter: ModelSubscriptionChamaMinutesFilterInput
  ) {
    onCreateChamaMinutes(filter: $filter) {
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
export const onUpdateChamaMinutes = /* GraphQL */ `
  subscription OnUpdateChamaMinutes(
    $filter: ModelSubscriptionChamaMinutesFilterInput
  ) {
    onUpdateChamaMinutes(filter: $filter) {
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
export const onDeleteChamaMinutes = /* GraphQL */ `
  subscription OnDeleteChamaMinutes(
    $filter: ModelSubscriptionChamaMinutesFilterInput
  ) {
    onDeleteChamaMinutes(filter: $filter) {
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
export const onCreateChamaMinutesItem = /* GraphQL */ `
  subscription OnCreateChamaMinutesItem(
    $filter: ModelSubscriptionChamaMinutesItemFilterInput
  ) {
    onCreateChamaMinutesItem(filter: $filter) {
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
export const onUpdateChamaMinutesItem = /* GraphQL */ `
  subscription OnUpdateChamaMinutesItem(
    $filter: ModelSubscriptionChamaMinutesItemFilterInput
  ) {
    onUpdateChamaMinutesItem(filter: $filter) {
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
export const onDeleteChamaMinutesItem = /* GraphQL */ `
  subscription OnDeleteChamaMinutesItem(
    $filter: ModelSubscriptionChamaMinutesItemFilterInput
  ) {
    onDeleteChamaMinutesItem(filter: $filter) {
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
export const onCreateChamaMeetingAttendance = /* GraphQL */ `
  subscription OnCreateChamaMeetingAttendance(
    $filter: ModelSubscriptionChamaMeetingAttendanceFilterInput
  ) {
    onCreateChamaMeetingAttendance(filter: $filter) {
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
export const onUpdateChamaMeetingAttendance = /* GraphQL */ `
  subscription OnUpdateChamaMeetingAttendance(
    $filter: ModelSubscriptionChamaMeetingAttendanceFilterInput
  ) {
    onUpdateChamaMeetingAttendance(filter: $filter) {
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
export const onDeleteChamaMeetingAttendance = /* GraphQL */ `
  subscription OnDeleteChamaMeetingAttendance(
    $filter: ModelSubscriptionChamaMeetingAttendanceFilterInput
  ) {
    onDeleteChamaMeetingAttendance(filter: $filter) {
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
