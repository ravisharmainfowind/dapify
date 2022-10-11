import React from 'react'
import { Modal } from "react-bootstrap";

function PaidContent(props, { history }) {
  return (
    
      <Modal
        onHide={props.close}
        show={props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className='revnue-popup'
      >
        <Modal.Body>
          <div className='revnue-popup-inn'>
            <h5>How do I get paid?</h5>
            <p>Your billing profile allows you to get paid every month through our stripe system or request a payout for your current balance.</p>
            <p>This payment is EXTERNAL to the app and requires you to have your billing profile complete on stripe.</p>
            <p>ALL PAYOUTS ARE HANDLED BY OUR PARTNERSHIP WITH STRIPE TO HELP US KEEP TIGHT RECORDS AND YOUR MONEY SAFE!</p> 
            <p>If you have any questions:</p> 
            <p>Support@Dapify.co</p> 
          </div> 
        </Modal.Body>
      </Modal>
    
  )
}

export default PaidContent;