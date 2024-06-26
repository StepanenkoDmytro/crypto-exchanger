import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import Stepper from './stepper/Stepper'
import ExchangeDetailsStep from "./stepper/components/ExchangeDetailsStep";
import PaymentStep from "./stepper/components/PaymentStep";
import CurrencySelectorStep from "./stepper/components/CurrencySelectorStep";
import SuccessExchangeStep from "./stepper/components/SuccessExchangeStep";
import Error from './ui/error/Error';
import apiService from '../services/ApiService';
import StepAnimation from "./ui/step-animation/StepAnimation";
import { IConvert } from "../domain/models";

interface ExchangerProps {
    currencyFrom: IConvert;
    currencyTo: IConvert;
}

const Exchanger: React.FC<ExchangerProps> = ({ currencyFrom, currencyTo }) => {
	const { t } = useTranslation();
    const [formValue, setFormValue] = useState({currencyFrom, currencyTo});
	const [isError, setIsError] = useState(false);
	const [activeStep, setActiveStep] = useState(1);
	const [isDisabledNextBtn, setIsDisabledNextBtn] = useState<boolean>(false);
	const [retryTrigger, setRetryTrigger] = useState(0);

    const handleConfirm = async () => {
		// const apiService = new ApiService();
		try {
			await apiService.submitExchangeData(formValue);
			// setIsError(true);
		} catch (e) {
			console.error("Error while upload info: ", e);
			setIsError(true);
		}
	}

	const handleOnRetry = () => {
		setIsError(false);
		setActiveStep(1);

		setRetryTrigger(prevCount => prevCount + 1); 
	}

	const updateForm = (data: any) => {
		setFormValue({...formValue, ...data});
	}

	const handleCoinsChange = (data: { currencyFrom: IConvert; currencyTo: IConvert }) => {
        setFormValue({...formValue, ...data});
    }

	const handleActiveStepChange = (stepOrder: number) => {
		setActiveStep(stepOrder);
	};

	const handleDisabledNextBtn = (isValid: boolean, timeout: number = 0) => {
		setIsDisabledNextBtn(isValid);
	};

    const steps = [
		{order: 1, title: `${t('exchanger.head.selectCurr')}`, content: <CurrencySelectorStep  form={formValue}  onCoinsChanged={(data: any) => handleCoinsChange(data)} retryTrigger={retryTrigger} onError={() => setIsError(true)} onDisabledBtnChange={(isValid: boolean) => handleDisabledNextBtn(isValid)}/>},
		{order: 2, title: `${t('exchanger.head.paymentDetails')}`, content: <ExchangeDetailsStep  form={formValue} onDetailsChange={(data: any) => updateForm(data)} onDisabledBtnChange={(isValid: boolean) => handleDisabledNextBtn(isValid)}/>},
		{order: 3, title: `${t('exchanger.head.confirmPayment')}`, content: <PaymentStep form={formValue} onPaymentChange={(data: any) => updateForm(data)}  onDisabledBtnChange={(isValid: boolean) => handleDisabledNextBtn(isValid)}/>},
		{order: 4, title: `${t('exchanger.head.complitePayment')}`, content: <SuccessExchangeStep form={formValue}/>},
	];

	useEffect(() => {
		handleCoinsChange({currencyFrom, currencyTo});
	}, [retryTrigger, currencyFrom, currencyTo]);
    
    return (
		<>
			<section className="container" id='exchanger'>
				<StepAnimation activeStep={activeStep} />
				<Stepper steps={steps} activeStep={activeStep} onActiveStepChange={handleActiveStepChange} onConfirm={handleConfirm} stepValidity={isDisabledNextBtn}/>
			</section>
			{/* {isError
				? <Error onRetry={handleOnRetry} />
				: <></>
			} */}
		</>
    );
}

export default Exchanger;