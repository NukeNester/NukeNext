import React from 'react';
import myImage from 'NukeNestLogo.png';


function Logo({ width, height }) {
    return (
      <div>
        <img src="./" alt="Nuke Nester Logo" style={{ width: width, height: height }} />
      </div>
    );
  }
  


export default Logo;

