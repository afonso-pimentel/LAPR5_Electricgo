# [LS75-57 Create Delivery](https://lei-isep-ricardo.atlassian.net/jira/software/projects/LS75/boards/1?selectedIssue=LS75-57)

[Go Back](../../Readme.md)

In the module Logistics Management should be possible to create a path.

## Diagrams

### Level 1 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%201/N1-LV.svg)

### Level 1 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%201/Processes/N1-PV-US57.svg)

### Level 1 - Scenario View

![Scenario view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/9e20a38813650b235e78ad69d5359d116679f22d/Docs/Diagrams/Level%201/N1-SV.svg)

### Level 2 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8379c839645e64f91ecde8d1a025b55db260c2ee/Docs/Diagrams/Level%202/N2-LV.svg)

### Level 2 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%202/Processes/N2-PV-US57.svg)

### Level 2 - Implementation View

![Implementation View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8379c839645e64f91ecde8d1a025b55db260c2ee/Docs/Diagrams/Level%202/N2-IV.jpg)

### Level 2 - Physical View

![Physical View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8379c839645e64f91ecde8d1a025b55db260c2ee/Docs/Diagrams/Level%202/N2-PIV.jpg)

### Level 2.5 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8379c839645e64f91ecde8d1a025b55db260c2ee/Docs/Diagrams/Level%202.5/N2.5-LV-LM.svg)

### Level 2.5 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%202.5/Processes/N2.5-PV-US57.svg)

### Level 2.5 - Implementation View

![Implementation View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8379c839645e64f91ecde8d1a025b55db260c2ee/Docs/Diagrams/Level%202.5/N2.5-IV-LM.jpg)

### Level 3 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8379c839645e64f91ecde8d1a025b55db260c2ee/Docs/Diagrams/Level%203/N3-LV-LM.svg)

### Level 3 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%203/Processes/N3-PV-US57.svg)

### Level 3 - Implementation View

![Implementation View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8379c839645e64f91ecde8d1a025b55db260c2ee/Docs/Diagrams/Level%203/N3-IV-LM.jpg)

## Module Truck Management - Test

### Unit Test

**Class:**

- PathService

**Method:**

- createPath

**Mock classes:**

- IPathRepo
- IWarehouseRepo

| Test Case | Expected Result |
| --- | --- |
| Start Warehouse not found | Should return a *Result\<IPathDTO>* with fail status |
| End Warehouse not found | Should return a *Result\<IPathDTO>* with fail status |
| Duplicated Path | Should return a *Result\<IPathDTO>* with fail status |
| Invalid Path | Should return a *Result\<IPathDTO>* with fail status |
| Repository Warehouse was called | *ifWarehouseExists* should be called twice |
| Repository Path was called | *save* should be called once |
| Repository Path was called | *getByStartEndWarehouseId* should be called once |
| Created Successfully | Should return *Result\<IPathDTO>* with success status |

---

**Class:**

- Path

**Method:**

- create

| Test Case | Expected Result |
| --- | --- |
| Invalid StartWarehouse | Should return a *Result\<Path>* with fail status |
| Invalid EndWarehouse | Should return a *Result\<Path>* with fail status |
| Invalid Distance | Should return a *Result\<Path>* with fail status |
| Invalid PathTime | Should return a *Result\<Path>* with fail status |
| Invalid SpentEnergy | Should return a *Result\<Path>* with fail status |
| Invalid ExtraChargeTime | Should return a *Result\<Path>* with fail status |
| Valid Path | Should return a *Result\<Path>* with success status |

---

### Integration Test

**Class:**

- PathController
- PathService

**Method:**

- createPath
- createPath

**Mock classes:**

- IPathRepo
- IWarehouseRepo

| Test Case | Expected Result |
| --- | --- |
| Start Warehouse not found | Should return a 400 status |
| End Warehouse not found | Should return a 400 status |
| Duplicated Path | Should return a 400 status |
| Created Successfully | Should return IPathDTO json  |

---
