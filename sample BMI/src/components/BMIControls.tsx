import React from 'react'
import {
    IonButton,
    IonIcon,
    IonRow,
    IonCol,
} from "@ionic/react"
import { calculatorOutline, refreshOutline } from "ionicons/icons" 

//tengo que especificar qué tipo de props le estoy pasando
const BMIControls : React.FC<{
    calculateBMI: () => void
    reset: () => void
}> = props => {    

    const {calculateBMI, reset} = props;

    return (  
        
        <IonRow>
            <IonCol className="ion-text-left">
                <IonButton onClick={calculateBMI}>
                    <IonIcon slot="start" icon={calculatorOutline} />
                    Calculate
                </IonButton>
            </IonCol>
            <IonCol className="ion-text-right">
                <IonButton onClick={reset}>
                    <IonIcon slot="start" icon={refreshOutline} />
                    Refresh
                </IonButton>
            </IonCol>
        </IonRow>
    );
}
 
export default BMIControls;