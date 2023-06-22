import { ITruckPersistence } from '../../dataschema/ITruckPersistence';
import mongoose from 'mongoose';

const TruckSchema = new mongoose.Schema({
  domainId: { type: String, unique: true },
  tare: { type: Number, required: true },
  loadCapacity: { type: Number, required: true },
  capacity: { type: Number, required: true },
  fullLoadAutonomy: { type: Number, required: true },
  fastChargeTime: { type: Number, required: true },
  slowChargeTime: { type: Number, required: true },
  licensePlate: { type: String, required: true },
  isActive: { type: Boolean, required: true },
});

export default mongoose.model<ITruckPersistence & mongoose.Document>('Truck', TruckSchema);
