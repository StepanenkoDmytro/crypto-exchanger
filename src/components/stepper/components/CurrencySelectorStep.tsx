import './CurrencySelectorStep.css';
import { useState, useEffect } from 'react';
import echangeIcon from '../../../assets/echange.svg';
import Input from '../../ui/form-controls/Input';
import ApiService from '../../../services/ApiService';
import { IConvert, defaultCurrencyFrom, defaultCurrencyTo } from '../../../domain/models';
import CurrencySelector from '../../ui/form-controls/CurrencySelector';


const CurrencySelectorStep: React.FC<any> = (props) => { 
    const apiService = new ApiService();
    const [currencyFrom, setCurrencyFrom] = useState<IConvert>(defaultCurrencyFrom);
    const [currencyTo, setCurrencyTo] = useState<IConvert>(defaultCurrencyTo);
    const [amountFrom, setAmountFrom] = useState<number | string>(0.1);
    const [amonutTo, setAmonutTo] = useState<number | string>(0);

    useEffect(() => {
        updateFormData();
        convertCurrency();

        fetchPrices();

    }, [currencyFrom, currencyTo, amountFrom, props.retryTrigger]);

    const updateFormData = () => {
        currencyFrom.amount = amountFrom;
        currencyTo.amount = amonutTo;

        props.onCoinsChanged({
            currencyFrom: currencyFrom,
            currencyTo: currencyTo,
        });
    };

    const convertCurrency = () => {
        const parseAmount = typeof amountFrom === 'string' ? parseFloat(amountFrom) : amountFrom;
        if (parseAmount && currencyFrom.price && currencyTo.price) {
            const result = (parseAmount * currencyFrom.price / currencyTo.price).toFixed(6);
            setAmonutTo(parseFloat(result));
        }
    };

    const fetchPrices = async () => {
        
        try {
            const currencyFromInfo = await apiService.getCoinPrice(currencyFrom.id);
            const currencyToInfo = await apiService.getCoinPrice(currencyTo.id);
            
            if(!currencyFromInfo || !currencyToInfo) {
                props.onError();
                return;
            }

            setCurrencyFrom(prevState => ({
                ...prevState,
                price: currencyFromInfo.price,
            }));

            setCurrencyTo(prevState => ({
                ...prevState,
                price: currencyToInfo.price,
            }));

        } catch (error) {
            console.error('Failed to fetch crypto prices:', error);
            props.onError();
        }
    };

    const handleAmountChange = (event: string | number) => {
        setAmountFrom(event);
    };  

    const handleChangeCurrencyFrom = (currency: IConvert) => {
        setCurrencyFrom(currency);
    }

    const handleChangeCurrencyTo = (currency: IConvert) => {
        setCurrencyTo(currency);
    }
    
    return (
        <div className="currency-box">
            <div className="currency-wrapper">
                
                <Input type={'text'}
					   label={'Amount to send'}
					   value={amountFrom}
					   onInput={handleAmountChange}/>

                <CurrencySelector activeCurrency={currencyFrom} onChange={handleChangeCurrencyFrom}/>
            </div>

            <div className="currency-wrapper__btn-convert">
                <img src={echangeIcon} alt="svg" />
            </div>

            <div className="currency-wrapper">
                
                <Input type={'number'}
                    label={'Amount to receive'}
                    value={amonutTo}
                    readonly/>
                    
                <CurrencySelector activeCurrency={currencyTo} onChange={handleChangeCurrencyTo}/>
            </div>
        </div>
    );
}

export default CurrencySelectorStep;