
import { Injectable, BadRequestException } from "@nestjs/common";
import { Model, Document } from "mongoose";

export interface IQueryResult<T> {
    result: T[];
    totalDocs: number;
    total: number
    page: number;
    limit: number;
    totalPages: number;
}
interface IRelations { path: string; select?: string, populate?: IRelations[] }[];
@Injectable()
export class ApiMongooseFeaturesService<T extends Document> {
    constructor() { }

    private applyNestedPopulation(query: any, relations: IRelations[]) {
        relations.forEach(({ path, select, populate: nestedRelations }) => {
            const populateOptions: any = { path };
            if (select && select.length > 0) {
                populateOptions.select = select//.join(" ");
            }
            if (nestedRelations && nestedRelations.length > 0) {
                populateOptions.populate = [];
                this.applyNestedPopulation(populateOptions.populate, nestedRelations);
            }
            query.populate(populateOptions);
        });
    }

    async findAll(
        model: Model<T>,
        filters: Partial<Record<string, any>>,
        page: number = 1,
        limit: number = 10,
        sortBy: string = "_id",
        sortOrder: "asc" | "desc" = "asc",
        relations: IRelations[] = []
    ): Promise<IQueryResult<T>> {
        let query = model.find();



        // 🔹 Get Model Schema Keys
        const entityColumns = Object.keys(model.schema.paths);

        // 🔹 Apply Filters
        if (filters) {
            Object.keys(filters).forEach((key) => {
                if (!entityColumns.includes(key)) {
                    throw new BadRequestException(`Invalid filter key: ${key}`);
                }
                let value = filters[key];

                if (value === "true" || value === "false") value = value === "true";
                if (value === "0" || value === "1") value = Boolean(Number(value));

                if (typeof value === "boolean") {
                    query = query.where({ [key]: value });
                } else {
                    query = query.where({ [key]: { $regex: value, $options: "i" } });
                }
            });
        }

        // 🔹 Apply Sorting
        if (sortBy) {
            if (!entityColumns.includes(sortBy)) {
                throw new BadRequestException(`Invalid sort key: ${sortBy}`);
            }
            query = query.sort({ [sortBy]: sortOrder });
        }

        // 🔹 Apply Pagination
        const totalDocs = await model.countDocuments(query.getFilter());
        const totalPages = Math.ceil(totalDocs / limit);
        query = query.skip((page - 1) * limit).limit(limit);

        // 🔹 Apply Relations (Population)
        query.populate(relations);

        // 🔹 Execute Query
        const result = await query.exec();

        return {
            result,
            totalDocs,
            page,
            limit,
            totalPages,
            total: result.length
        };
    }
}
