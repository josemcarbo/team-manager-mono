import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './project.schema';
import { Model } from 'mongoose';
import { IProject, IProjectFindParam } from './project.interface';
import { ProjectTransformer } from './project.transformer';

@Injectable()
export class ProjectRepository {
  constructor(@InjectModel(Project.name) private db: Model<Project>) {}

  async find(params: IProjectFindParam): Promise<IProject[]> {
    const projects = await this.db.find(params);
    return (
      projects &&
      projects.map((project) =>
        ProjectTransformer.toResponse(project.toObject()),
      )
    );
  }

  async findOne(id: string): Promise<IProject> {
    // TODO: const project = await this.db.findById(id).lean().populate('owner');
    const project = await this.db.findById(id);
    return project && ProjectTransformer.toResponse(project.toObject());
  }

  async create(project: IProject): Promise<IProject> {
    const newProject = (await this.db.create(project)).toObject();
    return ProjectTransformer.toResponse(newProject);
  }
}
