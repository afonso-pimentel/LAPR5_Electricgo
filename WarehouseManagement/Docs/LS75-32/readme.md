# [LS75-32 Patch Delivery](https://lei-isep-ricardo.atlassian.net/jira/software/projects/LS75/boards/1?selectedIssue=LS75-32)

[Go Back](../../Readme.md)

In the module Warehouse Management it should be possible to update the delivery date.

## Diagrams

### Level 1 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%201/N1-LV.svg)

### Level 1 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8408e1cab6c874d14cb3c9d4a61bfee434d3c19d/Docs/Diagrams/Level%201/N1-PV-US32.svg)

### Level 1 - Scenario View

![Scenario view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%201/N1-SV.svg)

### Level 2 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8408e1cab6c874d14cb3c9d4a61bfee434d3c19d/Docs/Diagrams/Level%202/N2-LV.svg)

### Level 2 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8408e1cab6c874d14cb3c9d4a61bfee434d3c19d/Docs/Diagrams/Level%202/N2-PV-US32.svg)

### Level 2 - Implementation View

![Implementation View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8408e1cab6c874d14cb3c9d4a61bfee434d3c19d/Docs/Diagrams/Level%202/N2-IV.jpg)

### Level 2 - Physical View

![Physical View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8408e1cab6c874d14cb3c9d4a61bfee434d3c19d/Docs/Diagrams/Level%202/N2-PIV.jpg)

### Level 3 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8408e1cab6c874d14cb3c9d4a61bfee434d3c19d/Docs/Diagrams/Level%203/N3-LV-WM.svg)

### Level 3 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/4ebe82140ae67f253b623be3dba16e9ddebd1b21/Docs/Diagrams/Level%203/Processes/N3-PV-US32.svg)

### Level 3 - Implementation View

![Implementation View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8408e1cab6c874d14cb3c9d4a61bfee434d3c19d/Docs/Diagrams/Level%203/N3-IV-WM.jpg)

## Module Delivery Management - Test

### Unit Test

**Class:**

- DeliveryService

**Method:**

- UpdateAsync

**Mock classes:**

- IMapper
- IUnitOfWork
- IDeliveryRepository

| Test Case | Expected Result |
| --- | --- |
| Delivery not exists | Should throw *DeliveryException*  |
| Delivery date was validated correctly | Should throw *DeliveryException* |
| Changes was committed | *IUnitOfWork* should be called once |
| Delivery date was updated | Object on persistence should have the date sent |

---
**Class:**

- Delivery

**Method:**

- ValidateDeliveryDate

| Test Case | Expected Result |
| --- | --- |
| Delivery data was validated correctly | Should throw an *DeliveryException* |

---

### Integration Test

**Class:**

- DeliveryController
- DeliveryService

**Method:**

- Patch
- UpdateAsync

**Mock classes:**

- IMapper
- IUnitOfWork
- IDeliveryRepository

| Test Case | Expected Result |
| --- | --- |
| Delivery not exists | Should return a *BadRequest*  |
| Delivery date was updated | Should return *Ok*   |

---
