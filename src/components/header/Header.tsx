import React from 'react'
import { Icon} from '@iconify/react';
import mixcloudIcon from '@iconify/icons-cib/mixcloud';
import facebookIcon from '@iconify/icons-cib/facebook';
import vkIcon from '@iconify/icons-cib/vk';
import mailRu from '@iconify/icons-cib/mail-ru';
import instagramIcon from '@iconify/icons-cib/instagram';
import telegramIcon from '@iconify/icons-cib/telegram';
import googlePlay from '@iconify/icons-cib/google-play';
import bxSearch from '@iconify/icons-bx/bx-search';

import './Header.css'



function Header() {
    return (
      <div className='.header flex-container'>
        <p className="logo-text flex-item:nth-child(1)">RADIO PLATO</p>
        <div className='social-icons flex-item:nth-child(2)'>
            <a target="_blank" href="https://www.mixcloud.com/radioplato/" rel="noopener noreferrer"><Icon className='social-icon' icon={mixcloudIcon} width='2em' color='white'/></a>
            <a target="_blank" href="https://www.facebook.com/radioplato.by/" rel="noopener noreferrer"><Icon className='social-icon' icon={facebookIcon} width='1.8em' color='white'/></a>
            <a target="_blank" href="https://vk.com/radioplato" rel="noopener noreferrer"> <Icon className='social-icon' icon={vkIcon} width='1.8em' color='white'/></a>
            <a target="_blank" href="mailto:hey@radioplato.by" rel="noopener noreferrer"> <Icon className='social-icon' icon={mailRu} width='1.8em' color='white'/></a>
            <a target="_blank" href="https://www.instagram.com/radio_plato/" rel="noopener noreferrer"> <Icon className='social-icon' icon={instagramIcon} width='1.8em' color='white'/></a>
            <a target="_blank" href="https://t.me/radioplato" rel="noopener noreferrer"> <Icon className='social-icon' icon={telegramIcon} width='1.8em' color='white'/></a>
            <a target="_blank" href="https://play.google.com/store/apps/details?id=com.radioplato" rel="noopener noreferrer"> <Icon className='social-icon' icon={googlePlay} width='1.8em' color='white'/></a>
        </div>
        <p className="donate flex-item:nth-child(3)">DONATE</p>
        <div className='search-icon flex-item:nth-child(4)'>
            <Icon icon={bxSearch} width='1.8em' color='white'/>
            </div>
      </div>
    )
  }
  
  export default Header