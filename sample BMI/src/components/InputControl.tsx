import React from 'react'
import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react"
 
const InputControl : React.FC<{
    calcUnits: "mkg" | "ftlbs"
    setCalcUnits: (value: "mkg" | "ftlbs") => void
}> = props => {

    const {calcUnits, setCalcUnits} = props

    return (  
        <IonSegment value={calcUnits} onIonChange={(e:CustomEvent) => setCalcUnits(e.detail.value)}>
            <IonSegmentButton value="mkg">
                <IonLabel>m/kg</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="ftlbs">
                <IonLabel>ft/lbs</IonLabel>
            </IonSegmentButton>
        </IonSegment>
    );
}
 
export default InputControl;