import { Category } from "../../entities/Category";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesUseCase } from "./lisCategoriesUseCase";
import { ListCategoriesController } from "./ListCategoriesController";


const categoriesRepository = CategoriesRepository.getInstance();
const listCategoriesUseCase  = new ListCategoriesUseCase(categoriesRepository);
const listCategoriesController = new ListCategoriesController(listCategoriesUseCase);

export { listCategoriesController }
