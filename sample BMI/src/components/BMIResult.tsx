import * as React from 'react';
import {
    IonRow,
    IonCol,
    IonCard,
    IonCardContent
} from "@ionic/react"


const BMIResult : React.FC<{calculatedBMI: number}> = props => {

    const {calculatedBMI} = props

    return (  
        <IonRow>
            <IonCol>
                <IonCard>
                    <IonCardContent className="ion-text-center">
                        <h2>Your body mass index:</h2>
                        <h2>{calculatedBMI.toFixed(2)}</h2>
                    </IonCardContent>
                </IonCard>
            </IonCol>
        </IonRow>
    );
}
 
export default BMIResult;