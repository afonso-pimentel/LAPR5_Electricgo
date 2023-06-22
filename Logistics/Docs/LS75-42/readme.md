# [LS75-42 Create Truck](https://lei-isep-ricardo.atlassian.net/jira/software/projects/LS75/boards/1?selectedIssue=LS75-42)

[Go Back](../../Readme.md)

In the module Logistics Management it should be possible to create a truck.

## Diagrams

### Level 1 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/cd5ee25be775f9801003d2d04462e5a07fb56142/Docs/Diagrams/Level%201/N1-LV.svg)

### Level 1 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/cd5ee25be775f9801003d2d04462e5a07fb56142/Docs/Diagrams/Level%201/Processes/N1-PV-US42.svg)

### Level 1 - Scenario View

![Scenario view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%201/N1-SV.svg)

### Level 2 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8408e1cab6c874d14cb3c9d4a61bfee434d3c19d/Docs/Diagrams/Level%202/N2-LV.svg)

### Level 2 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/80d4cdca0c910a2089acfcbae8dbd60d4d9b1282/Docs/Diagrams/Level%202/Processes/N2-PV-US42.svg)

### Level 2 - Implementation View

![Implementation View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8408e1cab6c874d14cb3c9d4a61bfee434d3c19d/Docs/Diagrams/Level%202/N2-IV.jpg)

### Level 2 - Physical View

![Physical View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8408e1cab6c874d14cb3c9d4a61bfee434d3c19d/Docs/Diagrams/Level%202/N2-PIV.jpg)

### Level 3 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8408e1cab6c874d14cb3c9d4a61bfee434d3c19d/Docs/Diagrams/Level%203/N3-LV-LM.svg)

### Level 3 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/161bdd8a5e6e878e9a1417230fd3cd2cb619161f/Docs/Diagrams/Level%203/Processes/N3-PV-US42.svg)

### Level 3 - Implementation View

![Implementation View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8408e1cab6c874d14cb3c9d4a61bfee434d3c19d/Docs/Diagrams/Level%203/N3-IV-LM.jpg)

## Module Logistics Management Truck - Test

### Unit Test

**Class:**

- TruckService

**Method:**

- createTruck

**Mock classes:**

- ITruckRepo

| Test Case | Expected Result |
| --- | --- |
| Duplicated Truck | Should return a *Result\<ITruckDTO>* with fail status |
| Invalid Truck | Should return a *Result\<ITruckDTO>* with fail status |
| Repository Truck was called | *save* should be called once |
| Repository Truck was called | *findByLicensePlate* should be called once |
| Created Successfully | Should return *Result\<ITruckDTO>* with success status |

---

**Class:**

- TruckMap

**Method:**

- toDomain

| Test Case | Expected Result |
| --- | --- |
| Invalid tare | Should return a *Result\<Truck>* with fail status |
| Invalid loadCapacity | Should return a *Result\<Truck>* with fail status |
| Invalid fullLoadAutonomy | Should return a *Result\<Truck>* with fail status |
| Invalid capacity | Should return a *Result\<Truck>* with fail status |
| Invalid slowChargeTime | Should return a *Result\<Truck>* with fail status |
| Invalid fastChargeTime | Should return a *Result\<Truck>* with fail status |
| SlowChargeTime less than fastChargeTime | Should return a *Result\<Truck>* with fail status |
| Invalid licensePlate | Should return a *Result\<Truck>* with fail status |
| Valid Truck | Should return a *Result\<Truck>* with success status |

---

### Integration Test

**Class:**

- TruckController
- TruckService

**Method:**

- createTruck
- createTruck

**Mock classes:**

- ITruckRepo
- IWarehouseRepo

| Test Case | Expected Result |
| --- | --- |
| Duplicated Truck | Should return a 400 status |
| Created Successfully | Should return ITruckDTO json  |

---
