import React from 'react';
import logoHorizontal from '../assets/logos/logo-horizontal.svg';
import logoIcon from '../assets/logos/logo-icon.svg';
import logoAvocat from '../assets/logos/logo-avocat.svg';
import logoFullName from '../assets/logos/Guillaume Elhaik.svg';

interface LogoProps {
  className?: string;
}

export const LogoHorizontal: React.FC<LogoProps> = ({ className }) => (
  <div 
    className={`aspect-[154/44] ${className || ''}`} 
    style={{ 
      maskImage: `url(${logoHorizontal})`, 
      WebkitMaskImage: `url(${logoHorizontal})`,
      maskSize: 'contain',
      WebkitMaskSize: 'contain',
      maskRepeat: 'no-repeat',
      WebkitMaskRepeat: 'no-repeat',
      maskPosition: 'center',
      WebkitMaskPosition: 'center',
      backgroundColor: 'currentColor'
    }} 
  />
);

export const LogoIcon: React.FC<LogoProps> = ({ className }) => (
  <div 
    className={`aspect-[55/80] ${className || ''}`} 
    style={{ 
      maskImage: `url(${logoIcon})`, 
      WebkitMaskImage: `url(${logoIcon})`,
      maskSize: 'contain',
      WebkitMaskSize: 'contain',
      maskRepeat: 'no-repeat',
      WebkitMaskRepeat: 'no-repeat',
      maskPosition: 'center',
      WebkitMaskPosition: 'center',
      backgroundColor: 'currentColor'
    }} 
  />
);

export const LogoAvocat: React.FC<LogoProps> = ({ className }) => (
  <div 
    className={`aspect-[229/99] ${className || ''}`} 
    style={{ 
      maskImage: `url(${logoAvocat})`, 
      WebkitMaskImage: `url(${logoAvocat})`,
      maskSize: 'contain',
      WebkitMaskSize: 'contain',
      maskRepeat: 'no-repeat',
      WebkitMaskRepeat: 'no-repeat',
      maskPosition: 'center',
      WebkitMaskPosition: 'center',
      backgroundColor: 'currentColor'
    }} 
  />
);

export const LogoBlason: React.FC<LogoProps> = ({ className }) => (
  <LogoIcon className={className} />
);

export const LogoFullName: React.FC<LogoProps> = ({ className }) => (
  <div 
    className={`${className || ''}`} 
    style={{ 
      aspectRatio: '156.48 / 55',
      maskImage: `url("${logoFullName}")`, 
      WebkitMaskImage: `url("${logoFullName}")`,
      maskSize: 'contain',
      WebkitMaskSize: 'contain',
      maskRepeat: 'no-repeat',
      WebkitMaskRepeat: 'no-repeat',
      maskPosition: 'center',
      WebkitMaskPosition: 'center',
      backgroundColor: 'currentColor'
    }} 
  />
);
