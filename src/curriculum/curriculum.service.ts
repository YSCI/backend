import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';
import { Curriculum } from './entities/curriculum.entity';

@Injectable()
export class CurriculumService {
  @InjectRepository(Curriculum)
  private readonly curriculumRepository: Repository<Curriculum>;

  async create(createCurriculumDto: Array<CreateCurriculumDto>) {
    return await this.curriculumRepository.save(createCurriculumDto);
  }

  async update(id: number, updateCurriculumDto: UpdateCurriculumDto) {
    const result = await this.curriculumRepository.update(
      id,
      updateCurriculumDto,
    );

    return !!result.affected;
  }

  async remove(ids: number[]) {
    const result = await this.curriculumRepository.delete(ids);

    return !!result.affected;
  }
}
