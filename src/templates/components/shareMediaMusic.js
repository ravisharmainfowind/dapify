import React, { useState, useEffect } from 'react'
import { Modal } from "react-bootstrap";
import { Button } from '@material-ui/core'
import {
  EmailShareButton,
  
  FacebookShareButton,

  WhatsappShareButton,
  FacebookIcon,
  EmailIcon,
  WhatsappIcon,
  FacebookShareCount,
} from "react-share";


import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
//import { Success } from './../../../utils/errors';
import 'antd/dist/antd.css'
import EncryptProfileUrl from './encryptProfileUrl';
import EncryptShareUrl from './encryptShareUrl';

function ShareMediaMusic(props, { history }) {
 
  const [FBshareUrl, setFBShareUrl] = useState('');
  const [EmailshareUrl, setEmailShareUrl] = useState('');
  const [WhatsappshareUrl, setWhatsappShareUrl] = useState('');
  //const [shareUrl, setShareUrl] = useState('');
console.log('shrare all propsss',props);


  useEffect(() => {

    
      if (props.url_id) {
        var pathurl = 'app.dapify.io';// window.location.origin;
        var url_val = EncryptProfileUrl(props.url_id);
        var fb_shareType = EncryptShareUrl('Facebook');
        var watsapp_shareType = EncryptShareUrl('Watsapp');
        var email_shareType = EncryptShareUrl('Email');

        var mediaId = EncryptShareUrl(props.media_id);
      
        var fburl = pathurl +(url_val) +'/'+fb_shareType+'/'+mediaId;
        var watsappurl = pathurl +(url_val) +'/'+watsapp_shareType+'/'+mediaId;
        var emailurl = pathurl +(url_val) +'/'+email_shareType+'/'+mediaId; 
        setWhatsappShareUrl(watsappurl);
        console.log('wp',watsappurl);
        setFBShareUrl(fburl);
        setEmailShareUrl(emailurl);
      }
    
   
  },[props.url_id,props.media_id]);

console.log('currenturl',window.location.origin);
  return (

    <Modal
      onHide={props.close}
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Share with</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EmailShareButton
          url={EmailshareUrl}  
         >
          <EmailIcon size={40} round />
        </EmailShareButton>
       
        &nbsp;

           <FacebookShareButton  url={FBshareUrl} >
          <FacebookIcon size={40} round />
        
        
        </FacebookShareButton> 
        <FacebookShareCount url={FBshareUrl}/>
         
 
              
        &nbsp;
       
        <WhatsappShareButton url={WhatsappshareUrl}>
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>
        &nbsp;
       
      </Modal.Body>
      <Modal.Footer>
        <Button className="can-btn btn" onClick={props.close}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ShareMediaMusic;


