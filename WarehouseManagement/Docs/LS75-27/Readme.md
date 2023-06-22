# [LS75-27 List Delivery](https://lei-sem5-3na-075/src/master/Delivery%20Management/Docs/LS75-27/)

[Go Back](../../Readme.md)

In the module Warehouse Management it should be possible to list all of the available Deliveries.

## Diagrams

### Level 1 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%201/N1-LV.svg)

### Level 1 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%201/Processes/N1-PV-US27.svg)

### Level 1 - Scenario View

![Scenario view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%201/N1-SV.svg)

### Level 2 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/b10c4c4b93e5071b8f52750ab55d30b8ced01767/Docs/Diagrams/Level%202/N2-LV.svg)

### Level 2 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%202/Processes/N2-PV-US27.svg)

### Level 2 - Implementation View

![Implementation View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/b10c4c4b93e5071b8f52750ab55d30b8ced01767/Docs/Diagrams/Level%202/N2-IV.jpg)

### Level 2 - Physical View

![Physical View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/b10c4c4b93e5071b8f52750ab55d30b8ced01767/Docs/Diagrams/Level%202/N2-PIV.jpg)

### Level 2.5 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/b10c4c4b93e5071b8f52750ab55d30b8ced01767/Docs/Diagrams/Level%202.5/N2.5-LV-WM.svg)

### Level 2.5 - Implementation View

![Implementation View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/b10c4c4b93e5071b8f52750ab55d30b8ced01767/Docs/Diagrams/Level%202.5/N2.5-IV-WM.jpg)

### Level 3 - Logical View

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%203/N3-LV-WM.svg)

### Level 3 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/fc793f055d30a42c89541bf87f735ad00ae17ce7/Docs/Diagrams/Level%203/Processes/N3-PV-US27.svg)

### Level 3 - Implementation View

![Implementation View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/b10c4c4b93e5071b8f52750ab55d30b8ced01767/Docs/Diagrams/Level%203/N3-IV-WM.jpg)


## Module Delivery Management - Test

### Unit Test

**Class:**

- DeliveryService

**Method:**

- GetByIdAsync
- GetAllAsync

**Mock classes:**

- IMapper
- IDeliveryServiceRepository

| Test Case                   | Expected Result                              |
| --------------------------- | -------------------------------------------- |
| Delivery id is not correct | _FormatException_ should be thrown           |
| Delivery was not found     | Should return null                           |
| Delivery was found         | Should return a GetDeliveryRequestDTO       |
| Deliverys were found       | Should return list of GetDeliveryRequestDTO |

---

### Integration Test

**Class:**

- DeliveryController
- DeliveryService

**Method:**

- Get
- GetAllAsync
- GetByIdAsync

**Mock classes:**

- IMapper
- IUnitOfWork
- IDeliveryRepository

| Test Case                | Expected Result              |
| ------------------------ | ---------------------------- |
| Delivery does not exist | Should return a _BadRequest_ |
| Delivery exists         | Should return _Ok_           |
| There are no Deliverys  | Should return _NoContent_    |
| There are Deliverys     | Should return _Ok_           |

---

