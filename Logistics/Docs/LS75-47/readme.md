# [LS75-47 Create Delivery](https://lei-isep-ricardo.atlassian.net/jira/software/projects/LS75/boards/1?selectedIssue=LS75-47)

[Go Back](../../Readme.md)

In the module Logistics Management should be possible to create a delivery.

## Diagrams

### Level 1 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%201/N1-LV.svg)

### Level 1 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/605a213bc547ecd27b0f93bd29bb21eb89a7b18b/Docs/Diagrams/Level%201/Processes/N1-PV-US47.svg)

### Level 1 - Scenario View

![Scenario view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/9e20a38813650b235e78ad69d5359d116679f22d/Docs/Diagrams/Level%201/N1-SV.svg)

### Level 2 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8379c839645e64f91ecde8d1a025b55db260c2ee/Docs/Diagrams/Level%202/N2-LV.svg)

### Level 2 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/605a213bc547ecd27b0f93bd29bb21eb89a7b18b/Docs/Diagrams/Level%202/Processes/N2-PV-US47.svg)

### Level 2 - Implementation View

![Implementation View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8379c839645e64f91ecde8d1a025b55db260c2ee/Docs/Diagrams/Level%202/N2-IV.jpg)

### Level 2 - Physical View

![Physical View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8379c839645e64f91ecde8d1a025b55db260c2ee/Docs/Diagrams/Level%202/N2-PIV.jpg)

### Level 2.5 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8379c839645e64f91ecde8d1a025b55db260c2ee/Docs/Diagrams/Level%202.5/N2.5-LV-LM.svg)


### Level 2.5 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/d7442b1ea655a726742e2483635af66e2e7d004c/Docs/Diagrams/Level%202.5/Processes/N2.5-PV-US47.svg)

### Level 2.5 - Implementation View

![Implementation View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8379c839645e64f91ecde8d1a025b55db260c2ee/Docs/Diagrams/Level%202.5/N2.5-IV-LM.jpg)

### Level 3 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8379c839645e64f91ecde8d1a025b55db260c2ee/Docs/Diagrams/Level%203/N3-LV-LM.svg)

### Level 3 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/605a213bc547ecd27b0f93bd29bb21eb89a7b18b/Docs/Diagrams/Level%203/Processes/N3-PV-US47.svg)

### Level 3 - Implementation View

![Implementation View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8379c839645e64f91ecde8d1a025b55db260c2ee/Docs/Diagrams/Level%203/N3-IV-LM.jpg)

## Module Truck Management - Test

### Unit Test

**Class:**

- TruckService

**Method:**

- getTruckById

**Mock classes:**

- ITruckRepo

| Test Case | Expected Result |
| --- | --- |
| Truck not found | Should return a *Result\<ITruckDTO>* with fail status |
| Repository was called | *findByDomainId* should be called once |
| Truck was found | Should return a *Result\<ITruckDTO>* with success status |
| Truck was found | Should return *ITruckDTO* with the info  |

---

**Class:**

- TruckService

**Method:**

- getAllTrucks

**Mock classes:**

- ITruckRepo

| Test Case | Expected Result |
| --- | --- |
| Truck not found | Should return a *Result\<ITruckDTO[]>* with fail status |
| Repository was called | *findAll* should be called once |
| Truck was found | Should return a *Result\<ITruckDTO[]>* with success status |
| Truck was found | Should return *ITruckDTO[]* with the info  |

---

### Integration Test

**Class:**

- TruckController
- TruckService

**Method:**

- getTruckById
- getTruckById

**Mock classes:**

- ITruckRepo

| Test Case | Expected Result |
| --- | --- |
| Truck not found | Should return a 400 status |
| Repository was called | *findByDomainId* should be called once |
| Truck was found | Should return truck json  |

---

**Class:**

- TruckController
- TruckService

**Method:**

- getAllTrucks
- getAllTrucks

**Mock classes:**

- ITruckRepo

| Test Case | Expected Result |
| --- | --- |
| Truck not found | Should return a 400 status |
| Repository was called | *findAll* should be called once |
| Truck was found | Should return truck json array  |

---
