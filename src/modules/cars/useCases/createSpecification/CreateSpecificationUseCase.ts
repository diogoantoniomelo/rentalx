import { ISpecificationsRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationUseCase{

    constructor(private specificationRepository: ISpecificationsRepository){

    }

    execute ({name, description }: IRequest): void{
        const specificationALreadyExists = this.specificationRepository.findByName(name);

        if(specificationALreadyExists){
            throw new Error ("Specification already Exists!");
        }

        this.specificationRepository.create({
        name,
        description,
        });
    }
}

export { CreateSpecificationUseCase };