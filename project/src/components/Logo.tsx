import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'white' | 'dark';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  variant = 'default', 
  showText = true 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl'
  };

  const colorClasses = {
    default: 'text-[#002868]',
    white: 'text-white',
    dark: 'text-gray-900'
  };

  const returnColorClasses = {
    default: 'text-sky-400',
    white: 'text-sky-300',
    dark: 'text-sky-500'
  };

  return (
    <div className="flex items-center space-x-3">
      {/* RR Logo Image */}
      <div className={`${sizeClasses[size]} flex items-center justify-center bg-white rounded-lg p-1 shadow-sm`}>
        <img 
          src="/rr-logo-new.png" 
          alt="Rate & Return Logo"
          className={`${sizeClasses[size]} object-contain`}
        />
      </div>
      
      {/* Company Name */}
      {showText && (
        <div className="flex flex-col">
          <div className={`${textSizeClasses[size]} font-bold ${colorClasses[variant]} leading-tight flex items-baseline`}>
            <span>Rate &</span>
            <span className={`ml-2 ${returnColorClasses[variant]} font-extrabold italic transform -skew-x-12 bg-gradient-to-r ${variant === 'white' ? 'from-sky-300 to-sky-200' : 'from-sky-400 to-sky-500'} bg-clip-text text-transparent drop-shadow-sm`}>
              Return
            </span>
          </div>
          {size === 'lg' || size === 'xl' ? (
            <span className={`text-sm ${variant === 'white' ? 'text-blue-100' : 'text-gray-600'} font-medium`}>
              Bond Investment Specialists
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Logo;