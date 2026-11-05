// =====================================================================
// PROJECT: Automated HL7 v2.5 to FHIR R4 Interoperability Pipeline
// COMPONENT: Mirth Connect JavaScript Transformer Engine
// =====================================================================

// 1. INGESTION TIER: Extract raw HL7 message segments via Mirth notation
var patientId  = msg['PID']['PID.3']['PID.3.1'].toString();
var lastName   = msg['PID']['PID.5']['PID.5.1'].toString();
var firstName  = msg['PID']['PID.5']['PID.5.2'].toString();
var birthDate  = msg['PID']['PID.7']['PID.7.1'].toString();  // Raw layout: YYYYMMDD
var genderCode = msg['PID']['PID.8']['PID.8.1'].toString();  // Raw layout: M or F

// 2. NORMALIZATION TIER: Reformat dates from legacy text to standard web layouts
var fhirBirthDate = birthDate.substring(0,4) + "-" + birthDate.substring(4,6) + "-" + birthDate.substring(6,8);

// 3. SCHEMA MAPPING TIER: Evaluate structural demographics with conditional fallbacks
var fhirGender = "unknown";
if (genderCode === "M") { 
    fhirGender = "male"; 
} else if (genderCode === "F") { 
    fhirGender = "female"; 
}

// 4. DELIVERY TIER: Construct a valid FHIR R4 Patient JSON object structure
var fhirPatient = {
    "resourceType": "Patient",
    "id": patientId,
    "identifier": [{
        "use": "official",
        "type": {
            "coding": [{
                "system": "http://hl7.org",
                "code": "MR"
            }]
        },
        "system": "http://hospital.org",
        "value": patientId
    }],
    "name": [{
        "use": "official",
        "family": lastName,
        "given": [firstName]
    }],
    "gender": fhirGender,
    "birthDate": fhirBirthDate
};

// 5. EXPORT ENGINE: Transform JSON payload to string and bind to channel context
channelMap.put('fhir_json_payload', JSON.stringify(fhirPatient));
