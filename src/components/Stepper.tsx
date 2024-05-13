
import { useState, useEffect, ReactNode } from 'react';
import './Stepper.css';

const Step = ({ children, isActive }: { children: ReactNode, isActive: boolean }) => (
	<div className={`step ${isActive ? 'active' : ''}`}>
		{isActive && <div className="step-content">{children}</div>}
	</div>
);

const Stepper = (props: any) => {
	const [activeStep, setActiveStep] = useState(props.activeStep);
	useEffect(() => {
		setActiveStep(props.activeStep);
	}, [props.activeStep])

	const totalSteps = 3;

	const goNext = () => {
		if (activeStep < totalSteps) {
			setActiveStep(activeStep + 1);
		}
	};

	const goBack = () => {
		if (activeStep > 1) {
			setActiveStep(activeStep - 1);
		}
	};

	const handleGoToStep = (step: any) => {
		setActiveStep(step);
	}


	return (
		<>
			<div className="stepper-header">
				{props.steps.map((step: any) => (
					<div
						className={`step-header ${activeStep === step.order ? 'active' : ''}`}
						onClick={() => handleGoToStep(step.order)}
					>
						<span className={`step-header__circle ${activeStep === step.order ? 'active-circle' : ''}`}></span>
						<span className="step-title">{step.title}</span>
					</div>
				))}
			</div>

			<div className="stepper-container">
				{props.steps.map((step: any) => (
					<Step key={step.order} isActive={activeStep === step.order}>
						<section className="stepper-content">
							{step.content}
						</section>

						<div className="step-actions">
							{step.order > 1 && <button className="btn btn-danger" onClick={goBack}>Назад</button>}
							{(step.order < props.steps.length) && <button className="btn ms-2" onClick={goNext}>Далее</button>}
							{(step.order === props.steps.length) && <button className="btn ms-2" onClick={props.onConfirm}>Сгенерировать</button>}
						</div>
					</Step>
				))}
			</div>
		</>
	);
};

export default Stepper;
