# DMS Upload

## Setup

1. `npm install`
2. `npm run serve`
3. Browse to `http://localhost:9999/documents/29/bulk-metadata/bulk/step1`

## Opzet

DMS Upload kent twee uitvoeringen, een single-file en een bulk upload. In de single-file modus kan je een bestand uploaden en deze voorzien van metadata. In de bulk modus kan je meerdere bestanden uploaden en deze voorzien van algemene metadata en individuele metadata per bestand.

---
## Technical Depth

### CreatableSelect/CreatableSelectArray

Er is een stuk technical depth rondom het selectbox element. Voor de bulk-upload wordt een nieuwe variant `<CreatableSelectArray />` gebruikt. Voor single-upload gebruiken we de het oude component;  `<CreatableSelect />`. De Technical depth zit in een stuk duplicatie tussen de twee componenten, al werken ze wel op een andere manier. 

Het voornemen is om deze componenten later te repareren en volgens een oplossing te laten werken. De reden voor het opnemen van deze technical depth is omdat we in tijdsnoods kwamen rondom de oplevering van DMS. Het oplossen van de bugs rondom validatie in het selectbox element lukte niet met het oude component `<CreatableSelect />`. 

### CreatableSelect

Dit is het oude component wat in single-upload wordt gebruikt. Deze werkt met een `oneOf` van enums voor het generen van de opties.

### CreatableSelectArray

Dit is het nieuwe component wat in bulk-upload wordt gebruikt. Deze werkt met een array van enums voor het generen van de opties.

---
## Interfaces 
### Algemeen

De interfaces voor `<Single />` en `<Bulk  />` zijn grotendeels gelijk.

```
asset               - Asset object
basePath            - Pad dat vanuit DMS wordt meegegeven 
                      (bijv `/documents/29/bulk-metadata`)
getHeaders          - Callback voor request headers
getPostUrl          - Callback voor opvragen POST url
metadataForm        - JSONForms object (met oa schema, uischema, data)
onCancel            - Callback voor annuleren
onClose             - Callback voor sluiten
onFileRemove        - Callback voor verwijderen bestand
onFileSuccess       - Callback voor uploaden bestand
uploadHTTPMethod    - POST/GET methode
```

### Single

Zie voor details `Props` in `src/features/single/single/types`

```
onMetadataSubmit    - Callback voor opslaan metadata
```

### Bulk

Zie voor details `Props` in `src/features/bulk/bulk/types`

```
getDocumentViewUrl	- Callback voor opvragen URL van bestand
metadataFields      - Object met daarin de velden voor stap 2
onMetadataSubmit    - Callback voor opslaan metadata
```

---
## Structuur

De props aan `<Single />` en `<Bulk />` worden doorgegeven aan `<StepX />` en `<SingleWizard />`, `<BulkWizard />`.

### Single

```
	Button
	Routes
	- Step1
	  - SingleWizard
	    - FileUpload
	- Step2
	  - SingleWizard
	    - MetadataForm
```

### Bulk

```
	Button
	Routes
	- Step1
	  - BulkWizard
	    - FileUpload
	- Step2
	  - BulkWizard
	    - BulkMetadataForm
	- Step3
	  - BulkWizard
	    - Pagination
		- FileViewer
		  - IndividualFieldsForm
		  - DefaultFieldsTable
		  - DocumentViewer
```

#### Step 1

Beheert de state vanuit het `<FileUpload />` component. En roept de callbacks aan die vanuit de `Props` komen, meegegeven vanuit `<Bulk />`.

**FileUpload**

Component uit `@amsterdam/bmi-component-library`

### Step 2

Beheert de state vanuit het `<BulkMetadataForm />` component. En roept de callbacks aan die vanuit de `Props` komen, meegegeven vanuit `<Bulk />`.

**BulkMetadataForm**

Genereert een formulier obv de velden vanuit DMS. Onderliggende gebruikt het JSONForms.

### Step 3

Beheert de state vanuit de `<Pagination />` en `<FileViewer />` componenten. En roept de callbacks aan die vanuit de `Props` komen, meegegeven vanuit `<Bulk />`.

**FileViewer**

Toont de individuele velden, standaard velden en een voorvertoning van het bestand.

* `<IndividualFieldsForm />` toont de velden die individueel per bestand moeten worden aangepast.
* `<DefaultFieldsTable />` toont de velden die standaard zijn voor alle bestanden
* `<DocumentViewer />` toont de voorvertoning van het bestand.

---
## State (Redux)

Zie `src/features/single/single/store/slice.ts` en `src/features/bulk/bulk/store/slice.ts` voor de slices. 

Zie `src/features/single/single/store/model.ts` en `src/features/bulk/bulk/store/model.ts` voor de Interfaces van de twee stores.

```
state:
  - single:
    - currentStep
	- file
	- metadata
  - bulk:
    - currentStep
	- files
	- fields
```

---
## Data conversie

### Bulk

Er vinden een aantal data conversies plaats.

1. DMS velden naar de state.bulk.fields.
	`convertDmsDynamicFormFieldsToBulkMetadataFields`
2. DMS velden omvormen voor metadataProperties, nodig JSONForms schema en uischema
	`convertDmsDynamicFormFieldsToMetadataProperty`
3. state.bulk.fields omvormen voor metadataProperties, nodig JSONForms schema en uischema
	`convertBulkFieldsToMetadataProperties`
4. state.bulk.fields naar JSONForms data
	`convertBulkFieldsToMetadataGenericTypes`

Er vind dus een conversie plaats in `App.tsx` zodat de data vanuit DMS wordt omgezet naar objecten die nodig zijn voor JSONForms en de velden in de state.
Ook is er een belangrijke conversie in `<FileViewer />`, daar wordt de state omgezet naar objecten die nodig zijn voor JSONForms. 

--
## Mock API

In `db.json` wordt de mock-api beschreven, deze json is de input voor de [json-server](https://github.com/typicode/json-server) module.
De mock-api bevat nu een end-point voor het uploaden van files (maar deze slaat geen echte files op) en het upload-session endpoint welke ook in DMS zit. Deze mock-api is puur voor lokaal ontwikkelen bedoeld.
