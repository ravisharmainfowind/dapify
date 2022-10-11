require('dotenv').config();
const stripe = require('stripe')(process.env.PAYMENT_SECRET_KEY)

async function postCharge(req, res) {
  console.log('datataaa',req.body);
  try {
    console.log('request',req.body);
    const { amount, source, receipt_email } = req.body

    const charge = await stripe.charges.create({
      amount,
      currency: 'USD',
      source,
      receipt_email
    })
    console.log("charge",charge)
    if (!charge) throw new Error('charge unsuccessful')
    
    res.status(200).json({
      charge,
      message: 'charge posted successfully'
    })
  } catch (error) {
    console.log('chargeerror',error)
    res.status(500).json({
      message: error.message
    })
  }
}

async function CreateAccount(req, res) {
  console.log('datataaareeeee');
  try {
    
    console.log('request',req.body);
    const { email } = req.body
    const account = await stripe.accounts.create({
      type: 'express',
      country: 'US',
      email: email,
      capabilities: {
        card_payments: {requested: true},
        transfers: {requested: true},
      },
    });
    
    console.log("account",account)
    res.status(200).json({
      account,
      message: 'successfully created'
    })
   
  } catch (error) {
    console.log('chargeerror',error)
    res.status(500).json({
      message: error.message
    })
  }
}

async function AccountLink(req, res) {
  console.log('datataaareeeee');
  try {
    console.log('request',req.body);
    const { account, refresh_url, return_url } = req.body
    const accountLink = await stripe.accountLinks.create({
      account: account,
      refresh_url: refresh_url,
      return_url: return_url,
      type: 'account_onboarding',
    });
   
    res.status(200).json({
      accountLink,
      message: 'successfully created'
    })
    console.log("accountLink",accountLink)
   
  } catch (error) {
    console.log('chargeerror',error)
    res.status(500).json({
      message: error.message
    })
  }
}


async function UserAccountDetails(req, res) {
  console.log('datataaareeeee');
  try {
    console.log('request',req.body);
    const { accountId } = req.body


    const accountData = await stripe.accounts.retrieve(
      accountId
    );
 
    res.status(200).json({
      accountData,
      message: 'successfully retrive'
    })
    console.log("accountData",accountData);
   
   
  } catch (error) {
    console.log('chargeerror',error)
    res.status(500).json({
      message: error.message
    })
  }
}


async function UserAccountLoginLink(req, res) {
  
  try {
    console.log('request',req.body);
    const { accountId } = req.body

    const loginLink = await stripe.accounts.createLoginLink(
      accountId
    );
    
    res.status(200).json({
      loginLink,
      message: 'successfully retrive'
    })
    console.log("loginLink",loginLink)
   
  } catch (error) {
    console.log('chargeerror',error)
    res.status(500).json({
      message: error.message
    })
  }
}


async function RequestUserPayout(req, res) {
  
  try {
    console.log('request',req.body);
    const { accountId,amount,currency,transfer_group } = req.body

    const transfer = await stripe.transfers.create({
      amount: amount,
      currency: currency,
      destination: accountId,
      transfer_group: transfer_group,
    });
    
    res.status(200).json({
      transfer,
      message: 'Successfully Payout'
    })
    console.log("transfer",transfer)
   
  } catch (error) {
    console.log('chargeerror',error)
    res.status(500).json({
      message: error.message
    })
  }
}


module.exports = {postCharge,CreateAccount,AccountLink,UserAccountDetails,UserAccountLoginLink,RequestUserPayout}

//module.exports = postCharge