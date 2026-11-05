\# Automated HL7 v2 to FHIR R4 Interoperability Pipeline



An end-to-end clinical data integration engine designed to bridge legacy hospital systems with modern cloud infrastructure. This pipeline automates the ingestion, parsing, transformation, and RESTful routing of positional patient records into a web-friendly JSON format.



\## 🗺️ System Architecture \& Workflow (The 5 Ws)

\* \*\*What \& Why\*\*: Legacy hospital data is traditionally locked up in a 40-year-old message standard called \*\*HL7 v2\*\* (which relies on positional segments split by vertical bars `|`). Modern web applications and cloud repositories cannot read this native text stream. This project acts as an automated data pipeline and real-time translator, converting legacy records into clean, web-standard \*\*FHIR JSON\*\* structures.

\* \*\*Who\*\*: Built for clinical hospital networks, diagnostic laboratories, and health-tech applications requiring scalable, automated data interoperability.

\* \*\*Where \& When\*\*: Deployed entirely via containerized local architecture, this pipeline operates with zero latency. The moment an EMR drops an incoming health file into the monitored directory, the integration engine immediately triggers processing, mapping, and destination delivery in milliseconds.



\## 🛠️ Step-by-Step Implementation Flow

1\. \*\*Target Warehouse Initialization\*\*: Containerized and deployed an open-source relational \*\*HAPI FHIR JPA server\*\* locally utilizing \*\*Docker\*\* over a dedicated system port to host incoming clinical web payloads.

2\. \*\*Automated Source Listener\*\*: Configured a file system directory listener within \*\*Mirth Connect (NextGen Connect)\*\* to continuously poll and clear hospital-delivered message feeds (`\*.hl7`).

3\. \*\*Data Transformation \& Normalization\*\*: Developed non-blocking \*\*JavaScript\*\* mapping transformers within the Mirth pipeline to programmatically extract fields from raw `ADT^A01` (Patient Admission) messages.

&#x20;  \* Standardized legacy data layouts (`YYYYMMDD`) into standardized web-compliant formats (`YYYY-MM-DD`).

&#x20;  \* Normalised structural code fields into standard administrative demographics with strict fallback conditions.

4\. \*\*RESTful Web Routing\*\*: Engineered an \*\*HTTP Sender\*\* destination mapping protocol using RESTful `POST` endpoints to securely transmit the translated JSON payloads directly into the database container.



\## 💻 Technical Stack

\* \*\*Integration Engine\*\*: Mirth Connect (NextGen Connect)

\* \*\*Healthcare Protocols\*\*: HL7 v2.5 Standard, FHIR R4 Core Specification

\* \*\*Languages\*\*: JavaScript (ES6+), Markdown

\* \*\*Infrastructure\*\*: Docker, Windows Subsystem for Linux (WSL), HAPI FHIR JPA Starter Server



\## 🗂️ Project Repository Map

\* `/channel\_config.xml`: Complete exported configuration file for the Mirth Connect channel.

\* `/transformer.js`: Native JavaScript data parsing, translation, and schema validation script.

\* `/patient\_sample.hl7`: Sample raw positional text admission file utilized for system pipeline validation.



