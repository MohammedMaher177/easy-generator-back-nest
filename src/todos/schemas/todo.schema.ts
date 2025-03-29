import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { TodoPriority } from 'src/common/enums';
import { Query } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema({ timestamps: true })
export class Todo {
    @Prop({ required: true })
    title: string;

    @Prop()
    description?: string;

    @Prop({ default: false })
    completed: boolean;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;

    @Prop()
    dueDate?: Date;

    @Prop({ enum: TodoPriority, default: TodoPriority.MEDIUM })
    priority: TodoPriority;

    @Prop({ default: 'general' })
    category?: string;

    @Prop({ type: [String], default: [] })
    tags: string[];

    @Prop({ default: false })
    isDeleted: boolean;

    @Prop({ default: true })
    isActive: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

TodoSchema.pre(/^find/, function (this: Query<any, any>, next) {
    this.where({ isDeleted: false });
    next();
});
