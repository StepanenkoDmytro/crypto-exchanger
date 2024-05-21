import { useState } from "react";
import Stepper from "./stepper/Stepper";
import ExchangeDetailsStep from "./stepper/components/ExchangeDetailsStep";
import PaymentStep from "./stepper/components/PaymentStep";
import SimpleExchangerStep from "./stepper/components/SimpleExchangerStep";
import SuccessExchangeStep from "./stepper/components/SuccessExchangeStep";
import Error from './error/Error';
import ApiService from '../services/ApiService';

const Exchanger: React.FC<any> = () => {
    const [formValue, setFormValue] = useState({});
	const [isError, setIsError] = useState(false);
	const [activeStep, setActiveStep] = useState(1);

    const handleConfirm = async () => {
		const apiService = new ApiService();
		try {
			await apiService.successExchange(formValue);
			setIsError(true);
		} catch (e) {
			console.error("Error while upload info: ", e);
			setIsError(true);
		}
	}

	const handleOnRetry = () => {
		setActiveStep(1);
		setIsError(false);
	}

	const updateForm = (data: any) => {
		setFormValue({...formValue, ...data});
	}

    const steps = [
		{order: 1, title: 'Select currency', content: <SimpleExchangerStep  form={formValue}  onCoinsChanged={(data: any) => updateForm(data)} />},
		{order: 2, title: 'Payment Details', content: <ExchangeDetailsStep  form={formValue} onDetailsChange={(data: any) => updateForm(data)} />},
		{order: 3, title: 'Confirm Payment', content: <PaymentStep form={formValue} onPaymentChange={(data: any) => updateForm(data)} />},
		{order: 4, title: 'Complete Payment', content: <SuccessExchangeStep form={formValue}/>},
	];
    
    return (
		<>
			<Stepper steps={steps} activeStep={activeStep} onConfirm={handleConfirm}/>
			{isError
				? <Error onRetry={handleOnRetry} />
				: <></>
			}
		</>
    );
}

export default Exchanger;