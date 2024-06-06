
import pickle
import pandas as pd
import numpy as np

from sklearn.preprocessing import LabelEncoder
from flask_cors import CORS


from flask import Flask, request, jsonify

app = Flask(__name__)
CORS(app)

filename = "./gendisease.sav"

model = pickle.load(open(filename, "rb"))

lnk = "./disease_input.csv"







def getData(link):
	return pd.read_csv(link).dropna(axis=1)





def predictDisease(symptoms, continent, data_dict):
    
    
    if symptoms == "":
        return "No disease"
    else:
        symptoms = symptoms.split(",")
        
        
        #len(data_dict["symptom_index"])
        input_data = [0] * 132 #size of expected input
        
        for symptom in symptoms:
            symptom_formatted = " ".join([i.capitalize() for i in symptom.split("_")])  # Ensure formatting matches
            
            if symptom_formatted in data_dict["symptom_index"]:
                index = data_dict["symptom_index"][symptom_formatted]
                
                input_data[index] = 1
            else:
                print(f"Symptom not found in index: {symptom_formatted}")

        input_data = np.array(input_data).reshape(1, -1)
        svm_prediction = data_dict["predictions_classes"][model.predict(input_data)[0]]
        if (continent == "Africa" and (svm_prediction == "GERD" or svm_prediction == "Allergy")):
            svm_prediction = "Ebola"
        elif (continent == "Asia" and (svm_prediction == "GERD" or svm_prediction == "Allergy")):
            svm_prediction = "Dengue Fever"
        elif ((continent == "Europe" or continent == "South America") and (svm_prediction == "GERD" or svm_prediction == "Allergy")):
            svm_prediction = "Lyme Disease"
        elif (continent == "Africa" and svm_prediction == "Peptic Ulcer"):
            svm_prediction = "Nile Virus"
        elif (continent == "South America" and svm_prediction == "Jaundice"):
            svm_prediction = "Leptospirosis"

        return svm_prediction










@app.route('/predict', methods=['POST'])
def predict():
    # Extract string from POST request
    jsonData = request.json
    symptoms = jsonData['input']

    continent = symptoms[0]
    unformattedsymp = symptoms[1:]
    patientsymp = []
    for i in range(len(unformattedsymp)):
        if (unformattedsymp[i] != ""):
            patientsymp.append(unformattedsymp[i])
    print(continent, patientsymp)

    data = getData(lnk)

    encoder = LabelEncoder()
    # dropping all the uncessary prognosis - ones that are quite obvious
    data = data[data.prognosis != "Drug Reaction"]
    data = data[data.prognosis != "Acne"]
    data = data[data.prognosis != "AIDS"]
    data = data[data.prognosis != "Paralysis (brain hemorrhage)"]
    data = data[data.prognosis != "Heart attack"]

    # st.write(data)
    data["prognosis"] = encoder.fit_transform(data["prognosis"])
    symptom_index = {}

    for index, value in enumerate(patientsymp):
        symptom = " ".join([i.capitalize() for i in value.split("_")])
        symptom_index[symptom] = index

    data_dict = {"symptom_index": symptom_index, "predictions_classes": encoder.classes_}
    finalstr = ""
    size = 0
    
    print(patientsymp)
    for i in range(len(patientsymp)):

        if (patientsymp[i] != ""):
            
            if i != len(patientsymp)-1:
                finalstr += patientsymp[i] + ","
            else:
                finalstr += patientsymp[i]
    print(finalstr)
    # Perform prediction (replace 'your_ml_function' with your actual function)
    prediction = predictDisease(finalstr, continent, data_dict)

    # Return the prediction as JSON
    return jsonify(prediction=prediction)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug = True)
