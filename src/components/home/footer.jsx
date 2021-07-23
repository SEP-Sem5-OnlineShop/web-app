import React from 'react';
import facebookLogo from '../../assets/svg/icons/facebook.svg'
import googleLogo from '../../assets/svg/icons/google.svg'


function Footer() {
  return (
      <body class='fixed inset-x-0 bottom-0'>
    <div className='flex justify-between bg-primary h-24 bg-food-style md:bg-food-style'>
        <div class=''>
          <p className='footer-subscription-text'>
          support
        </p>
            <h2>About Us</h2>
            <h2>Contact Us</h2>
        </div>


        <div className='footer-link-wrapper'>
          <div class='flex justify-center'>
            <h2>Social Media</h2>
            </div>
            <div className="flex justify-center">
                            <button className="rounded-xl w-16 h-16 flex justify-center items-center p-1 bg-white">
                                <img width={32} src={googleLogo} alt="google-logo" />
                            </button>
                            <button className="rounded-xl w-16 h-16 ml-5 flex justify-center items-center p-1 bg-white">
                                <img width={14} src={facebookLogo} alt="google-logo" />
                            </button>
                            
                        </div>
        </div>
        {/* <img width={154} src={food} alt="google-logo" /> */}
      </div>
      </body>
      

  );
}

export default Footer;
