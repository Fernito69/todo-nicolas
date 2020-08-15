import React, {useRef, useState, Fragment} from 'react';
import  { 
	IonApp,
    IonHeader,
    IonContent, 
	IonToolbar,
	IonGrid,
	IonRow,
	IonCol,		
	IonItem,
	IonLabel,
	IonInput,
	IonAlert
} from '@ionic/react';
import BMIControls from "./components/BMIControls"
import BMIResult from "./components/BMIResult"
import InputControl from "./components/InputControl"

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {

	const [calculatedBMI, setCalculatedBMI] = useState<number>(0)
	const [error1, setError1] = useState<string>()
	const [calcUnits, setCalcUnits] = useState<"mkg" | "ftlbs">("mkg")

	const weightInputRef = useRef<HTMLIonInputElement>(null); //trabajando con refs siempre tengo que poner qé tipo de ionic element e inicializar con null
	const heightInputRef = useRef<HTMLIonInputElement>(null);

	const calculateBMI = () => {
		const enteredWeight = weightInputRef.current?.value // lo mismo que un ternario ? weightInputRef... : null
		const enteredHeight = heightInputRef.current!.value // sin ternario, porque estamos seguros de que nunca será null	

		if (!enteredHeight || !enteredWeight || +enteredHeight <= 0 || +enteredWeight <= 0) {
			setError1("Please enter a valid number");
			return
		}
		
		const bmi = +enteredWeight / (+enteredHeight*+enteredHeight) // + converts to number

		setCalculatedBMI(bmi)
	}

	const reset = () => {
		weightInputRef.current!.value = ""
		heightInputRef.current!.value = ""
		setCalculatedBMI(0);
	} 
	
	const clearError = () => {
		setError1("")
	}

	//to convert variable to boolean: !! in front

	return (

		<Fragment>

			<IonAlert 
				isOpen={!!error1} 
				message={error1}
				buttons={[{text: "Okay", handler: clearError}]}
			/>

			<IonApp>
				<IonHeader>
					<IonToolbar color="primary">Test app with Ionic</IonToolbar>
				</IonHeader>
				<IonContent className="ion-padding">
					<IonGrid>
						<IonRow>
							<IonCol>
								<InputControl 
									calcUnits={calcUnits}
									setCalcUnits={setCalcUnits}
								/>
							</IonCol>
						</IonRow>
						<IonRow>
							<IonCol>
								<IonItem>
									<IonLabel position="floating">{`Weight (in ${calcUnits})`}</IonLabel>
									<IonInput type="number" ref={weightInputRef}></IonInput>
								</IonItem>
							</IonCol>	
						</IonRow>
						<IonRow>			
							<IonCol>
								<IonItem>
									<IonLabel position="floating">{`Height (in ${calcUnits})`}</IonLabel>
									<IonInput type="number" ref={heightInputRef}></IonInput>
								</IonItem>
							</IonCol>
						</IonRow>
						<BMIControls 
							calculateBMI = {calculateBMI}
							reset = {reset}
						/>					
						{
							calculatedBMI !== 0 
							&& 
							<BMIResult 
								calculatedBMI = {calculatedBMI}
							/>
						}					
					</IonGrid>
				</IonContent>    
			</IonApp>
		</Fragment>
	)
}
	
export default App;
