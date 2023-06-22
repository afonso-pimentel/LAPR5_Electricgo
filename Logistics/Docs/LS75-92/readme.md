# [LS75-92 Create Package](https://lei-isep-ricardo.atlassian.net/jira/software/projects/LS75/boards/1?selectedIssue=LS75-92)
[Go Back](../../Readme.md)
In the module Logistics Management it should be possible to create a package.
## Diagrams
### Level 1 - Logical View
![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%201/N1-LV.svg)
### Level 1 - Process View
![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%201/Processes/N1-PV-US92.svg)
### Level 1 - Scenario View
![Scenario view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/9e20a38813650b235e78ad69d5359d116679f22d/Docs/Diagrams/Level%201/N1-SV.svg)
### Level 2 - Logical View
![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/82e20dd833ef0b8a3fedd0664438fda1150cd0f5/Docs/Diagrams/Level%202/N2-LV.svg)
### Level 2 - Process View
![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%202/Processes/N2-PV-US92.svg)
### Level 2 - Implementation View
![Implementation View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/82e20dd833ef0b8a3fedd0664438fda1150cd0f5/Docs/Diagrams/Level%202/N2-IV.jpg)
### Level 2 - Physical View
![Physical View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/82e20dd833ef0b8a3fedd0664438fda1150cd0f5/Docs/Diagrams/Level%202/N2-PIV.jpg)
### Level 2.5 - Logical View
![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/82e20dd833ef0b8a3fedd0664438fda1150cd0f5/Docs/Diagrams/Level%202.5/N2.5-LV-LM.svg)
### Level 2.5 - Process View
![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/82e20dd833ef0b8a3fedd0664438fda1150cd0f5/Docs/Diagrams/Level%202.5/Processes/N2.5-PV-US97.svg)
### Level 2.5 - Implementation View
![Implementation View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/82e20dd833ef0b8a3fedd0664438fda1150cd0f5/Docs/Diagrams/Level%202.5/N2.5-IV-LM.jpg)
### Level 3 - Logical View
![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/82e20dd833ef0b8a3fedd0664438fda1150cd0f5/Docs/Diagrams/Level%203/N3-LV-LM.svg)
### Level 3 - Process View
![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%203/Processes/N3-PV-US92.svg)
### Level 3 - Implementation View
![Implementation View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/82e20dd833ef0b8a3fedd0664438fda1150cd0f5/Docs/Diagrams/Level%203/N3-IV-LM.jpg)

## Module Package Management - Test

### Unit Test

**Class:**

- DeliveryPackage

**Method:**

- create

| Test Case | Expected Result |
| --- | --- |
| Invalid load time | Should return a *Result\<DeliveryPackage>* with fail status |
| Invalid unload time | Should return a *Result\<DeliveryPackage>* with fail status |
| Invalid position | Should return a *Result\<DeliveryPackage>* with fail status |
| Invalid position X | Should return a *Result\<DeliveryPackage>* with fail status |
| Invalid position Y | Should return a *Result\<DeliveryPackage>* with fail status |
| Invalid position Z | Should return a *Result\<DeliveryPackage>* with fail status |
| Invalid delivery ID | Should return a *Result\<DeliveryPackage>* with fail status |
| Valid arguments | Should return a *Result\<DeliveryPackage>* with success status |

---

**Class:**

- DeliveryPackageService

**Method:**

- create

**Mock classes:**

- IDeliveryPackageRepo
- IDeliveryRepo

| Test Case | Expected Result |
| --- | --- |
| Invalid data | Should return a *Result\<IDeliveryPackageDTO[]>* with fail status |
| Valid data | Should return a *Result\<IDeliveryPackageDTO[]>* with success status |
| Delivery ID non existent in WarehouseManagement | Should return a *Result\<IDeliveryPackageDTO[]>* with fail status |
---

### Integration Test

**Class:**

- DeliveryPackageController
- DeliveryPackageService

**Method:**

- createDeliveryPackage(controller)
- createDeliveryPackage(service)

**Mock classes:**

- IDeliveryPackageRepo
- IDeliveryRepo

| Test Case | Expected Result |
| --- | --- |
| Invalid data | Should return a 400 status |
| Valid data | Should return delivery package json |
| Delivery ID non existent in WarehouseManagement | Should return a 400 status |
---


