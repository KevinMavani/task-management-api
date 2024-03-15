import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types } from "mongoose";
import { STATUS } from "./task.dto";

@Schema({ timestamps: true })
export class Task {
  _id: Types.ObjectId;

  @Prop({ type: SchemaTypes.String, required: true, unique: true })
  title: string;

  @Prop({ type: SchemaTypes.String })
  description: string;

  @Prop({ type: SchemaTypes.String, required: true, enum: STATUS })
  status: STATUS;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
export type TaskDocument = HydratedDocument<Task>;