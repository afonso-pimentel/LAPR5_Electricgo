import { IDeliveryPackagePersistence } from '../../dataschema/IDeliveryPackagePersistence';
import mongoose from 'mongoose';

const DeliveryPackageSchema = new mongoose.Schema({
  domainId: { type: String, unique: true },
  deliveryId: { type: String, unique: true },
  loadTime: { type: Number, required: true },
  unloadTime: { type: Number, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  z: { type: Number, required: true },
});

export default mongoose.model<IDeliveryPackagePersistence & mongoose.Document>(
  'DeliveryPackage',
  DeliveryPackageSchema,
);
