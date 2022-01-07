import multer from "multer";
import fs from "fs";
import { parse  } from "csv-parse";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { categoriesRoutes } from "../../../../routes/categories.routes";

interface IImportCategory{
    name: string;
    description: string;
}

class ImportCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository){}
    
    loeadCategories(file: Express.Multer.File): Promise<IImportCategory[]>{
        return new Promise((resolve, reject) =>{
            const stream = fs.createReadStream(file.path);
            const categories: IImportCategory[] = [];
            const parseFile  = parse()
            stream.pipe(parseFile)

            parseFile
            .on("data", async (line) => {
                const [ name, description ]= line;
                categories.push({
                    name,
                    description,
                    });
                }) 
            	.on("end", () => {
                    fs.promises.unlink(file.path)
                    resolve(categories)
                })
        .on("error", (err)=>{
            reject(err);
        })
     });
    }

     async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loeadCategories(file);

        categories.map(category => {
            const { name, description} = category;

            const existCategory = this.categoriesRepository.findByName(name);

            if (!existCategory){
                this.categoriesRepository.create({
                    name,
                    description,
                });
            }
        });
    }
}


export { ImportCategoryUseCase };