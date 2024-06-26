import { useEffect, useState } from 'react';
import './StepAnimation.css';
import FirstStep from './components/FirstStep';
import SecondStep from './components/SecondStep';
import ThirdStep from './components/ThirdStep';
import Arrow from '../form-controls/Arrow';


interface StepAnimationProps {
    activeStep: number;
}

const StepAnimation: React.FC<StepAnimationProps> = ({ activeStep: propActiveStep }) => { 
    const steps = [
		{order: 1, content: <FirstStep />},
		{order: 2, content: <SecondStep />},
		{order: 3, content: <ThirdStep />},
	];

    const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth > 400);
    
    const [activeStep, setActiveStep] = useState<number>(propActiveStep);
    const [prevActiveStep, setprevActiveStep] = useState<number>(0);

    useEffect(() => {
        if(propActiveStep !== prevActiveStep && propActiveStep <= steps.length) {
            setActiveStep(propActiveStep);
            setprevActiveStep(propActiveStep);
        } 

        const handleResize = () => {
            setIsScreenSmall(window.innerWidth < 400);
          };
      
          window.addEventListener('resize', handleResize);
      
          return () => {
            window.removeEventListener('resize', handleResize);
          };
        
    }, [propActiveStep, activeStep, window.innerWidth]);

    const handlePrevClick = () => {
        setActiveStep(prevStep => prevStep !== 1 ? prevStep - 1 : prevStep);
        
    };

    const handleNextClick = () => {
        setActiveStep(prevStep => prevStep !== steps.length ? prevStep + 1 : prevStep);
    };

    return (
        <div className='stepper-animation'>
            {activeStep > 1 &&
                <>
                {isScreenSmall 
                ? (<div onClick={handlePrevClick}><Arrow direction='left' /></div> )
                :
                (<div onClick={handlePrevClick}><Arrow width={15} direction='left' /></div>)
                }
                </>
            }
            
            <div className='stepper-container'>
                <div className="step-content">
                    {steps.find(step => step.order === activeStep)?.content}
                </div>
            </div>
            {activeStep < steps.length &&
                <>
                {isScreenSmall 
                    ? (<div onClick={handleNextClick}><Arrow direction='right' /></div> )
                    :
                    (<div onClick={handleNextClick}><Arrow width={15} direction='right' /></div>)
                    }
                </>
            }
        </div>
    );
}

export default StepAnimation;
