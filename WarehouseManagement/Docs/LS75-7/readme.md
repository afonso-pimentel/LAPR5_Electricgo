# [LS75-7 List Warehouse](https://lei-isep-ricardo.atlassian.net/jira/software/projects/LS75/boards/1?selectedIssue=LS75-7)

[Go Back](../../Readme.md)

In the module Warehouse Management it should be possible to list all of the available warehouses.

## Diagrams

### Level 1 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%201/N1-LV.svg)

### Level 1 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8408e1cab6c874d14cb3c9d4a61bfee434d3c19d/Docs/Diagrams/Level%201/N1-PV-US7.svg)

### Level 1 - Scenario View

![Scenario view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%201/N1-SV.svg)

### Level 2 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8408e1cab6c874d14cb3c9d4a61bfee434d3c19d/Docs/Diagrams/Level%202/N2-LV.svg)

### Level 2 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8408e1cab6c874d14cb3c9d4a61bfee434d3c19d/Docs/Diagrams/Level%202/N2-PV-US7.svg)

### Level 2 - Implementation View

![Implementation View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8408e1cab6c874d14cb3c9d4a61bfee434d3c19d/Docs/Diagrams/Level%202/N2-IV.jpg)

### Level 2 - Physical View

![Physical View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8408e1cab6c874d14cb3c9d4a61bfee434d3c19d/Docs/Diagrams/Level%202/N2-PIV.jpg)

### Level 3 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8408e1cab6c874d14cb3c9d4a61bfee434d3c19d/Docs/Diagrams/Level%203/N3-LV-WM.svg)

### Level 3 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8408e1cab6c874d14cb3c9d4a61bfee434d3c19d/Docs/Diagrams/Level%203/N3-PV-US7.svg)

### Level 3 - Implementation View

![Implementation View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/8408e1cab6c874d14cb3c9d4a61bfee434d3c19d/Docs/Diagrams/Level%203/N3-IV-WM.jpg)

## Module Warehouse Management - Test

### Unit Test

**Class:**

- WarehouseService

**Method:**

- GetByIdAsync
- GetAllAsync

**Mock classes:**

- IMapper
- IWarehouseServiceRepository

| Test Case                   | Expected Result                              |
| --------------------------- | -------------------------------------------- |
| Warehouse id is not correct | _FormatException_ should be thrown           |
| Warehouse was not found     | Should return null                           |
| Warehouse was found         | Should return a GetWarehouseRequestDTO       |
| Warehouses were found       | Should return list of GetWarehouseRequestDTO |

---

### Integration Test

**Class:**

- WarehouseController
- WarehouseService

**Method:**

- Get
- GetAllAsync
- GetByIdAsync

**Mock classes:**

- IMapper
- IUnitOfWork
- IWarehouseRepository

| Test Case                | Expected Result              |
| ------------------------ | ---------------------------- |
| Warehouse does not exist | Should return a _BadRequest_ |
| Warehouse exists         | Should return _Ok_           |
| There are no warehouses  | Should return _NoContent_    |
| There are warehouses     | Should return _Ok_           |

---
