# [LS30I-159 Inibit truck](https://lei-isep-ricardo.atlassian.net/jira/software/projects/LS75/boards/1?selectedIssue=LS30I-159)

[Go Back](../../Readme.md)
[Planing](../../../Docs/SprintC.md)

In the module Logistics Management should be possible to create a delivery.

## Diagrams

### Level 1 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/3765aedc58284e331c32a92620308a91d4578167/Docs/Diagrams/Level%201/N1-LV.svg)

### Level 1 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/3765aedc58284e331c32a92620308a91d4578167/Docs/Diagrams/Level%201/Processes/N1-PV-US129.svg)

### Level 1 - Scenario View

![Scenario view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/9e20a38813650b235e78ad69d5359d116679f22d/Docs/Diagrams/Level%201/N1-SV.svg)

### Level 2 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8379c839645e64f91ecde8d1a025b55db260c2ee/Docs/Diagrams/Level%202/N2-LV.svg)

### Level 2 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/3765aedc58284e331c32a92620308a91d4578167/Docs/Diagrams/Level%202/Processes/N2-PV-US129.svg)

### Level 2 - Implementation View

![Implementation View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8379c839645e64f91ecde8d1a025b55db260c2ee/Docs/Diagrams/Level%202/N2-IV.jpg)

### Level 2 - Physical View

![Physical View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8379c839645e64f91ecde8d1a025b55db260c2ee/Docs/Diagrams/Level%202/N2-PIV.jpg)

### Level 3 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8379c839645e64f91ecde8d1a025b55db260c2ee/Docs/Diagrams/Level%203/N3-LV-LM.svg)

### Level 3 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/a56ce8f90087f91c93a308c29d6df9a1e2152e60/Docs/Diagrams/Level%202/Processes/N2-PV-US129.svg)

### Level 3 - Implementation View

![Implementation View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8379c839645e64f91ecde8d1a025b55db260c2ee/Docs/Diagrams/Level%203/N3-IV-LM.jpg)

## Module Truck Management - Test

### Integration Test

**Class:**

- TruckService

**Method:**

- getAllActiveTrucks

**Mock classes:**

- ITruckRepo

| Test Case                              | Expected Result                            |
| -------------------------------------- | ------------------------------------------ |
| No trucks found                        | Should return a 400 status                 |
| Trucks found isActive property is true | Should return list of trucks with isActive |

---

**Class:**

- TruckController

**Method:**

- getAllTrucks

**Mock classes:**

- ITruckRepo

| Test Case             | Expected Result                       |
| --------------------- | ------------------------------------- |
| Repository was called | _findAllActive_ should be called once |

---
