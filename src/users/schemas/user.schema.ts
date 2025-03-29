
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, unique: true, lowercase: true, trim: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    name?: string;

    async comparePassword(plainText: string): Promise<boolean> {
        return await bcrypt.compare(plainText, this.password);
    }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.comparePassword = async function (
    plainText: string,
): Promise<boolean> {
    return bcrypt.compare(plainText, this.password);
};