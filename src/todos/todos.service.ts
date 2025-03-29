import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Todo, TodoDocument } from './schemas/todo.schema';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { NotFoundError } from 'rxjs';
import { ApiMongooseFeaturesService } from 'src/api-features/api-mongoose-features.service';
import { faker } from '@faker-js/faker';
import { TodoPriority } from 'src/common/enums';


const categoryValues = [
  'general',
  'work',
  'personal',
  'health',
  'finance',
  'shopping',
  'education',
  'travel',
  'other',
];

// All priority enum values
const priorities: TodoPriority[] = [
  TodoPriority.LOW,
  TodoPriority.MEDIUM,
  TodoPriority.HIGH,
];


@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>,
    private readonly apiFeatures: ApiMongooseFeaturesService<TodoDocument>

  ) { }

  async onModuleInit() {
    // await this.seed();
  }

  async seed() {

  }

  generateTodo() {
    return {
      title: faker.lorem.sentence(5),
      description: faker.datatype.boolean() ? faker.lorem.paragraph() : undefined,
      completed: faker.datatype.boolean(),
      dueDate: faker.date.soon({ days: 30 }),
      priority: faker.helpers.arrayElement(priorities),
      category: faker.helpers.arrayElement(categoryValues),
      tags: faker.datatype.boolean()
        ? Array.from({ length: faker.number.int({ min: 1, max: 6 }) }, () =>
          faker.word.words({ count: 1 })
        )
        : [],
      isActive: faker.datatype.boolean(),
    };
  }

  async generateTodos(count = 10) {
    return (Array.from({ length: count }, () => this.generateTodo()));
  }

  async bulkCreate(user: string) {

    const todoDocs = (await this.generateTodos(100)).map((todo) => ({
      ...todo,
      user,
    }));

    await this.todoModel.insertMany(todoDocs);
    return await this.findAllByUser(user, {});
  }

  async getTodoReport(userId: string) {
    const [byCategory, byPriority] = await Promise.all([
      this.todoModel.aggregate([
        { $match: { user: userId } },
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            category: '$_id',
            count: 1,
          },
        },
      ]),
      this.todoModel.aggregate([
        { $match: { user: userId } },
        {
          $group: {
            _id: '$priority',
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            priority: '$_id',
            count: 1,
          },
        },
      ]),
    ]);

    console.log({ byCategory, byPriority });


    return {
      byCategory,
      byPriority,
    };
  }

  async create(createTodoDto: CreateTodoDto, user: string): Promise<Todo> {
    const createdTodo = new this.todoModel({
      ...createTodoDto,
      user,
    });
    return createdTodo.save();
  }

  async findAllByUser(userId: string, query: any): Promise<{ result: Todo[], total: number, page: number, limit: number, totalDocs: number, totalPages: number }> {

    const { page, limit, sort, sortBy, ...filters } = query

    console.log({ page, limit, sort, sortBy, filters });



    return this.apiFeatures.findAll(
      this.todoModel,
      { ...filters, user: userId },
      page,
      limit,
      sortBy,
      sort,
      []
    )
    // const features = new ApiFeatures(this.todoModel.find({ user: userId }), query)
    //   .filter()
    //   .search('title')
    //   .sort()
    //   .limitFields()
    //   .paginate();

    // return await features.getQuery();
  }

  async update(
    id: string,
    userId: string,
    updateDto: UpdateTodoDto,
  ): Promise<Todo> {
    const todo = await this.todoModel.findOne({ _id: id, user: userId });

    if (!todo) {
      throw new Error('Todo not found or not authorized');
    }

    Object.assign(todo, updateDto);
    return todo.save();
  }

  async delete(id: string, userId: string): Promise<{ deleted: boolean }> {
    const result = await this.todoModel.updateOne(
      { _id: id, user: userId },
      { isDeleted: true },
    );

    return { deleted: result.modifiedCount > 0 };
  }

  async gete(id: string): Promise<Todo> {
    const todo = await this.todoModel.findById(id);
    if (!todo) {
      throw new NotFoundError('Todo not found or not authorized');
    }
    return todo;
  }

}
