import { useEffect, useRef, useState } from "react";
import { ApprovedCurrenciesList } from "../../constants/init";
import { IConvert } from "../../constants/models";
import successIcon from '../../assets/success.svg';
import './SelectCurrency.css';

type SelectCurrencyProps = {
    activeCurrency: IConvert;
    onChange?: (value: any) => void
  };

export default function SelectCurrency({activeCurrency, onChange}: SelectCurrencyProps) {
    const [optionsVisible, setOptionsVisible] = useState<boolean>(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setOptionsVisible(prevState => !prevState);
    }

    const handleOptionClick = (currency: IConvert) => {
        onChange && onChange(currency);
        setOptionsVisible(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            setOptionsVisible(false);
        }
    };

    useEffect(() => {
        if (optionsVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [optionsVisible]);

    return (
        <div className="select" ref={selectRef}>
            <div className="select-wrapper" onClick={handleClick}>
                <div className="select-wrapper__icon">
                    <img alt="btc" src={`https://cryptologos.cc/logos/thumbs/${activeCurrency.id}.png`}/>
                </div>
                <span>{activeCurrency.symbol}</span>
                <div className="select-wrapper__arrow"></div>
            </div>

            <div className={`select__options ${optionsVisible ? 'visible' : ''}`}>
                <ul>
                    {ApprovedCurrenciesList.map((currency) => (
                        <li key={currency.id} onClick={() => handleOptionClick(currency)}>
                            <div className="select__options__icon">
                                {activeCurrency && activeCurrency.id === currency.id ? <img src={successIcon} alt="icon"/> : <></>}
                            </div>
                            <div className="select__options__icon">
                                <img src={`https://cryptologos.cc/logos/thumbs/${currency.id}.png`} alt="icon" />
                            </div>
                            <span>{currency.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}