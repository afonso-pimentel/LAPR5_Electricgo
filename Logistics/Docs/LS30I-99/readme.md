# [LS75-99 SSO Authentication](https://lei-isep-ricardo.atlassian.net/browse/LS75-99)

[Go Back](../../Readme.md)
[Planing](../../../Docs/SprintC.md)

Should be possible to authenticate users using SSO.

## Diagrams

### Level 2 - Logical View - Fast Design

![logical view](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/3765aedc58284e331c32a92620308a91d4578167/Docs/Diagrams/Level%202/N2-VL-SSO.svg)

### Level 2 - Process View

![Process View](https://bitbucket.org/DoubleRisep/lei-sem5-3na-075/raw/3765aedc58284e331c32a92620308a91d4578167/Docs/Diagrams/Level%202/Processes/N2-PV-US99.svg)

## Middleware Logistics

- isAuth
- validateRoleUser

## Middleware Warehouse Management

- JwtMiddleware

## Roles

- 1 - Administrator
- 2 - Logistics Manager
- 3 - Warehouse Manager
- 4 - Fleet Manager

## Roles Permissions

| | Administrator | Logistics Manager | Warehouse Manager | Fleet Manager |
| --- | :---: | :---: | :---: | :---: |
| **Home** | **X** | **X** | **X** | **X** |
| **Model 3D** | **X** | **X** | **X** | **X** |
| **Trucks** | **X** | **X** |  | **X** |
| **Warehouses** | **X** |  | **X** |  |
| **Paths** | **X** | **X** |  |  |
| **Deliveries** | **X** |  | **X** |  |
| **Delivery Packages** | **X** | **X** |  |  |
| **Planing** | **X** | **X** |  | **X** |
| **Trips** | **X** | **X** |  | **X** |
| **Users** | **X** |  |  |  |

## Users Created

| Nome | Role |
| --- | :---: |
| Ricardo Ribeiro | Administrator |
| Afonso Pimentel | Logistics Manager |
| Rui Rafael | Fleet Manager |
| José Pinto | Warehouse Manager |
