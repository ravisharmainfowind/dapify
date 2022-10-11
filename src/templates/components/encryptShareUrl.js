import React from "react";


function EncryptShareUrl(data){
    
    if(data !== ''){
        
       // const path = window.location.origin;
        const data_enc = Buffer.from(data).toString('base64');
        const enc_res =  data_enc;
        return enc_res;
    }
   
  };

export default EncryptShareUrl;