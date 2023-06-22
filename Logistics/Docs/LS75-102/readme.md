# [LS75-102 Create Delivery](https://lei-isep-ricardo.atlassian.net/jira/software/projects/LS75/boards/1?selectedIssue=LS75-102)

[Go Back](../../Readme.md)

In the module Logistics Management it should be possible to update the position of the package.

## Diagrams

### Level 1 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%201/N1-LV.svg)

### Level 1 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%201/Processes/N1-PV-US102.svg)

### Level 1 - Scenario View

![Scenario view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/9e20a38813650b235e78ad69d5359d116679f22d/Docs/Diagrams/Level%201/N1-SV.svg)

### Level 2 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8379c839645e64f91ecde8d1a025b55db260c2ee/Docs/Diagrams/Level%202/N2-LV.svg)

### Level 2 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%202/Processes/N2-PV-US102.svg)

### Level 2 - Implementation View

![Implementation View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8379c839645e64f91ecde8d1a025b55db260c2ee/Docs/Diagrams/Level%202/N2-IV.jpg)

### Level 2 - Physical View

![Physical View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8379c839645e64f91ecde8d1a025b55db260c2ee/Docs/Diagrams/Level%202/N2-PIV.jpg)

### Level 2.5 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8379c839645e64f91ecde8d1a025b55db260c2ee/Docs/Diagrams/Level%202.5/N2.5-LV-LM.svg)

### Level 2.5 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%202.5/Processes/N2.5-PV-US102.svg)

### Level 2.5 - Implementation View

![Implementation View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8379c839645e64f91ecde8d1a025b55db260c2ee/Docs/Diagrams/Level%202.5/N2.5-IV-LM.jpg)

### Level 3 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8379c839645e64f91ecde8d1a025b55db260c2ee/Docs/Diagrams/Level%203/N3-LV-LM.svg)

### Level 3 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%203/Processes/N3-PV-US102.svg)

### Level 3 - Implementation View

![Implementation View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8379c839645e64f91ecde8d1a025b55db260c2ee/Docs/Diagrams/Level%203/N3-IV-LM.jpg)

## Tests

### Unit Test

**Class:**

- DeliveryPackage

**Method:**

- updatePosition

**Mock classes:**

| Test Case                           | Expected Result                     |
| ----------------------------------- | ----------------------------------- |
| Positions are in the correct format | Success Status should be the result |

---

**Class:**

- DeliveryPackageService

**Method:**

- updateDeliveryPackagePosition

**Mock classes:**

- DeliveryPackageRepo

| Test Case               | Expected Result                         |
| ----------------------- | --------------------------------------- |
| Request with invalid id | Error Status should be returned         |
| Request with valid id   | Expected edited path should be returned |

---

### Integration Test

**Class:**

- DeliveryPackageController
- DeliveryPackageService

**Method:**

- updateDeliveryPackagePosition

**Mock classes:**

- DeliveryPackageRepo

| Test Case               | Expected Result                         |
| ----------------------- | --------------------------------------- |
| Request with invalid id | Error Status should be returned         |
| Request with valid id   | Expected edited path should be returned |

---
