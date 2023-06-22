# [LS75-12 Update Warehouse](https://lei-isep-ricardo.atlassian.net/jira/software/projects/LS75/boards/1?selectedIssue=LS75-12)

[Go Back](../../Readme.md)

In the module Warehouse Management, it should be possible to update a warehouse.

## Diagrams

### Level 1 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%201/N1-LV.svg)

### Level 1 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/43d329c12158d4388d11eb2953ef9eec48bea896/Docs/Diagrams/Level%201/Processes/N1-PV-US12.svg)

### Level 1 - Scenario View

![Scenario view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%201/N1-SV.svg)

### Level 2 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/b10c4c4b93e5071b8f52750ab55d30b8ced01767/Docs/Diagrams/Level%202/N2-LV.svg)

### Level 2 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/43d329c12158d4388d11eb2953ef9eec48bea896/Docs/Diagrams/Level%202/Processes/N2-PV-US12.svg)

### Level 2 - Implementation View

![Implementation View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/b10c4c4b93e5071b8f52750ab55d30b8ced01767/Docs/Diagrams/Level%202/N2-IV.jpg)

### Level 2 - Physical View

![Physical View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/b10c4c4b93e5071b8f52750ab55d30b8ced01767/Docs/Diagrams/Level%202/N2-PIV.jpg)

### Level 2.5 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/b10c4c4b93e5071b8f52750ab55d30b8ced01767/Docs/Diagrams/Level%202.5/N2.5-LV-WM.svg)

### Level 2.5 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%202.5/Processes/N2.5-PV-US12.svg)

### Level 2.5 - Implementation View

![Implementation View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/b10c4c4b93e5071b8f52750ab55d30b8ced01767/Docs/Diagrams/Level%202.5/N2.5-IV-WM.jpg)


### Level 3 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%203/N3-LV-WM.svg)

### Level 3 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%203/Processes/N3-PV-US12.svg)

### Level 3 - Implementation View

![Implementation View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%203/N3-IV-WM.jpg)

## Module Warehouse Management - Test

### Unit Test

**Class:**

- WarehouseService

**Method:**

- UpdateAsync

**Mock classes:**

- IMapper
- IUnitOfWork
- IWarehouseRepository

| Test Case | Expected Result |
| --- | --- |
| Warehouse does not exist | Should return null response |
| Valid warehouse with valid arguments | Should return expected response object |
| Valid warehouse with invalid arguments | Should throw **WarehouseException** |

---

**Class:**

- Warehouse

**Method:**

- Update

| Test Case | Expected Result |
| --- | --- |
| Entity is updated with new data | Should return entity with expected updated data |

---

### Integration Test

**Class:**

- WarehouseController
- WarehouseService

**Method:**

- Put
- UpdateAsync

**Mock classes:**

- IMapper
- IUnitOfWork
- IWarehouseRepository

**Classes under test:**

- WarehouseService
- WarehouseController

| Test Case | Expected Result |
| --- | --- |
| Warehouse does not exist | Should return a **BadRequest**  |
| Warehouse exists with valid arguments | Should return *Ok* and expected response object |
| Warehouse exists but with invalid arguments | Should return **BadRequest** |

---