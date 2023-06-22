export interface PostDeliveryPackageRequestDto {
    deliveryId: string,
    loadTime: number,
    unloadTime: number,
    x: number,
    y: number,
    z: number,
}