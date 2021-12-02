import {request, response, Router} from "express";
import { SpecificationRepository } from "../modules/cars/repositories/implementations/SpecificationRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationServices";

const specificationsRoutes = Router();

const specificationRepository =  new SpecificationRepository();

specificationsRoutes.post("/", (request, response) => {
    const {name, description } = request.body;
    const createSpecificationService = new CreateSpecificationService(specificationRepository);

    createSpecificationService.execute ({name, description});

    return response.status(201).send();
})

export { specificationsRoutes};