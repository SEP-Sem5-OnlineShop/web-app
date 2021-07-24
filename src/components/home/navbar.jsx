import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import card from '../../assets/svg/popup/credit-card.svg'

function Navbar() {
    const [click, setClick] = useState(false);
    const closeMobileMenu=()=> setClick(false);

    return (
        <body class="grid justify-items-end space-y-12 ">
            <div className="bg-primary w-1/4 md:w-1/4 flex justify-center">
                <div className="navbar-container">
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='bg-white w-1/4 md:w-full flex'>
                            
                            <Link to='/' className='' onClick={closeMobileMenu}>
                                <div class="flex justify-between">
                                <img width={32} src={card} alt="card" />
                                <h1>notification</h1>
                                </div>
                                
                            </Link>
                        </li><br></br>

                        <li className='nav-item'>
                            <Link to='/services' className='nav-links' onClick={closeMobileMenu}>
                                Order history
                            </Link>
                        </li>
                        <br></br>

                        <li className='nav-item'>
                            <Link to='/products' className='nav-links' onClick={closeMobileMenu}>
                                Night Mode
                            </Link>
                        </li>

                        

                    </ul>
                </div>
            </div>
        </body>
    )
}

export default Navbar
