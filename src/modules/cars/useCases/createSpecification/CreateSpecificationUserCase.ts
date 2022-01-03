import { inject, injectable } from "tsyringe";

import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationRepository: SpecificationsRepository,
    ) {}
    execute({ name, description }: IRequest): void {
        const specificationAreadyExists =
            this.specificationRepository.findByName(name);
        if (specificationAreadyExists) {
            throw new Error("Specification Aready Exists!");
        }
        this.specificationRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
