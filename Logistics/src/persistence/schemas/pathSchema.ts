import { IPathPersistence } from '../../dataschema/IPathPersistence';
import mongoose from 'mongoose';

const PathSchema = new mongoose.Schema({
  domainId: { type: String, unique: true },
  startWarehouse: { type: String, required: true },
  endWarehouse: { type: String, required: true },
  distance: { type: Number, required: true },
  pathTime: { type: Number, required: true },
  spentEnergy: { type: Number, required: true },
  extraChargeTime: { type: Number, required: true },
});

export default mongoose.model<IPathPersistence & mongoose.Document>('Path', PathSchema);
