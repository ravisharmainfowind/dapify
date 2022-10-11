import React from "react";


function NumberToAbbreviate(follower_number){
    
    var number = follower_number;
  
    var s = ["", "k", "m", "b", "t"];
  
    // dividing the value by 3.
    var sNum = Math.floor(("" + number).length / 3);

    // calculating the precised value.
    var sVal = parseFloat((
      sNum !== 0 ? (number / Math.pow(1000, sNum)) : number).toPrecision(2));
    
    if (sVal % 1 !== 0) {
        sVal = sVal.toFixed(1);
    }

    // appending the letter to precised val.
    return sVal + s[sNum];
  };

export default NumberToAbbreviate;
