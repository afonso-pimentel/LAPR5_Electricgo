import { ITripPersistence } from '../../dataschema/ITripPersistence';
import mongoose from 'mongoose';

const TripSchema = new mongoose.Schema({
  domainId: { type: String, unique: true },
  truckId: { type: String, required: true },
  date: { type: String, required: true },
  warehouseIds: { type: [String], required: true },
  deliveryIds: { type: [String], required: true },
  areWarehousesToCharge: { type: [Boolean], required: true },
  chargeQuantities: { type: [Number], required: true },
  chargeTimes: { type: [Number], required: true },
  planningCost: { type: Number, required: true },
  heuristic: { type: String, required: true },
});

export default mongoose.model<ITripPersistence & mongoose.Document>('Trip', TripSchema);
