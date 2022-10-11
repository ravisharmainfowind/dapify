/* eslint-disable react/prefer-stateless-function */
/* eslint-disable import/no-unresolved, import/extensions, import/no-extraneous-dependencies */
import React, { Component } from 'react';
import { Modal } from "react-bootstrap";

import {
  FacebookShareCount, 
  FacebookShareButton,

  
  FacebookIcon,
 
} from 'react-share';



class ShareMediaMusic extends Component {
  render() {
    const shareUrl = 'http://github.com';
    const title = 'GitHub';

    return (
    <div>
      <FacebookShareButton
            url={shareUrl}
            quote={title}
           
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>

         
            <FacebookShareCount url={shareUrl} >
              {count => count}
            </FacebookShareCount>
      </div>


  
    );
  }
}

export default ShareMediaMusic;
