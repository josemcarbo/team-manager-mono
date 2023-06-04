import { Injectable, NotFoundException } from '@nestjs/common';
import {
  IProject,
  IProjectFindParam,
  IProjectLabel,
} from './project.interface';
import { ProjectRepository } from './project.repository';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async find(params: IProjectFindParam): Promise<IProject[]> {
    return this.projectRepository.find(params);
  }

  async findOne(id: string): Promise<IProject> {
    const project = await this.projectRepository.findOne(id);
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async create(project: IProject): Promise<IProject> {
    return this.projectRepository.create(project);
  }

  async addNewLabel(id: string, label: IProjectLabel): Promise<IProject> {
    const project = await this.projectRepository.addNewLabel(id, label);
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async addNewList(id: string, list: string): Promise<IProject> {
    const project = await this.projectRepository.addNewList(id, list);
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }
}
