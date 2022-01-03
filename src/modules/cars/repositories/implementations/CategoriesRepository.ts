import { getRepository, Repository } from "typeorm";

import { Category } from "../../entities/Category";
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    // private categories: Category[];

    private repository: Repository<Category>;
    // private static INSTANCE: CategoriesRepository;

    constructor() {
        // this.categories = [];
        this.repository = getRepository(Category);
    }

    // public static getInstance(): CategoriesRepository {
    //     if (!CategoriesRepository.INSTANCE) {
    //         CategoriesRepository.INSTANCE = new CategoriesRepository();
    //     }

    //     return CategoriesRepository.INSTANCE;
    // }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        // const category = new Category();
        const category = this.repository.create({
            description,
            name,
        });

        // Object.assign(category, {
        //     name,
        //     description,
        //     created_at: new Date(),
        // });

        await this.repository.save(category);
        // this.categories.push(category);
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
        // return this.categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ name });
        // const category = this.categories.find(
        //     category => category.name === name,
        // );
        return category;
    }
}

export { CategoriesRepository };
