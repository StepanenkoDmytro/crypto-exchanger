import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {availableLanguages} from '../i18n';
import './LanguageSwitcher.css';

const LanguageSwitcher: React.FC = () => {
const [isDropdownExpanded, setIsDropdownExpanded] = useState<boolean>(false);

  const { i18n } = useTranslation();
  const currentLanguage = i18n.resolvedLanguage;

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsDropdownExpanded(false);
  };

  const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(isDropdownExpanded) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isDropdownExpanded]);

    const handleClickOutside = (event: any) => {
        if (
            headerRef.current &&
            !headerRef.current.contains(event.target)
        ) {
            setIsDropdownExpanded(false);
        }
    }

    const handleClick = () => {
        setIsDropdownExpanded(prevState => !prevState);
    }

  return (
    <div className="switcher-container">
        <div className={`switcher ${isDropdownExpanded  ? 'switcher-active' : ''}`} onClick={handleClick}>
            <p className='language'>{currentLanguage}</p>
            <div className='switcher-arrow-container'></div>
        </div>

        {isDropdownExpanded && (
                <div className='switcher__menu'>
                    <ul>
                    {availableLanguages.map(lang => (
                        <li key={lang} onClick={() => changeLanguage(lang)}>
                            {lang}
                        </li>
                    ))}
                    </ul>
                </div>
            )}
    </div>
  );
}

export default LanguageSwitcher;
