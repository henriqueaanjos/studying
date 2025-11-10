import { BadRequestException, Injectable } from '@nestjs/common';
import { ContentTypeDTO } from './content-type.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class ContentTypeService {
  constructor(private prisma: PrismaService) {}
  async create(data: ContentTypeDTO) {
    const contentTypeExists = await this.prisma.contentType.findFirst({
      where: {
        name: data.name,
      },
    });

    if (contentTypeExists) {
      throw new BadRequestException('Content Type already exists');
    }

    const contentType = await this.prisma.contentType.create({
      data,
    });

    return contentType;
  }

  async findAll() {
    return this.prisma.contentType.findMany();
  }

  async findOne(id: string) {
    return this.prisma.contentType.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: ContentTypeDTO) {
    return this.prisma.contentType.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.contentType.delete({
      where: {
        id,
      },
    });
  }
}
